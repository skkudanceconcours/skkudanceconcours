"use client";
import { Reception } from "@/template/Reception";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  NextUIProvider,
  User,
} from "@nextui-org/react";
import { IoPersonSharp } from "react-icons/io5";
import { ReactNode, useCallback } from "react";

const columns = [
  { name: "개인/단체", uid: "individualOrGroup" },
  { name: "참가자(대표자) 정보", uid: "personalInfo" },
  { name: "학교명", uid: "schoolName" },
  { name: "학원명", uid: "academyName" },
  { name: "지도자 정보", uid: "instructorInfo" },
  { name: "부문", uid: "part" },
  { name: "작품 제목", uid: "artTitle" },
  { name: "음악/포즈", uid: "music/pose" },
  { name: "음악 다운로드", uid: "musicURL"},
  { name: "참가자 명단", uid: "participants" },
];

type TableProps = {
//   receptionList: Reception[];
};

type Columnkey =
  | "individualOrGroup"
  | "personalInfo"
  | "schoolName"
  | "academyName"
  | "instructorInfo"
  | "part"
  | "artTitle"
  | "music/pose"
  | "musicURL"
  | "participants";

const dummyData: Reception[] = [
  {
    timestamp: new Date(),
    individualOrGroup: "개인",
    name: "정정환",
    gender: "남자",
    birth: "2000-05-13",
    contact: "010-9025-8656",
    email: "wjdwjdghks00@naver.com",
    school: "성균관대",
    leaderGrade: null,
    academy: "없음",
    instructorName: "지도자",
    instructorContact: "010-9025-8656",
    major: "발레",
    grade: "중등부 고학년(3학년)",
    category: "규정<Movement Phrase 1,2>",
    artTitle: "백조의 호수",
    musicFileURL: "fsnkgsngngnegnegneg.com",
    musicOrPose: "음악 먼저",
    participants: [],
  },
];
const NextTable = ({}: TableProps): ReactNode => {

  const renderCell = useCallback(
    (reception: Reception, columnKey: Columnkey) => {
        
      switch (columnKey) {
        case "individualOrGroup":
          return reception.individualOrGroup;
        case "personalInfo":
          return (
            <User name
            description={<div className="flex flex-col ml-1 gap-1">
                <p className="font-bold text-sm text-black">{reception.name}</p>
                <p>{reception.gender}</p>
                <p>{reception.birth}</p>
                <p>{reception.email}</p>
                <p>{reception.grade || reception.leaderGrade}</p>
                <p>{reception.contact}</p>
            </div>}
            avatarProps={<IoPersonSharp/>}
                />
              
          );
        case "schoolName":
          return reception.school;
        case "academyName":
          return reception.academy;
        case "instructorInfo":
          return (
            <User name
              description={<div className="flex flex-col ml-1 gap-1">
                <p className="font-bold text-sm text-black">{reception.instructorName}</p>
                <p>{reception.instructorContact}</p>
              </div>}
              avatarProps={<IoPersonSharp/>}
              />
          );
        case "part":
          return (
            <div className="flex flex-col gap-1">
              <p>{reception.major}</p>
              <p>{reception.grade}</p>
              <p>{reception.category}</p>
            </div>
          );
        case "artTitle":
          return reception.artTitle;
        case "music/pose":
          return reception.musicOrPose;
        case "musicURL":
          return reception.musicFileURL;
        case "participants":
          return( <div>
            {reception.participants?.map(participant => <p key={participant}>{participant}</p>)}
          </div>);
      }
    },
    [],
  );

  return (
    <NextUIProvider>
      <Table
        aria-label="receptions"
        className="relative max-h-screen overflow-y-scroll"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={dummyData}>
          {(item) => (
            <TableRow key={item.timestamp.toISOString() }>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as Columnkey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </NextUIProvider>
  );
};
export default NextTable;
