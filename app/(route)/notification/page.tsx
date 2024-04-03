"use client";
// import { QuillEditor } from "@/app/components/QuillEditor";
// react & next
import Image from "next/image";
import { ReactNode, useEffect } from "react";
// components
import NoticeHeader from "@/app/components/notification/NoticeHeader";
import NoticeBody from "@/app/components/notification/NoticeBody";
// img & icons
import headerBackground from "@/public/images/sub_header_bg_ballet.jpg";

// firebase
import { Timestamp } from "firebase/firestore";
import { setNotices } from "@/lib/firebase/firebaseCRUD";
const NotificationPage = (): ReactNode => {
  // useEffect(() => {
  //   const arr = [
  //     5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  //   ];
  //   arr.forEach((elmt) =>
  //     setNotices({
  //       contents: `내용${elmt}`,
  //       timestamp: Timestamp.now(),
  //       title: `공지${elmt}`,
  //       viewCount: 1000 + elmt,
  //       important: false,
  //     }),
  //   );
  // }, []);
  return (
    <main className="relative flex  min-h-screen w-full flex-col items-center justify-start">
      <div className="relative flex h-3/5 min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl">
        <Image src={headerBackground} alt="header" fill />
      </div>
      <NoticeHeader />
      <NoticeBody />
    </main>
  );
};

export default NotificationPage;
