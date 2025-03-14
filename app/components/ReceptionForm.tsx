"use client";
import { Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

import { category, gender, grade, individualOrGroup, major, musicOrPose } from "@/template/inputTypes";
import Selection from "./UI/nextUI/Selection";
import TextInput from "./UI/nextUI/TextInput";
import { quicksand } from "@/public/fonts/font";
import {
  categoryOption1,
  categoryOption2,
  categoryOption3,
  categoryOption4,
  categoryOption5,
  categoryOption6,
  genderOption,
  gradeOption1,
  gradeOption2,
  individualOrGroupOption,
  majorOption,
  musicOrPoseOption,
} from "@/template/selectOptions";
import MusicInput from "./MusicInput";
import { Button } from "@nextui-org/react";
import { Reception2025 } from "@/template/reception";
import PrivacyPolicy from "./PrivacyPolicy";
import { submitReception, submitTest, uploadMP3File } from "@/lib/firebase/firebaseCRUD";
import { useRouter } from "next/navigation";
import { Path } from "@/template/paths";

const ReceptionForm = (): ReactNode => {
  //useState
  // const [individualOrGroup, setIndividualOrGroup] = useState<individualOrGroup>('');
  const [gender, setGender] = useState<gender>("");
  const [major, setMajor] = useState<major>("");
  const [grade, setGrade] = useState<grade>("");
  const [category, setCategory] = useState<category>("");
  const [musicOrPose, setMusicOrPose] = useState<musicOrPose>("");
  const [participantsList, setParticipantsList] = useState<string[]>([]);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [privacyConfirm, setPrivacyConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  //useState_errors_textInputs
  const [nameError, setNameError] = useState<boolean>(false);
  const [birthError, setBirthError] = useState<boolean>(false);
  const [contactError, setContactError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [schoolError, setSchoolError] = useState<boolean>(false);
  // const [leaderGradeError, setLeaderGradeError] = useState<boolean>(false);
  const [academyError, setAcademyError] = useState<boolean>(false);
  const [instructorNameError, setInstructorNameError] = useState<boolean>(false);
  const [instructorContactError, setInstructorContactError] = useState<boolean>(false);
  const [artTitleError, setArtTitleError] = useState<boolean>(false);
  //useState_errors_selections
  const [individualOrGroupError, setIndividualOrGroupError] = useState<boolean>(false);
  const [genderError, setGenderError] = useState<boolean>(false);
  const [majorError, setMajorError] = useState<boolean>(false);
  const [gradeError, setGradeError] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [musicOrPoseError, setMusicOrPoseError] = useState<boolean>(false);
  // const [participantError, setParticipantError] = useState<boolean>(false);
  //useState_error_music
  const [musicFileError, setMusicFileError] = useState<boolean>(false);
  //useState_error_privacy
  const [privacyConfirmError, setPrivacyConfirmError] = useState<boolean>(false);

  //useRef_textInputs
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);
  const academyRef = useRef<HTMLInputElement>(null);
  // const leaderGradeRef = useRef<HTMLInputElement>(null);
  const instructorNameRef = useRef<HTMLInputElement>(null);
  const instructorContactRef = useRef<HTMLInputElement>(null);
  const artTitleRef = useRef<HTMLInputElement>(null);
  const participantRef = useRef<HTMLInputElement>(null);
  //useRef_selections
  // const individualOrGroupRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const majorRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const musicOrPoseRef = useRef<HTMLInputElement>(null);
  //useRef_music
  const musicFileRef = useRef<HTMLDivElement>(null);
  //useRef_scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  //useRouter
  const router = useRouter();

  //useEffects
  useEffect(() => setPrivacyConfirmError(false), [privacyConfirm]);

  //variables
  // const individual: boolean = individualOrGroup !== '단체';
  const selectMusicOrPose =
    (major === "한국무용" && (category === "전통" || category === "창작")) ||
    (major === "발레" && (category === "고전<기초실기 A,B & Variation>" || category === "창작"));
  const selectArtTitle = major !== "컨템포러리댄스";
  const selectMusic =
    category == "창작" ||
    (major === "한국무용" && category === "전통") ||
    (major === "발레" && category === "고전<기초실기 A,B & Variation>");

  //functions
  const checkError = (): boolean => {
    let error = false;

    (
      [
        // [individualOrGroupRef, individualOrGroup, setIndividualOrGroupError],
        [genderRef, gender, setGenderError],
        [majorRef, major, setMajorError],
        [gradeRef, grade, setGradeError],
        [categoryRef, category, setCategoryError],
        [musicOrPoseRef, musicOrPose, setMusicOrPoseError],
      ] as [RefObject<HTMLInputElement>, string, Dispatch<SetStateAction<boolean>>][]
    ).forEach(([ref, element, setError]) => {
      console.log(element);
      if (ref.current && !element) {
        setError(true);
        error = true;
      }
    });

    (
      [
        [nameRef, setNameError],
        [birthRef, setBirthError],
        [contactRef, setContactError],
        [emailRef, setEmailError],
        [schoolRef, setSchoolError],
        // [leaderGradeRef, setLeaderGradeError],
        [academyRef, setAcademyError],
        [instructorNameRef, setInstructorNameError],
        [instructorContactRef, setInstructorContactError],
        [artTitleRef, setArtTitleError],
      ] as [RefObject<HTMLInputElement>, Dispatch<SetStateAction<boolean>>][]
    ).forEach(([ref, setError]) => {
      if (ref.current && !ref.current.value) {
        setError(true);
        error = true;
      }
    });

    //music file check
    if (musicFileRef.current && !musicFile) {
      setMusicFileError(true);
      error = true;
    }
    return error;
  };

  const onSubmit = async () => {
    if (checkError()) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (privacyConfirm === false) {
      setPrivacyConfirmError(true);
      return;
    }
    console.log("no error");
    setLoading(true);

    const currentTime: Date = new Date();
    const fileURL: string | null = await uploadMP3File(
      `${nameRef.current!.value.trim()}${currentTime.toString()}`,
      musicFile,
    );

    const newReception: Reception2025 = {
      timestamp: currentTime,
      // individualOrGroup: individualOrGroup,
      name: nameRef.current!.value.trim(),
      gender: gender,
      birth: birthRef.current!.value.trim(),
      contact: contactRef.current!.value.trim(),
      email: emailRef.current!.value.trim(),
      school: schoolRef.current!.value.trim(),
      // leaderGrade: leaderGradeRef.current ? leaderGradeRef.current.value.trim() : null,
      academy: academyRef.current!.value.trim(),
      instructorName: instructorNameRef.current!.value.trim(),
      instructorContact: instructorContactRef.current!.value.trim(),
      major: major,
      grade: grade,
      category: category,
      artTitle: selectArtTitle && artTitleRef.current ? artTitleRef.current!.value : null,
      musicFileURL: selectMusic ? fileURL : null,
      musicOrPose: selectMusicOrPose ? musicOrPose : null,
      // participants: participantsList,
    };
    const docId = await submitReception(newReception);
    if (docId) {
      router.replace("/reception/submit" as Path);
    } else {
      console.log("submission failed");
    }
    setLoading(false);
  };

  // const onAddParticipant = (e: any) => {
  //   e.preventDefault();
  //   if (participantRef && participantRef.current) {
  //     if (participantRef.current!.value.trim() === "") {
  //       setParticipantError(true);
  //       return;
  //     }
  //     setParticipantsList(prev => [...prev, participantRef.current!.value]);
  //     participantRef.current!.value = "";
  //   }
  // };

  // const onRemoveParticipant = (target: string) => {
  //   const newList = participantsList.filter(participant => participant !== target);
  //   setParticipantsList(newList);
  // };

  return (
    <div className="flex flex-col">
      <div ref={scrollRef}></div>
      <form className={`flex flex-col lg:flex-row lg:gap-20 ${quicksand.className}`}>
        <div>
          {/* <Selection
            value={individualOrGroup}
            onChange={(value: string) => {
              console.log('value:', value);
              setIndividualOrGroup(value as individualOrGroup);
              setIndividualOrGroupError(false);
            }}
            label={'개인/단체 선택'}
            placeholder='개인/단체 선택'
            error={individualOrGroupError}
            options={individualOrGroupOption}
            ref={individualOrGroupRef}
          /> */}
          <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="flex flex-col p-8">
              <label className="text-xl">참가자 정보</label>
              <TextInput label="참가자 이름" error={nameError} ref={nameRef} onChange={() => setNameError(false)} />
              <Selection
                value={gender}
                onChange={(value: string) => {
                  setGender(value as gender);
                  setGenderError(false);
                }}
                label="성별"
                placeholder="성별 선택"
                error={genderError}
                options={genderOption}
                ref={genderRef}
              />
              <TextInput
                label="생년월일"
                error={birthError}
                ref={birthRef}
                onChange={() => setBirthError(false)}
                description="*예) 2024-01-01"
              />
              <TextInput
                label="참가자 연락처"
                error={contactError}
                ref={contactRef}
                onChange={() => setContactError(false)}
                description="*예) 010-1234-5678"
              />
              <TextInput label="이메일" error={emailError} ref={emailRef} onChange={() => setEmailError(false)} />
            </div>
            <div className="flex flex-col p-8">
              <label className="text-xl">추가 정보</label>

              <TextInput
                label="학교명"
                error={schoolError}
                ref={schoolRef}
                description="*(홈스쿨링은 '홈스쿨링'으로 기재)"
                onChange={() => setSchoolError(false)}
              />
              <TextInput
                label="학원명"
                error={academyError}
                ref={academyRef}
                description="*(없을 경우, '없음'으로 기재)"
                onChange={() => setAcademyError(false)}
              />
              <TextInput
                label="지도자 성함"
                error={instructorNameError}
                ref={instructorNameRef}
                onChange={() => setInstructorNameError(false)}
              />
              <TextInput
                label="지도자 연락처"
                error={instructorContactError}
                ref={instructorContactRef}
                onChange={() => setInstructorContactError(false)}
                description="*예) 010-1234-5678"
              />
            </div>
          </div>
        </div>
        <div>
          <Selection
            value={major}
            onChange={(value: string) => {
              setMajor(value as major);
              setMajorError(false);
            }}
            label={"전공 선택"}
            placeholder="전공 선택"
            error={majorError}
            options={majorOption}
            ref={majorRef}
          />
          <div className="my-10 flex gap-10">
            <div className="flex flex-col p-8">
              <label className="text-xl">전공 상세</label>

              <Selection
                value={grade}
                onChange={(value: string) => {
                  setGrade(value as grade);
                  setGradeError(false);
                }}
                label={"학년 선택"}
                placeholder="학년 선택"
                options={major === "발레" ? gradeOption1 : gradeOption2}
                error={gradeError}
                ref={gradeRef}
                disabled={major == ""}
              />
              <Selection
                value={category}
                onChange={(value: string) => {
                  setCategory(value as category);
                  setCategoryError(false);
                }}
                label={"부문 선택"}
                placeholder="부문 선택"
                error={categoryError}
                options={major === "한국무용" ? categoryOption1 : major === "발레" ? categoryOption3 : categoryOption4}
                ref={categoryRef}
                disabled={!major || !grade}
                width={250}
              />
              {selectArtTitle && (
                <TextInput
                  label="작품 제목"
                  error={artTitleError}
                  ref={artTitleRef}
                  disabled={major === "" || grade === "" || category === "즉흥"}
                  value={category === "즉흥" ? "즉흥" : undefined}
                  clearable={category !== "즉흥"}
                  onChange={() => setArtTitleError(false)}
                />
              )}
              {selectMusicOrPose && (
                <Selection
                  value={musicOrPose}
                  onChange={(value: string) => {
                    setMusicOrPose(value as musicOrPose);
                    setMusicOrPoseError(false);
                  }}
                  label={"음악/포즈 선택"}
                  placeholder={"음악/포즈 선택"}
                  error={musicOrPoseError}
                  options={musicOrPoseOption}
                  ref={musicOrPoseRef}
                />
              )}
              {selectMusic && (
                <MusicInput
                  onChange={(file: File) => {
                    setMusicFile(file);
                    setMusicFileError(false);
                  }}
                  fileName={musicFile ? musicFile.name : null}
                  error={musicFileError}
                  ref={musicFileRef}
                />
              )}
            </div>
          </div>
        </div>
      </form>
      <PrivacyPolicy setPrivacyConfirm={setPrivacyConfirm} />
      <Button className="w-40 self-center" onClick={onSubmit} isLoading={loading} color={"primary"}>
        접수하기
      </Button>
      <p className="mt-4 h-8 text-center text-red-500">
        {privacyConfirmError && "*개인정보 수집 및 이용 동의가 필요합니다"}
      </p>
    </div>
  );
};

export default ReceptionForm;
