import ExcelButton from "@/app/components/ExcelButton";
import NextTable from "@/app/components/nextUI/Table";
import { getAllReception } from "@/lib/firebase/firebaseCRUD";
import { ReactNode } from "react";

const ReceptionAdmin = async (): Promise<ReactNode> => {
  const receptionData = await getReceptionData();

  return (
    <main className="relative h-screen w-screen flex flex-col items-center pt-24 mb-72">
        <h1 className="relative flex h-[15vh] mt-20 w-4/5 flex-col justify-center text-5xl font-semibold">
          콩쿨 접수 현황
        </h1>
      
        <NextTable receptions={receptionData} />
      <div className="w-full p-4 px-8 flex justify-between relative z-10">
        <div className="">총 {receptionData.length}개의 접수</div>
        <ExcelButton receptions={receptionData}/>
      </div>
    </main>
  );
};

export const getReceptionData = async () => {
  const receptions = await getAllReception();
  receptions.sort((item1,item2) => item2.timestamp.getTime() - item1.timestamp.getTime());
  return receptions;
};

export default ReceptionAdmin;
