"use client";
// react & next
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
// components
import NoticeHeader from "@/app/components/notification/NoticeHeader";
import NoticeBody from "@/app/components/notification/NoticeBody";
// Types
import { NoticeType } from "@/template/notice";
// img & icons
import headerBackground from "@/public/images/sub_header_bg_ballet.jpg";
// firebase
import { ReadAllData } from "@/lib/firebase/firebaseCRUD";

const DATA_PER_PAGE = 8;

const NotificationPage = (): ReactNode => {
  // useState
  const [totalData, setTotalData] = useState<NoticeType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  // Constants
  const page_number: number = parseInt(useSearchParams().get("page") as string);
  // Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ReadAllData("notices");
        if (data) {
          setTotalData(data); // 전체 데이터
          setTotalPages(Math.ceil(data.length / DATA_PER_PAGE)); // 전체 페이지 개수
        }
      } catch (error) {
        console.log(`error fetching data: ${error}`);
      }
    };
    if (page_number) {
      fetchData();
    }
  }, []);
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start">
      <div className="relative flex h-[70vh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl">
        <Image src={headerBackground} alt="header" layout="fill" />
      </div>
      <NoticeHeader />
      <NoticeBody
        totalData={totalData}
        totalPages={totalPages}
        page_number={page_number}
        DATA_PER_PAGE={DATA_PER_PAGE}
      />
    </main>
  );
};

export default NotificationPage;

// 데이터 만들기
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
