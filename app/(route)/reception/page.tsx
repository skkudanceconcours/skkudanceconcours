import ReceptionForm from "@/app/components/ReceptionForm";
import { ReactNode } from "react";

const ReceptionPage = (): ReactNode => {
  return (
    <main className="relative flex min-h-screen w-screen flex-col px-8 lg:px-40 ">
      <h1 className="relative lg:my-12 flex h-[15vh] w-4/5 flex-col justify-center text-2xl lg:text-5xl font-semibold underline underline-offset-[15px]">
      REGISTRATION
      </h1>
      <ReceptionForm />
    </main>
  );
};

export default ReceptionPage;
