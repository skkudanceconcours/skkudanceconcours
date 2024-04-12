"use client";
import { Reception } from "@/template/reception";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { ReactNode, useCallback, useEffect } from "react";

const columns = [
  { name: "날짜", uid: "time" },
  { name: "개인/단체", uid: "individualOrGroup" },
  { name: "참가자(대표자) 정보", uid: "personalInfo" },
  { name: "학교명", uid: "schoolName" },
  { name: "학원명", uid: "academyName" },
  { name: "지도자 정보", uid: "instructorInfo" },
  { name: "부문", uid: "part" },
  { name: "작품 제목", uid: "artTitle" },
  { name: "음악/포즈", uid: "music/pose" },
  { name: "음악 다운로드", uid: "musicURL" },
  { name: "참가자 명단", uid: "participants" },
];

type Columnkey =
  | "time"
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

type TableProps = {
  receptions: Reception[];
};
const NextTable = ({ receptions }: TableProps): ReactNode => {
  const renderCell = useCallback(
    (reception: Reception, columnKey: Columnkey) => {
      switch (columnKey) {
        case "time":
          return (
            <p className="w-12">
              {new Date(reception.timestamp).toDateString()+'\n'}
              
              {new Date(reception.timestamp).toTimeString().slice(0, 8)}
            </p>
          );
        case "individualOrGroup":
          return reception.individualOrGroup;
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
                  <p>{reception.grade || reception.leaderGrade}</p>
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
              <p>{reception.category}</p>
            </div>
          );
        case "artTitle":
          return reception.artTitle;
        case "music/pose":
          return reception.musicOrPose;
        case "musicURL":
          return (
            <div className="flex w-32 flex-wrap overflow-x-auto">
              <a
                className="cursor-pointer underline"
                target="_blank"
                href={reception.musicFileURL ?? undefined}
              >
                {reception.musicFileURL}
              </a>
            </div>
          );
        case "participants":
          return (
            <div>
              {reception.participants?.map((participant) => (
                <p key={participant}>{participant}</p>
              ))}
            </div>
          );
      }
    },
    [],
  );

  return (
    <Table
      aria-label="receptions"
      className="h-full p-2 max-h-screen overflow-y-scroll"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={receptions}>
        {(item) => (
          <TableRow key={new Date(item.timestamp).toISOString()}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as Columnkey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default NextTable;
