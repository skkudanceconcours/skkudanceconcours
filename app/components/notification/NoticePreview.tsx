"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
// type
import { NoticeType, NoticeViewType } from "@/template/notice";
import { update } from "firebase/database";

interface NoticePreviewProps extends NoticeType {
  updateNoticeCTX: (data: NoticeViewType) => void;
}

const NoticePreview = ({
  contents,
  num,
  timestamp,
  title,
  viewCount,
  important,
  updateNoticeCTX,
}: NoticePreviewProps): ReactNode => {
  // 선언
  const month: String = String(timestamp.toDate().getMonth() + 1).padStart(
    2,
    "0",
  );
  const day: String = String(timestamp.toDate().getDate()).padStart(2, "0"); // 일을 가져와서 두 자리 수로 만듭니다.
  const dateString: string = `${month}-${day}`;

  // dyanmic_styles
  const is_imp = important
    ? "flex h-[5vh] w-full items-center font-bold border-b-1 border-solid border-[#e8e8e8] bg-[#fbfbfb]"
    : "flex h-[5vh] w-full items-center border-b-1 border-solid border-[#e8e8e8] hover:bg-[#fbfbfb]";

  return (
    <div className={is_imp}>
      <div className="flex w-[12%] items-center justify-center">
        {important ? "공지" : num}
      </div>
      <div
        className="flex w-[64%] items-center justify-center  hover:underline"
        onClick={() => {
          const queryData: NoticeViewType = {
            contents,
            timestamp: timestamp.toDate(),
            title,
            viewCount,
          };
          updateNoticeCTX(queryData);
        }}
      >
        <Link
          href={{
            pathname: "/notification/details",
          }}
          scroll={false}
        >
          {title}
        </Link>
      </div>
      <div className="flex w-[12%] items-center justify-center">
        {viewCount}
      </div>
      <div className="flex w-[12%] items-center justify-center">
        {dateString}
      </div>
    </div>
  );
};

export default NoticePreview;
