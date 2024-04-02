"use client";
// import { tableSortLabelClasses } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
// Icons & Image
import { IoIosSearch } from "react-icons/io";

const NoticeHeader = (): ReactNode => {
  // useState
  const [focused, setFocused] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  // Constants
  const subjectList: string[] = ["번호", "제목", "조회수", "작성일"];

  // dyanmic_styles
  const searchClassName = focused
    ? "relative flex h-4/5 w-[20%] items-center justify-center rounded-md border-2 border-solid border-black duration-200"
    : "relative flex h-4/5 w-[10%] items-center justify-center rounded-md border-2 border-solid border-black duration-200";

  // test
  useEffect(() => {
    // console.log(searchInput);
  }, []);
  return (
    <div className="relative flex min-h-[30%] w-4/5  flex-col items-center justify-start bg-blue-400">
      <p className="flex h-3/5 w-full items-end justify-start bg-red-400 text-5xl font-semibold">
        공지사항
      </p>
      <div className="relative flex h-1/5 w-full items-center justify-between">
        <div>Total 20건 1페이지</div>
        <div className={searchClassName}>
          <IoIosSearch style={{ margin: "0 10px 0 10px" }} />
          <input
            type="text"
            value={searchInput}
            className="w-full focus:outline-none"
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setSearchInput("");
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex h-1/5 w-full items-center bg-slate-500">
        <span className="flex h-full w-[12%] items-center justify-center">
          번호
        </span>
        <span className="flex h-full w-[64%] items-center justify-center">
          제목
        </span>
        <span className="flex h-full w-[12%] items-center justify-center">
          조회수
        </span>
        <span className="flex h-full w-[12%] items-center justify-center">
          작성일
        </span>
      </div>
    </div>
  );
};

export default NoticeHeader;
