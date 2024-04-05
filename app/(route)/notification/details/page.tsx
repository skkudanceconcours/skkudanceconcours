"use client";
import React, { ReactNode, useContext, useEffect } from "react";
import Image from "next/image";
// Types
import { NoticeViewType } from "@/template/notice";
import { Timestamp } from "firebase/firestore";
// img & icons
import headerBackground from "@/public/images/sub_header_bg_ballet.jpg";
// context
import { noticeContext } from "@/lib/context/notice-context";
// components
import NoticeHeader from "@/app/components/notification/NoticeHeader";
import NoticeView from "@/app/components/notification/NoticeView";
const page = (): ReactNode => {
  const { noticeState, setnoticeState } = useContext(noticeContext);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start">
      <div className="relative flex h-[50vh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl">
        <Image src={headerBackground} alt="header" layout="fill" />
      </div>
      <NoticeHeader />
      <NoticeView data={noticeState} />
    </main>
  );
};

export default page;
