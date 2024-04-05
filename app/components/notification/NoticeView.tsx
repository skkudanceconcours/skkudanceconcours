import React, { ReactNode } from "react";
// Types
import { NoticeViewType } from "@/template/notice";

const NoticeView = ( {contents, title, viewCount}  : NoticeViewType): ReactNode => {

  // const formattedDate: string = data.timestamp
  //   ? `${data.timestamp.getFullYear().toString().slice(-2)}-${(data.timestamp.getMonth() + 1).toString().padStart(2, "0")}-${data.timestamp.getDate().toString().padStart(2, "0")} ${data.timestamp.getHours().toString().padStart(2, "0")}:${data.timestamp.getMinutes().toString().padStart(2, "0")}`
  //   : "";

  const formattedDate = "";
  console.log(formattedDate); // 출력: "24-04-02 18:37"
  return (
    <div className="relative flex h-[20vh] w-4/5 flex-col justify-start">
      <section className="flex h-[8vh] w-full items-center justify-start text-3xl font-semibold">
        {title}
      </section>
      <section className="flex h-[4vh] w-full items-center border-b-2 border-solid border-[#d8d8d8]">
        최고관리자 | 조회수 {viewCount} | {formattedDate}
      </section>
      <section className="w-full py-5">{contents}</section>
    </div>
  );
};

export default NoticeView;
