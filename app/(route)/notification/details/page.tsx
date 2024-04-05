"use client";
import React, { ReactNode, useContext, useEffect } from "react";
import Image from "next/image";
// Types
import { NoticeViewType } from "@/template/notice";
import { Timestamp } from "firebase/firestore";
// img & icons
import headerBackground from "@/public/images/sub_header_bg_ballet.jpg";
import useNoticeStore from "@/lib/zustand/noticeStore";

// components
import NoticeHeader from "@/app/components/notification/NoticeHeader";
import NoticeView from "@/app/components/notification/NoticeView";
const DetailsPage = (): ReactNode => {
  const { contents, title, timeStamp, viewCount ,setNoticeState } = useNoticeStore();

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start">
      <div className="relative flex h-[50vh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl">
        <Image src={headerBackground} alt="header" layout="fill" />
      </div>
      <NoticeHeader />
      <NoticeView contents={contents} timeStamp={timeStamp} title={title} viewCount={viewCount}  />
    </main>
  );
};

export default DetailsPage;
