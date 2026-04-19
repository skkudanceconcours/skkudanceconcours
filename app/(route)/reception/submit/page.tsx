"use client";
import { Path } from "@/template/paths";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const SubmitPage = (): ReactNode => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("submitEmail");
    if (stored) {
      setEmail(stored);
      sessionStorage.removeItem("submitEmail");
    }
  }, []);

  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <h1 className="text-3xl font-bold pt-20 lg:pt-0">접수가 완료되었습니다.</h1>

      {email && (
        <p className="mt-10 text-sm lg:text-base text-center text-gray-600">
          <span className="font-semibold text-black">{email}</span>로 접수 확인 이메일을 발송했습니다.
        </p>
      )}

      <p className="py-20 pt-12 text-sm lg:text-xl text-center leading-8">
        참가비 입금 관련하여{" "}
        <span
          className="text-blue-500 cursor-pointer underline underline-offset-4"
          onClick={() => router.push("/notification" as Path)}
        >
          공지사항
        </span>
        을 꼭 확인해주시기 바랍니다.
        <br /> 별도 문의사항은{" "}
        <a
          href="mailto:dance0604@skku.edu"
          className="text-blue-500 underline underline-offset-4"
        >
          dance0604@skku.edu
        </a>
        로 보내주시길 바랍니다.
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
