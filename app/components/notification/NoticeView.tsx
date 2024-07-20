"use client";
import React, { ReactNode } from "react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.core.css";
import { useRouter } from "next/navigation";
import { monstserrat } from "@/public/fonts/font";
// firebase
import { deleteNotice } from "@/lib/firebase/firebaseCRUD";
// Types
import { NoticeViewType } from "@/template/notice";
import { Path } from "@/template/paths";

// Icons
import FilePreview from "./FilePreview";
// context
import useLoginStore from "@/lib/zustand/loginStore";

const NoticeView = ({ contents, timeStamp, title, viewCount, files, id }: NoticeViewType): ReactNode => {
  timeStamp = new Date(timeStamp);
  const formattedDate: string = timeStamp
    ? `${timeStamp.getFullYear().toString().slice(-2)}-${(timeStamp.getMonth() + 1).toString().padStart(2, "0")}-${timeStamp.getDate().toString().padStart(2, "0")} ${timeStamp.getHours().toString().padStart(2, "0")}:${timeStamp.getMinutes().toString().padStart(2, "0")}`
    : "";
  // Context
  const { loginState } = useLoginStore();
  // useRouter
  const router = useRouter();
  // Functions
  const deleteHandler = async () => {
    await deleteNotice(id);
    router.push("/notification?page=1" as Path);
  };
  const modifyHandler = () => {
    router.push(`/notification/addNotice` as Path);
  };

  return (
    <div className={`${monstserrat.className} relative flex w-4/5 flex-col justify-start`}>
      <section className="flex h-fit w-full items-center justify-start whitespace-normal py-2 text-xl font-semibold lg:text-2xl 2xl:text-3xl">
        {title}
      </section>

      <section className="flex h-[4vh] w-full items-center border-b-2 border-solid border-[#d8d8d8] text-sm sm:text-base">
        무용학과 | 조회수 {viewCount} | {formattedDate}
        {loginState === "admin" ? (
          <div className="absolute right-0 flex justify-self-end">
            <p onClick={deleteHandler} className="mr-2 hover:cursor-pointer hover:font-semibold hover:text-red-400">
              삭제하기
            </p>
            <p onClick={modifyHandler} className="hover:cursor-pointer hover:font-semibold hover:text-green-400">
              수정하기
            </p>
          </div>
        ) : null}
      </section>

      <section className="w-full flex-col items-start justify-start border-b-2 border-solid border-[#d8d8d8]">
        {files ? <FilePreview files={files} /> : null}
      </section>

      <div
        className="view ql-editor h-[10vh] w-full p-40 scrollbar-hide" // react-quill css
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(contents),
        }}
      />
      {/* <section className="w-full py-5">{contents}</section> */}
    </div>
  );
};

export default NoticeView;
