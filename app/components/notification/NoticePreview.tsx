"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
// type
import { NoticeType, NoticeViewType } from "@/template/notice";
// firebase
import { updateViewCount } from "@/lib/firebase/firebaseCRUD";
// context
import useNoticeStore from "@/lib/zustand/noticeStore";

const NoticePreview = ({
  id,
  num,
  contents,
  timeStamp,
  title,
  viewCount,
  important,
  files,
}: NoticeType): ReactNode => {
  timeStamp = new Date(timeStamp);
  // 선언
  const router = useRouter();
  const { setNoticeState } = useNoticeStore();
  const month: String = String(timeStamp.getMonth() + 1).padStart(2, "0");
  const day: String = String(timeStamp.getDate()).padStart(2, "0"); // 일을 가져와서 두 자리 수로 만듭니다.
  const dateString: string = `${month}-${day}`;

  // dynamic_styles
  const is_imp = important
    ? "flex h-[5.5vh] w-full items-center font-bold border-b-1 border-solid border-[#e8e8e8] bg-[#fbfbfb]"
    : "flex h-[5.5vh] w-full items-center border-b-1 border-solid border-[#e8e8e8] hover:bg-[#fbfbfb]";

  return (
    <div className={is_imp}>
      <div className="flex w-[12%] items-center justify-center">
        {important ? "공지" : num}
      </div>
      <div className="flex w-[64%] items-center justify-center  hover:cursor-pointer hover:underline">
        <div
          className="cursor-pointer"
          onClick={() => {
            const queryData: NoticeViewType = {
              id,
              contents,
              timeStamp: timeStamp,
              title,
              viewCount: ++viewCount, // 백엔드에 업데이트 되기 전에 Client에서 미리 표시
              files: files,
            };

            updateViewCount(id as string);
            setNoticeState(queryData);
            router.push("/notification/details", { scroll: false });
          }}
        >
          {title ? title : "(제목이 없습니다)"}
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
