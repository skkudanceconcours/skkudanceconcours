"use client";
import ExcelButton from "@/app/components/ExcelButton";
import NextTable2024 from "@/app/components/UI/nextUI/table/2024Table";
import { baseUrl } from "@/lib/functions/dynamicURL";
import { Reception } from "@/template/reception";
import { ReactNode, useState } from "react";
import NextSelection from "@/app/components/UI/nextUI/Selection";

const ReceptionAdmin = (): ReactNode => {
  // const receptionData = await fetchReceptionData();
  const [selectedYear, setSelectedYear] = useState<YearOption>("2025");
  const yearOption: YearOption[] = ["2024", "2025"];



  return (
    <main className="relative flex h-screen w-screen flex-col items-center">
      <h1 className="relative flex h-[15vh] w-4/5 flex-col justify-center text-2xl font-semibold lg:my-12 lg:text-5xl">
        콩쿨 접수 현황
      </h1>
      <div className="flex w-screen justify-end px-2 lg:px-[40px]">
        <NextSelection
          value={selectedYear}
          onChange={(value: string) => setSelectedYear(value as YearOption)}
          label="년도"
          placeholder="2025"
          options={yearOption}
          error={false}
        />
      </div>
      <NextTable2024 receptions={[]} />
      <div className="relative z-10 flex w-full justify-between p-4 px-8">
        <div className="">총 {[].length}개의 접수</div>
        <ExcelButton receptions={[]} />
      </div>
    </main>
  );
};

const fetchReceptionData = async (): Promise<Reception[]> => {
  try {
    const res = await fetch(`${baseUrl}/api/getReception`, {
      next: { revalidate: 10, tags: ["reception"] },
    });

    const { data } = (await res.json()) as { data: Reception[] };
    // console.log("datas:",data);
    data.sort((item1, item2) => new Date(item2.timestamp).getTime() - new Date(item1.timestamp).getTime());
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default ReceptionAdmin;
