"use client";
import { Path } from "@/template/paths";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

const SubmitPage = (): ReactNode => {
const router = useRouter();
  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <h1 className="text-3xl font-bold">접수가 완료되었습니다.</h1>

      <p
        className="flex items-center py-20 text-[1.3rem] font-bold underline underline-offset-8 cursor-pointer"
        onClick={() => router.replace("/" as Path)}
      >
        홈으로 가기
        <FaArrowRight className="ml-2" />
      </p>
    </main>
  );
};

export default SubmitPage;
