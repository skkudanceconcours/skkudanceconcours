"use client";
import { Reception2026 } from "@/template/reception";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { deleteReception, updateReception } from "@/lib/firebase/firebaseCRUD";
import EditModal2026 from "@/app/components/reception/EditModal2026";

type Column = { name: string; uid: string };

const BASE_COLUMNS: Column[] = [
  { name: "", uid: "select" },
  { name: "날짜", uid: "time" },
  { name: "참가자 정보", uid: "personalInfo" },
  { name: "학교명", uid: "schoolName" },
  { name: "학원명", uid: "academyName" },
  { name: "지도자 정보", uid: "instructorInfo" },
  { name: "부문", uid: "part" },
  { name: "작품 제목", uid: "artTitle" },
  { name: "음악/포즈", uid: "music/pose" },
  { name: "음악 다운로드", uid: "musicURL" },
  { name: "수정", uid: "actions" },
];

type Columnkey =
  | "select"
  | "time"
  | "personalInfo"
  | "schoolName"
  | "academyName"
  | "instructorInfo"
  | "part"
  | "artTitle"
  | "music/pose"
  | "musicURL"
  | "actions";

type TableProps = {
  receptions: Reception2026[];
  onDelete: (docIds: string[]) => void;
  onUpdate: (updated: Reception2026) => void;
  readonly?: boolean;
};

const NextTable2026 = ({ receptions, onDelete, onUpdate, readonly }: TableProps): ReactNode => {
  const [editTarget, setEditTarget] = useState<Reception2026 | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const toggleSelect = (docId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(docId)) next.delete(docId);
      else next.add(docId);
      return next;
    });
  };

  const columns = useMemo(
    () => readonly ? BASE_COLUMNS.filter(c => c.uid !== "select" && c.uid !== "actions") : BASE_COLUMNS,
    [readonly],
  );

  const augmentedItems = useMemo(
    () => receptions.map(r => ({ ...r, _selected: selectedIds.has(r.docId ?? "") })),
    [receptions, selectedIds],
  );

  const handleBulkDelete = async () => {
    if (!window.confirm(`선택한 ${selectedIds.size}개 접수를 삭제하시겠습니까?`)) return;
    setDeleting(true);
    const ids = Array.from(selectedIds);
    await Promise.all(ids.map(id => deleteReception("2026", id)));
    onDelete(ids);
    setSelectedIds(new Set());
    setDeleting(false);
  };

  const handleSave = async (updated: Reception2026) => {
    const ok = await updateReception("2026", updated.docId!, updated);
    if (ok) {
      onUpdate(updated);
      setEditTarget(null);
    } else {
      alert("수정에 실패했습니다.");
    }
  };

  const renderCell = useCallback(
    (reception: Reception2026 & { _selected: boolean }, columnKey: Columnkey) => {
      switch (columnKey) {
        case "select":
          return (
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer accent-red-500"
              checked={reception._selected}
              onChange={() => toggleSelect(reception.docId!)}
            />
          );
        case "time":
          return (
            <p className="w-12">
              {new Date(reception.timestamp).toDateString()+'\n'}
              {new Date(reception.timestamp).toTimeString().slice(0, 8)}
            </p>
          );
        case "personalInfo":
          return (
            <User
              name
              description={
                <div className="ml-1 flex flex-col gap-1">
                  <p className="text-sm font-bold text-black">{reception.name}</p>
                  <p>{reception.gender}</p>
                  <p>{reception.birth}</p>
                  <p>{reception.email}</p>
                  <p>{reception.contact}</p>
                </div>
              }
              avatarProps={{
                src: "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
              }}
            />
          );
        case "schoolName":
          return reception.school;
        case "academyName":
          return reception.academy;
        case "instructorInfo":
          return (
            <User
              name
              description={
                <div className="ml-1 flex flex-col gap-1">
                  <p className="text-sm font-bold text-black">{reception.instructorName}</p>
                  <p>{reception.instructorContact}</p>
                </div>
              }
              avatarProps={{
                src: "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
              }}
            />
          );
        case "part":
          return (
            <div className="flex flex-col gap-1">
              <p>{reception.major}</p>
              <p>{reception.grade}</p>
            </div>
          );
        case "artTitle":
          return reception.artTitle;
        case "music/pose":
          return reception.musicOrPose;
        case "musicURL":
          return reception.musicFileURL ? (
            <button
              className="cursor-pointer underline text-blue-500"
              onClick={async () => {
                try {
                  const res = await fetch(reception.musicFileURL!);
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  const majorShort = reception.major.replace(/[<>]/g, "").replace(/\s+/g, "");
                  const title = reception.artTitle ?? "음원";
                  a.download = `2026_${majorShort}_${reception.name}_${title}.mp3`;
                  a.click();
                  URL.revokeObjectURL(url);
                } catch (e) {
                  console.error("다운로드 실패", e);
                }
              }}
            >
              다운로드
            </button>
          ) : null;
        case "actions":
          return (
            <button
              className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
              onClick={() => setEditTarget(reception)}
            >
              수정
            </button>
          );
      }
    },
    [],
  );

  return (
    <>
      {!readonly && selectedIds.size > 0 && (
        <div className="flex w-full items-center gap-3 px-3 py-2 bg-red-50 border-b border-red-100">
          <span className="text-sm text-red-600 font-medium">{selectedIds.size}개 선택됨</span>
          <button
            className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600 disabled:opacity-50"
            onClick={handleBulkDelete}
            disabled={deleting}
          >
            {deleting ? "삭제 중..." : "선택 삭제"}
          </button>
          <button
            className="text-xs text-gray-400 hover:text-gray-600"
            onClick={() => setSelectedIds(new Set())}
          >
            선택 해제
          </button>
        </div>
      )}

      <Table
        aria-label="receptions"
        className="h-full p-2 max-h-screen overflow-y-scroll"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={augmentedItems} emptyContent="아직 신청자가 없습니다.">
          {(item) => (
            <TableRow key={item.docId} className={item._selected ? "bg-red-50" : ""}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as Columnkey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {!readonly && editTarget && (
        <EditModal2026
          isOpen={true}
          reception={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={updated => handleSave(updated as Reception2026)}
        />
      )}
    </>
  );
};
export default NextTable2026;
