"use client";
import React, { ReactNode, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
// Types
import { NoticeType, NoticeViewType } from "@/template/notice";
// context
import { noticeContext } from "@/lib/context/notice-context";
// Images & Icons
import { IoIosSearch } from "react-icons/io";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
// components
import NoticePreview from "./NoticePreview";

interface NoticeBodyProps {
  totalData: NoticeType[];
  totalPages: number;
  page_number: number;
  DATA_PER_PAGE: number;
}

function routePageHandler(e: React.ChangeEvent<unknown>, value: number) {
  router.push(`/notification?page=${value}`);
}

const NoticeBody = ({
  totalData,
  totalPages,
  page_number,
  DATA_PER_PAGE,
}: NoticeBodyProps): ReactNode => {
  // useState
  const [focused, setFocused] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const { noticeState, setnoticeState } = useContext(noticeContext);
  // dyanmic_styles
  const searchClassName = focused
    ? "relative flex h-4/5 w-[20%] items-center justify-center rounded-md border-2 border-solid border-black duration-200"
    : "relative flex h-4/5 w-[10%] items-center justify-center rounded-md border-2 border-solid border-black duration-200";
  // Def
  const router = useRouter();
  // Constants
  let noticeData: NoticeType[] = [];

  const startIndex = (page_number - 1) * DATA_PER_PAGE;
  const endIndex =
    startIndex + DATA_PER_PAGE > totalData.length
      ? totalData.length
      : startIndex + DATA_PER_PAGE;
  noticeData = totalData.slice(startIndex, endIndex);

  // Notices
  let idx = startIndex;
  const notices = noticeData.map((notice) => {
    idx++;
    return (
      <NoticePreview
        key={notice.id}
        num={idx}
        contents={notice.contents}
        timestamp={notice.timestamp}
        title={notice.title}
        viewCount={notice.viewCount}
        important={notice.important}
        updateNoticeCTX={(data: NoticeViewType) => setnoticeState(data)}
      />
    );
  });

  return (
    <div className="relative flex w-4/5 flex-col items-center justify-start">
      <div className="relative flex h-[5vh] w-full items-center justify-between">
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
      <div className="flex h-[5vh] w-full items-center border-y-2 border-solid border-black">
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
      <div className="relative w-4/5 rounded-md">
        {notices}
        {/* <Pagination /> */}
        <Box display="flex" justifyContent="center" alignItems="center">
          <Pagination
            count={totalPages}
            shape="rounded"
            onChange={routePageHandler}
          />
        </Box>
      </div>
    </div>
  );
};

export default NoticeBody;
