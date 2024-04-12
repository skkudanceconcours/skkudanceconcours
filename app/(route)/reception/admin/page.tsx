import ExcelButton from "@/app/components/ExcelButton";
import NextTable from "@/app/components/nextUI/Table";
import { getAllReception } from "@/lib/firebase/firebaseCRUD";
import { baseUrl } from "@/lib/functions/dynamicURL";
import { Reception } from "@/template/reception";
import { ReactNode } from "react";

const ReceptionAdmin = async (): Promise<ReactNode> => {
  const receptionData  = await fetchData();
  console.log("receptionData:", receptionData);
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
const fetchData = async ():Promise<Reception[]> => {
  try{
    const res = await fetch(`${baseUrl}/api/getReception`,{
      next: { revalidate: 10, tags: ["reception"] },
    })
    
    const { data }  = await res.json() as {data : Reception[]};
    // console.log("datas:",data);
    data.sort(
      (item1, item2) => new Date(item2.timestamp).getTime() - new Date(item1.timestamp).getTime(),
    );
    return data;
  } catch(error) {
    console.log(error);
    return [];
  }
};

export default ReceptionAdmin;
