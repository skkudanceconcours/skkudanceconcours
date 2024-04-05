import ReceptionForm from "@/app/components/ReceptionForm";
import { ReactNode } from "react";

const ReceptionPage = (): ReactNode => {
  return (
    <main className="relative flex min-h-screen w-screen flex-col p-20 px-40 ">
      <h1 className="relative my-12 flex h-[15vh] w-4/5 flex-col justify-center text-5xl font-semibold">
        경연대회 접수양식
      </h1>
      <ReceptionForm />
    </main>
  );
};

export default ReceptionPage;
