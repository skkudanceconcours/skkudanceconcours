import ExcelButton from "@/app/components/ExcelButton";
import NextTable from "@/app/components/nextUI/Table";
import { getAllReception } from "@/lib/firebase/firebaseCRUD";
import { ReactNode } from "react";

const ReceptionAdmin = async (): Promise<ReactNode> => {
  const receptionData = await getReceptionData();

  return (<main className="relative flex h-screen w-screen flex-col items-center">
      <h1 className="relative lg:my-12 flex h-[15vh] w-4/5 flex-col justify-center text-2xl lg:text-5xl font-semibold">
        콩쿨 접수 현황
      </h1>

      <NextTable receptions={receptionData} />
      <div className="relative z-10 flex w-full justify-between p-4 px-8">
        <div className="">총 {receptionData.length}개의 접수</div>
        <ExcelButton receptions={receptionData} />
      </div>
    </main>);
};
const getReceptionData = async () => {
  const receptions = await getAllReception();
  receptions.sort(
    (item1, item2) => item2.timestamp.getTime() - item1.timestamp.getTime(),
  );
  return receptions;
};

export default ReceptionAdmin;
