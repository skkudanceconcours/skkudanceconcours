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
import { getAllNotices } from "@/lib/firebase/firebaseCRUD";

const DATA_PER_PAGE = 10;

const NotificationPage = (): ReactNode => {
  // ------------------------------useState------------------------------
  const [totalData, setTotalData] = useState<NoticeType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<NoticeType[]>([]);
  // ------------------------------Constants------------------------------
  const page_number: number = parseInt(useSearchParams().get("page") as string);
  // ------------------------------Data Fetch------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetchData');
        const data = await getAllNotices();
        if (data) {
          setTotalData(data); // 전체 데이터
          setFilteredData(data);
          setTotalPages(Math.ceil(data.length / DATA_PER_PAGE)); // 전체 페이지 개수
        }
      } catch (error) {
        console.log(`error fetching data: ${error}`);
      }
    };
    if (page_number) {
      fetchData();
      console.log("Fetched Datas");
    }
  }, []);

  // ------------------------------Filter------------------------------
  const findMatches = (wordToMatch: string): NoticeType[] => {
    // Filter using all Data
    return totalData.filter((input) => {
      const regex = new RegExp(wordToMatch, "giu");
      return input.title.match(regex);
    });
  };
  const filterData = (searchInput: string) => {
    !searchInput
      ? setFilteredData(totalData) // 원상복구
      : setFilteredData(findMatches(searchInput)); // 검색
  };
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start">
      <div className="relative flex h-[50vh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl">
        <Image src={headerBackground} alt="header" layout="fill" />
      </div>
      <NoticeHeader />
      <NoticeBody
        filteredData={filteredData}
        totalPages={totalPages}
        page_number={page_number}
        DATA_PER_PAGE={DATA_PER_PAGE}
        filterData={filterData}
      />
    </main>
  );
};

export default NotificationPage;
