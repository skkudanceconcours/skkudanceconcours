import React, { ReactNode } from "react";
// type
import { NoticeType } from "@/template/notice";

const Notice = ({
  contents,
  num,
  timestamp,
  title,
  viewCount,
  important,
}: NoticeType): ReactNode => {
  const month: String = String(timestamp.toDate().getMonth() + 1).padStart(
    2,
    "0",
  ); // 월을 가져와서 두 자리 수로 만듭니다.
  const day: String = String(timestamp.toDate().getDate()).padStart(2, "0"); // 일을 가져와서 두 자리 수로 만듭니다.
  const dateString: string = `${month}-${day}`;

  // dyanmic_styles
  const is_imp = important
    ? "flex w-full items-center bg-blue-400 font-bold"
    : "flex w-full items-center bg-red-400";
  return (
    <div className={is_imp}>
      <div className="flex h-5 w-[12%] items-center justify-center">
        {important ? "공지" : num}
      </div>
      <div className="flex h-5 w-[64%] items-center justify-center">
        {title}
      </div>
      <div className="flex h-5 w-[12%] items-center justify-center">
        {viewCount}
      </div>
      <div className="flex h-5 w-[12%] items-center justify-center">
        {dateString}
      </div>
    </div>
  );
};

export default Notice;
