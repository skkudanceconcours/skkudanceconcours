"use client";
import React, { ReactNode, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Types
import { NoticeType } from "@/template/notice";
// Images & Icons
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
// components
import NoticePreview from "./NoticePreview";
import Settings from "./manage/Settings";
// context
import useLoginStore from "@/lib/zustand/loginStore";

import { DATA_PER_PAGE } from "@/public/constants";

interface NoticeBodyProps {
  data: NoticeType[];
}

const NoticeBody = ({ data }: NoticeBodyProps): ReactNode => {
  // useState
  const [filteredData, setFilteredData] = useState<NoticeType[]>(data);
  const { loginState } = useLoginStore();
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Framework Hooks
  const router = useRouter();

  // constants
  let noticeData: NoticeType[] = [];
  const page_number: number = parseInt(useSearchParams().get("page") as string);

  // #2. Models
  // filter
  const findMatches = (wordToMatch: string): NoticeType[] => {
    return data.filter(input => {
      const regex = new RegExp(wordToMatch, "giu");
      return input.title.match(regex);
    });
  };

  // search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = searchInputRef.current!.value;
    !input
      ? setFilteredData(data) // 원상복구
      : setFilteredData(findMatches(input)); // 검색
  };

  const startIndex = (page_number - 1) * DATA_PER_PAGE;
  const endIndex = startIndex + DATA_PER_PAGE > filteredData.length ? filteredData.length : startIndex + DATA_PER_PAGE;
  noticeData = filteredData.slice(startIndex, endIndex);
  const totalPages = filteredData.length === 0 ? 1 : Math.ceil(filteredData.length / DATA_PER_PAGE);

  // Notices
  let idx = startIndex;

  const notices = noticeData.length ? (
    noticeData.map(notice => {
      idx++;
      return (
        <NoticePreview
          key={idx}
          id={notice.id}
          num={data.length - idx + 1}
          contents={notice.contents}
          timeStamp={notice.timeStamp}
          title={notice.title}
          viewCount={notice.viewCount}
          important={notice.important}
          files={notice.files}
        />
      );
    })
  ) : (
    <div className="flex h-[5vh] w-full items-center border-b-1 border-solid">등록된 글이 없습니다</div>
  );

  // router
  function routePageHandler(e: React.ChangeEvent<unknown>, value: number) {
    router.push(`/notification?page=${value}`, { scroll: false });
  }

  return (
    <div className="relative flex w-4/5 flex-col items-center justify-start text-xs sm:text-sm md:text-base xl:text-lg">
      <div className="relative mb-4 flex h-[5vh] w-full items-center justify-between">
        <div>
          Total {filteredData.length}건 {page_number}페이지
        </div>
        <form
          className="relative flex h-4/5 w-fit items-center justify-center rounded-md  lg:w-[15%]"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="w-full pl-1 placeholder:text-center placeholder:text-xs focus:rounded-md focus:border-1 focus:border-solid focus:border-black focus:outline-none placeholder:lg:text-base placeholder:2xl:text-xl"
            placeholder="검색어를 입력하세요"
            ref={searchInputRef}
          />
        </form>
      </div>
      <div className="flex h-[5vh] w-full items-center border-y-2 border-solid border-black">
        <span className="flex h-full w-[12%] items-center justify-center">번호</span>
        <span className="flex h-full w-[64%] items-center justify-center">제목</span>
        <span className="flex h-full w-[12%] items-center justify-center">조회수</span>
        <span className="flex h-full w-[12%] items-center justify-center">작성일</span>
      </div>
      <div className="relative w-full">
        {notices}
        <Box display="flex" justifyContent="center" alignItems="center" marginTop="1rem">
          <Pagination count={totalPages} defaultPage={1} shape="rounded" onChange={routePageHandler} variant="text" />
        </Box>
      </div>
      {loginState === "admin" ? <Settings /> : null}
    </div>
  );
};

export default NoticeBody;
