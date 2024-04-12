"use client";
import { Path } from "@/template/paths";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

const SubmitPage = (): ReactNode => {
  const router = useRouter();
  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <h1 className="text-3xl font-bold pt-20 lg:pt-0">접수가 완료되었습니다.</h1>

      <p className="py-20 pt-32 text-sm lg:text-xl text-center leading-8">
        참가비 입금 관련하여 공지사항을 꼭 확인해주시기 바랍니다.
        <br /> 별도 문의사항은 dance0604@skku.edu로 보내주시길 바랍니다.
      </p>

      <p
        className="flex cursor-pointer items-center py-20 text-[1.3rem] font-bold underline underline-offset-8"
        onClick={() => router.replace("/" as Path)}
      >
        홈으로 가기
        <FaArrowRight className="ml-2" />
      </p>
    </main>
  );
};

export default SubmitPage;
