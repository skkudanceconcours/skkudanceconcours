"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// type
import { NoticeType, NoticeViewType } from "@/template/notice";
// firebase
import { updateViewCount } from "@/lib/firebase/firebaseCRUD";

interface NoticePreviewProps extends NoticeType {
  updateNoticeCTX: (data: NoticeViewType) => void;
}

const NoticePreview = ({
  id,
  num,
  contents,
  timestamp,
  title,
  viewCount,
  important,
  updateNoticeCTX,
}: NoticePreviewProps): ReactNode => {
  // 선언
  const router = useRouter();
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
      <div className="flex w-[64%] items-center justify-center  hover:underline">
        <div
          onClick={() => {
            const queryData: NoticeViewType = {
              contents,
              timestamp: timestamp.toDate(),
              title,
              viewCount: ++viewCount, // 백엔드에 업데이트 되기 전에 Client에서 미리 표시
            };

            router.push("/notification/details", { scroll: false });
            updateViewCount(id as string);
            updateNoticeCTX(queryData);
          }}
        >
          {title}
        </div>
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
