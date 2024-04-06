"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import fileDownload from "js-file-download";

const MainPageAction = (): ReactNode => {
  const router = useRouter();
  return (
    <div className="flex w-full justify-center gap-10 p-12">
      <button
        className="h-[2.5rem] w-60 border-[0.8px] border-solid border-gray-700 hover:bg-gray-100"
        onClick={() => {}}>
        요강 다운로드
      </button>
      <button
        className="h-[2.5rem] w-60 border-[0.8px] border-solid border-gray-700 hover:bg-gray-100 "
        onClick={() => router.push("/reception")}>
        접수하기
      </button>
    </div>
  );
};

export default MainPageAction;
