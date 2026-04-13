"use client";
import { Reception2025 } from "@/template/reception";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { ReactNode, useCallback, useState } from "react";
import { deleteReception, updateReception } from "@/lib/firebase/firebaseCRUD";
import EditModal2026 from "@/app/components/reception/EditModal2026";

const columns = [
  { name: "날짜", uid: "time" },
//   { name: "개인/단체", uid: "individualOrGroup" },
  { name: "참가자 정보", uid: "personalInfo" },
  { name: "학교명", uid: "schoolName" },
  { name: "학원명", uid: "academyName" },
  { name: "지도자 정보", uid: "instructorInfo" },
  { name: "부문", uid: "part" },
  { name: "작품 제목", uid: "artTitle" },
  { name: "음악/포즈", uid: "music/pose" },
  { name: "음악 다운로드", uid: "musicURL" },
  { name: "액션", uid: "actions" },
//   { name: "참가자 명단", uid: "participants" },
];

type Columnkey =
  | "time"
//   | "individualOrGroup"
  | "personalInfo"
  | "schoolName"
  | "academyName"
  | "instructorInfo"
  | "part"
  | "artTitle"
  | "music/pose"
  | "musicURL"
  | "actions";
//   | "participants";

type TableProps = {
  receptions: Reception2025[];
  onDelete: (docId: string) => void;
  onUpdate: (updated: Reception2025) => void;
};

const NextTable2025 = ({ receptions, onDelete, onUpdate }: TableProps): ReactNode => {
  const [editTarget, setEditTarget] = useState<Reception2025 | null>(null);

  const handleDelete = async (reception: Reception2025) => {
    if (!window.confirm(`"${reception.name}" 접수를 삭제하시겠습니까?`)) return;
    const ok = await deleteReception("2025", reception.docId!);
    if (ok) onDelete(reception.docId!);
    else alert("삭제에 실패했습니다.");
  };

  const handleSave = async (updated: Reception2025) => {
    const ok = await updateReception("2025", updated.docId!, updated);
    if (ok) {
      onUpdate(updated);
      setEditTarget(null);
    } else {
      alert("수정에 실패했습니다.");
    }
  };

  const renderCell = useCallback(
    (reception: Reception2025, columnKey: Columnkey) => {
      switch (columnKey) {
        case "time":
          return (
            <p className="w-12">
              {new Date(reception.timestamp).toDateString()+'\n'}

              {new Date(reception.timestamp).toTimeString().slice(0, 8)}
            </p>
          );
        // case "individualOrGroup":
        //   return reception.individualOrGroup;
        case "personalInfo":
          return (
            <User
              name
              description={
                <div className="ml-1 flex flex-col gap-1">
                  <p className="text-sm font-bold text-black">
                    {reception.name}
                  </p>
                  <p>{reception.gender}</p>
                  <p>{reception.birth}</p>
                  <p>{reception.email}</p>
                  {/* <p>{reception.grade || reception.leaderGrade}</p> */}
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
                  <p className="text-sm font-bold text-black">
                    {reception.instructorName}
                  </p>
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
                  a.download = `2025_${majorShort}_${reception.name}_${title}.mp3`;
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
            <div className="flex flex-col gap-1">
              <button
                className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                onClick={() => setEditTarget(reception)}
              >
                수정
              </button>
              <button
                className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                onClick={() => handleDelete(reception)}
              >
                삭제
              </button>
            </div>
          );
      }
    },
    [],
  );

  return (
    <>
      <Table
        aria-label="receptions"
        className="h-full p-2 max-h-screen overflow-y-scroll"
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={receptions} emptyContent="아직 신청자가 없습니다.">
          {(item) => (
            <TableRow key={item.docId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as Columnkey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editTarget && (
        <EditModal2026
          isOpen={true}
          reception={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={updated => handleSave(updated as Reception2025)}
        />
      )}
    </>
  );
};
export default NextTable2025;
