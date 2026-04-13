"use client";
import { ReactNode, useState } from "react";
import { Reception2025, Reception2026 } from "@/template/reception";
import { gender, grade, major, musicOrPose } from "@/template/inputTypes";
import { genderOption, gradeOption1, gradeOption2, majorOption, musicOrPoseOption } from "@/template/selectOptions";
import NextTextInput from "@/app/components/UI/nextUI/TextInput";
import NextSelection from "@/app/components/UI/nextUI/Selection";
import MusicInput from "@/app/components/MusicInput";
import { uploadMP3File } from "@/lib/firebase/firebaseCRUD";
import useBodyScrollLock from "@/lib/hooks/useBodyScrollLock";
import { Button } from "@nextui-org/react";

type EditableReception = Reception2026 | Reception2025;

type Props = {
  isOpen: boolean;
  reception: EditableReception;
  onClose: () => void;
  onSave: (updated: EditableReception) => void;
};

const W = "!w-full";

const EditModal2026 = ({ isOpen, reception, onClose, onSave }: Props): ReactNode => {
  const [form, setForm] = useState<EditableReception>({ ...reception });
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useBodyScrollLock();

  if (!isOpen) return null;

  const setField = <K extends keyof EditableReception>(key: K, value: EditableReception[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const currentMajor = form.major as major;
  const selectMusicOrPose = currentMajor === "한국무용 <전통>" || currentMajor === "발레 <고전>";
  const selectArtTitle = currentMajor !== "컨템포러리댄스 <규정>";
  const selectMusic = currentMajor === "한국무용 <전통>" || currentMajor === "발레 <고전>";

  const handleSave = async () => {
    setSaving(true);
    let updatedForm = { ...form };

    if (selectMusic && musicFile) {
      const newURL = await uploadMP3File(
        `${form.name}_edit_${new Date().getTime()}`,
        musicFile,
      );
      if (newURL) updatedForm = { ...updatedForm, musicFileURL: newURL };
    }

    await onSave(updatedForm);
    setSaving(false);
  };

  const handleMajorChange = (value: string) => {
    setForm(prev => ({
      ...prev,
      major: value as major,
      grade: "" as grade,
      musicOrPose: null,
      artTitle: null,
      musicFileURL: null,
    }));
    setMusicFile(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 lg:items-center lg:justify-center lg:p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl lg:max-w-3xl lg:rounded-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* 바텀 시트 핸들 (모바일) */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300 lg:hidden" />

        <h2 className="mb-4 text-xl font-bold">접수 내역 수정</h2>

        {/* 참가자 정보 */}
        <p className="mb-1 font-semibold text-gray-600">참가자 정보</p>
        <div className="grid grid-cols-2 gap-x-3">
          <NextTextInput
            className={W}
            label="참가자 이름"
            value={form.name}
            onChange={e => setField("name", e?.target.value ?? "")}
          />
          <NextSelection
            className={W}
            width="100%"
            label="성별"
            options={genderOption}
            value={form.gender}
            onChange={value => setField("gender", value as gender)}
            error={false}
          />
          <NextTextInput
            className={W}
            label="생년월일"
            value={form.birth}
            onChange={e => setField("birth", e?.target.value ?? "")}
          />
          <NextTextInput
            className={W}
            label="연락처"
            value={form.contact}
            onChange={e => setField("contact", e?.target.value ?? "")}
          />
          <NextTextInput
            className={W}
            label="이메일"
            value={form.email}
            onChange={e => setField("email", e?.target.value ?? "")}
          />
        </div>

        {/* 추가 정보 */}
        <p className="mb-1 mt-2 font-semibold text-gray-600">추가 정보</p>
        <div className="grid grid-cols-2 gap-x-3">
          <NextTextInput
            className={W}
            label="학교명"
            value={form.school}
            onChange={e => setField("school", e?.target.value ?? "")}
          />
          <NextTextInput
            className={W}
            label="학원명"
            value={form.academy}
            onChange={e => setField("academy", e?.target.value ?? "")}
          />
          <NextTextInput
            className={W}
            label="지도자 성함"
            value={form.instructorName}
            onChange={e => setField("instructorName", e?.target.value ?? "")}
          />
          <NextTextInput
            className={W}
            label="지도자 연락처"
            value={form.instructorContact}
            onChange={e => setField("instructorContact", e?.target.value ?? "")}
          />
        </div>

        {/* 전공 상세 */}
        <p className="mb-1 mt-2 font-semibold text-gray-600">전공 상세</p>
        <div className="grid grid-cols-2 gap-x-3">
          <NextSelection
            className={W}
            width="100%"
            label="전공 선택"
            options={majorOption}
            value={form.major}
            onChange={handleMajorChange}
            error={false}
          />
          <NextSelection
            className={W}
            width="100%"
            label="학년 선택"
            options={currentMajor === "발레 <고전>" ? gradeOption1 : gradeOption2}
            value={form.grade}
            onChange={value => setField("grade", value as grade)}
            error={false}
            disabled={!currentMajor}
          />
          {selectArtTitle && (
            <NextTextInput
              className={W}
              label="작품 제목"
              value={form.artTitle ?? ""}
              onChange={e => setField("artTitle", e?.target.value ?? null)}
            />
          )}
          {selectMusicOrPose && (
            <NextSelection
              className={W}
              width="100%"
              label="음악/포즈 선택"
              options={musicOrPoseOption}
              value={form.musicOrPose ?? ""}
              onChange={value => setField("musicOrPose", value as musicOrPose)}
              error={false}
            />
          )}
        </div>

        {selectMusic && (
          <div className="mt-2">
            {form.musicFileURL && !musicFile && (
              <div className="mb-2 flex flex-col gap-1">
                <p className="text-xs text-gray-400">현재 음원</p>
                <a
                  href={form.musicFileURL}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-sm text-blue-500 underline"
                >
                  {form.musicFileURL}
                </a>
              </div>
            )}
            <MusicInput
              label="음원 재제출"
              onChange={file => setMusicFile(file)}
              fileName={musicFile ? musicFile.name : null}
              error={false}
            />
          </div>
        )}

        {/* 버튼 */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="flat" onPress={onClose} isDisabled={saving}>
            취소
          </Button>
          <Button color="primary" onPress={handleSave} isLoading={saving}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModal2026;
