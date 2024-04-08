import React, { ReactNode } from "react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.core.css";
// Types
import { NoticeViewType } from "@/template/notice";

const NoticeView = ({
  timeStamp,
  contents,
  title,
  viewCount,
}: NoticeViewType): ReactNode => {
  timeStamp = new Date(timeStamp);
  const formattedDate: string = timeStamp
    ? `${timeStamp.getFullYear().toString().slice(-2)}-${(timeStamp.getMonth() + 1).toString().padStart(2, "0")}-${timeStamp.getDate().toString().padStart(2, "0")} ${timeStamp.getHours().toString().padStart(2, "0")}:${timeStamp.getMinutes().toString().padStart(2, "0")}`
    : "";

  console.log(formattedDate); // 출력: "24-04-02 18:37"
  return (
    <div className="relative flex w-4/5 flex-col justify-start">
      <section className="flex h-[8vh] w-full items-center justify-start text-3xl font-semibold">
        {title}
      </section>
      <section className="flex h-[4vh] w-full items-center border-b-2 border-solid border-[#d8d8d8]">
        최고관리자 | 조회수 {viewCount} | {formattedDate}
      </section>
      <div
        className="view ql-editor h-[10vh] w-full p-0 scrollbar-hide" // react-quill css
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(contents),
        }}
      />
      {/* <section className="w-full py-5">{contents}</section> */}
    </div>
  );
};

export default NoticeView;
