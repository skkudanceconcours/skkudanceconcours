"use client";
import { MouseEventHandler, ReactNode, useRef, useState } from "react";

import {
  category,
  gender,
  grade,
  individualOrGroup,
  major,
  musicOrPose,
} from "@/template/inputTypes";
import Selection from "./Selection";
import TextInput from "./TextInput";
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
} from "@/template/options";
import MusicInput from "./MusicInput";
import Button from "./Button";

const ReceptionForm = (): ReactNode => {
  //useState
  const [individualOrGroup, setIndividualOrGroup] =
    useState<individualOrGroup>("");
  const [gender, setGender] = useState<gender>("");
  const [major, setMajor] = useState<major>("");
  const [grade, setGrade] = useState<grade>("");
  const [category, setCategory] = useState<category>("");
  const [musicOrPose, setMusicOrPose] = useState<musicOrPose>("");
  const [participantsList, setParticipantsList] = useState<string[]>([]);

  const [participantError,setParticipantError] = useState<boolean>(false); 

  //useRef
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);
  const academyRef = useRef<HTMLInputElement>(null);
  const instructorNameRef = useRef<HTMLInputElement>(null);
  const instructorContactRef = useRef<HTMLInputElement>(null);
  const artTitleRef = useRef<HTMLInputElement>(null);
  const participantRef = useRef<HTMLInputElement>(null);



  //variables
  const individual: boolean = individualOrGroup !== "단체";

  //functions
  const onSubmit = () => {};

  const onAddParticipant = (e:any) =>{
    e.preventDefault();
    if(participantRef && participantRef.current){
      if(participantRef.current!.value.trim() === ''){
        setParticipantError(true);
        return;
      }
      setParticipantsList(prev => [...prev, participantRef.current!.value]);
      participantRef.current!.value = '';
    }
    // console.log(participantsList)
  }

  //useEffects
  // useEffect(() => console.log(major,grade,category),[individualOrGroup,gender,major,grade,category,musicOrPose]);

  return (
    <div className="flex flex-col">
      <form className={`pt-10 flex gap-20 ${quicksand.className}`}>
        <div>
          <Selection<individualOrGroup>
            value={individualOrGroup}
            onChange={setIndividualOrGroup}
            label={"개인/단체 선택"}
            placeholder="개인/단체 선택"
            options={individualOrGroupOption}
          />
          <div className="flex gap-10 my-10">
            <div className="(참가자 정보) p-8 flex flex-col">
              <label className="text-xl">
                {individual ? "참가자 정보" : "대표자 정보"}
              </label>
              <TextInput
                label="참가자 이름"
                error={false}
                helperText={!individual ? "(대표자 이름 외 00명)" : ""}
              />
              <Selection
                value={gender}
                onChange={setGender}
                label={"성별"}
                placeholder="성별 선택"
                options={genderOption}
              />
              <TextInput label="생년월일" error={false} />
              <TextInput label="참가자 연락처" error={false} />
              <TextInput label="이메일" error={false} />
            </div>
            <div className="p-8 flex flex-col">
              <label className="text-xl">추가 정보</label>

              <TextInput
                label="학교명"
                error={false}
                helperText="*(홈스쿨링은 '홈스쿨링'으로 기재)"
              />
              <TextInput
                label="학원명"
                error={false}
                helperText="*(없을 경우, '없음'으로 기재)"
              />
              <TextInput label="지도자 성함" error={false} />
              <TextInput label="지도자 연락처" error={false} />
            </div>
          </div>
        </div>
        <div>
          <Selection<major>
            value={major}
            onChange={setMajor}
            label={"전공 선택"}
            placeholder="전공 선택"
            options={majorOption}
          />
          <div className="flex gap-10 my-10">
            <div className="(전공 상세) p-8 flex flex-col">
              <label className="text-xl">전공 상세</label>

              {individual && (
                <Selection<grade>
                  value={grade}
                  onChange={setGrade}
                  label={"학년 선택"}
                  placeholder="학년 선택"
                  options={major === "발레" ? gradeOption1 : gradeOption2}
                  disabled={major === ""}
                />
              )}
              <Selection<category>
                value={category}
                onChange={setCategory}
                label={"부문 선택"}
                placeholder="부문 선택"
                options={
                  individual
                    ? grade === "초등부 저학년(3,4학년)"
                      ? categoryOption2
                      : major === "한국무용"
                      ? categoryOption1
                      : major === "발레"
                      ? categoryOption3
                      : categoryOption4
                    : major === "한국무용" || major === "현대무용"
                    ? categoryOption5
                    : categoryOption6
                }
                disabled={individual && (major === "" || grade === "")}
              />
              <TextInput
                label="작품 제목"
                error={false}
                disabled={
                  major === "" ||
                  grade === "" ||
                  category === "즉흥" ||
                  category === "즉흥<Movement Phrase 1 & 즉흥>" ||
                  category === "즉흥<기초실기 A,B & 즉흥>"
                }
                value={
                  category === "즉흥" ||
                  category === "즉흥<Movement Phrase 1 & 즉흥>" ||
                  category === "즉흥<기초실기 A,B & 즉흥>"
                    ? "즉흥"
                    : ""
                }
              />
              {(!individual ||
                (individual &&
                  ((major === "한국무용" && category === "전통(재구성)") ||
                    (major === "발레" &&
                      category === "고전<기초실기 A,B & Variation>") ||
                    (major === "현대무용" &&
                      grade === "초등부 저학년(3,4학년)")))) && (
                <>
                  <Selection<musicOrPose>
                    value={musicOrPose}
                    onChange={setMusicOrPose}
                    label={"음악/포즈 선택"}
                    placeholder={"음악/포즈 선택"}
                    options={musicOrPoseOption}
                  />
                  <MusicInput />
                </>
              )}
            </div>
            {!individual && (
              <div className="(참가자 정보) p-8 flex flex-col">
                <label className="text-xl">참가자 정보</label>
                {participantsList.map(participant => 
                  <p
                    className="p-6" 
                    key={participant}>{participant}</p>)}
                <TextInput
                  label={"참가자 추가"}
                  helperText="*이름/학교/학년"
                  ref={participantRef}
                  onChange={()=>setParticipantError(false)}
                  error={participantError}
                />
                <button
                  className="self-center underline underline-offset-4 m-4"
                  onClick={(e)=>{onAddParticipant(e)}}>추가</button>
              </div>
            )}
          </div>
        </div>
      </form>
      <Button className="w-40 self-center" onClick={onSubmit}>
        제출하기
      </Button>
    </div>
  );
};

export default ReceptionForm;
