"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
// Types
import { NoticeType } from "@/template/notice";
// components
import Notice from "./Notice";
// Images & Icons
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

interface NoticeBodyProps {
  totalData: NoticeType[];
  totalPages: number;
  page_number: number;
  DATA_PER_PAGE: number;
}

const NoticeBody = ({
  totalData,
  totalPages,
  page_number,
  DATA_PER_PAGE,
}: NoticeBodyProps): ReactNode => {
  // Def
  const router = useRouter();
  // Constants
  let noticeData: NoticeType[] = [];
  // if (totalData.length > 0) {
  const startIndex = (page_number - 1) * DATA_PER_PAGE;
  const endIndex =
    startIndex + DATA_PER_PAGE > totalData.length
      ? totalData.length
      : startIndex + DATA_PER_PAGE;
  noticeData = totalData.slice(startIndex, endIndex);

  // Notices
  let cnt = 0;
  const notices = noticeData.map((notice) => {
    !notice.important && cnt++;
    return (
      <Notice
        key={notice.id}
        num={cnt}
        contents={notice.contents}
        timestamp={notice.timestamp}
        title={notice.title}
        viewCount={notice.viewCount}
        important={notice.important}
      />
    );
  });

  function routePageHandler(e: React.ChangeEvent<unknown>, value: number) {
    router.push(`/notification?page=${value}`);
  }

  return (
    <div className="relative w-4/5 rounded-md border-2 border-solid border-black">
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
  );
};

export default NoticeBody;
