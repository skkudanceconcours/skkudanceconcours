"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

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
  genderOption,
  gradeOption1,
  gradeOption2,
  individualOrGroupOption,
  majorOption,
  musicOrPoseOption,
} from "@/template/options";
import MusicInput from "./MusicInput";

const ReceptionForm = (): ReactNode => {
  //useState
  const [individualOrGroup, setIndividualOrGroup] = useState<individualOrGroup>("");
  const [gender, setGender] = useState<gender>("");
  const [major, setMajor] = useState<major>("");
  const [grade, setGrade] = useState<grade>("");
  const [category, setCategory] = useState<category>("");
  const [musicOrPose, setMusicOrPose] = useState<musicOrPose>("");

  //useRef
  const name = useRef<HTMLInputElement>(null);
  const birth = useRef<HTMLInputElement>(null);
  const contact = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const school = useRef<HTMLInputElement>(null);
  const academy = useRef<HTMLInputElement>(null);
  const instructorName = useRef<HTMLInputElement>(null);
  const instructorContact = useRef<HTMLInputElement>(null);
  const artTitle = useRef<HTMLInputElement>(null);

  //variables
  const individual: boolean = individualOrGroup !== "단체";

  //useEffects
  // useEffect(() => console.log(major,grade,category),[individualOrGroup,gender,major,grade,category,musicOrPose]);
  
  return (
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
          <div className="(참가자 정보) p-4 flex">
            <label className="text-xl">
              {individual ? "참가자 정보" : "대표자 정보"}
            </label>
            <div>
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
          </div>
          <div className="p-4 flex">
            <label className="text-xl">추가 정보</label>
            <div>
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
          <div className="(전공 상세) p-4 flex">
            <label className="text-xl">전공 상세</label>
            <div>
              <Selection<grade>
                value={grade}
                onChange={setGrade}
                label={"학년 선택"}
                placeholder="학년 선택"
                options={major === "발레" ? gradeOption1 : gradeOption2}
                disabled={major === ""}
              />
              <Selection<category>
                value={category}
                onChange={setCategory}
                label={"부문 선택"}
                placeholder="부문 선택"
                options={
                  grade === "초등부 저학년(3,4학년)"
                    ? categoryOption2
                    : major === "한국무용"
                    ? categoryOption1
                    : major === "발레"
                    ? categoryOption3
                    : categoryOption4
                }
                disabled={major === "" || grade === ""}
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
              {((major === '한국무용' && category === '전통(재구성)') 
                || (major === '발레' && category === '고전<기초실기 A,B & Variation>') 
                || (major === '현대무용' && grade === '초등부 저학년(3,4학년)')) && 
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
              }
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReceptionForm;