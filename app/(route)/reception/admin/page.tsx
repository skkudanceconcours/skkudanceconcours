"use client";
import ExcelButton from "@/app/components/ExcelButton";
import NextTable2024 from "@/app/components/UI/nextUI/table/2024Table";
import { baseUrl } from "@/lib/functions/dynamicURL";
import { Reception2024, Reception2025 } from "@/template/reception";
import { ReactNode, useCallback, useEffect, useState } from "react";
import NextSelection from "@/app/components/UI/nextUI/Selection";
import NextTable2025 from "@/app/components/UI/nextUI/table/2025Table";
import Spinner from "@/app/components/UI/Spinner";
export const dynamic = "force-dynamic";

const ReceptionAdmin = (): ReactNode => {
  // const receptionData = await fetchReceptionData();
  const [selectedYear, setSelectedYear] = useState<YearOption>("2025");
  const yearOption: YearOption[] = ["2024", "2025"];
  const [receptionData2024, set2024Data] = useState<Reception2024[] | null>(null);
  const [receptionData2025, set2025Data] = useState<Reception2025[] | null>(null);

  const fetch2024Data = useCallback(async () => {
    const data2024 = await fetchReceptionData("2024");
    set2024Data(data2024 as Reception2024[]);
  }, []);

  const fetch2025Data = useCallback(async () => {
    const data2025 = await fetchReceptionData("2025");
    set2025Data(data2025 as Reception2025[]);
  }, []);

  useEffect(() => {
    if (selectedYear == "2024" && receptionData2024 == null) fetch2024Data();
    else if (selectedYear == "2025" && receptionData2025 == null) fetch2025Data();
  }, [selectedYear]);

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
          options={yearOption}
          error={false}
        />
      </div>
      {(selectedYear == "2024" && receptionData2024 == null) ||
      (selectedYear == "2025" && receptionData2025 == null) ? (
        <Spinner />
      ) : selectedYear === "2024" ? (
        <NextTable2024 receptions={receptionData2024!} />
      ) : (
        <NextTable2025 receptions={receptionData2025!} />
      )}

      <div className="relative z-10 flex w-full justify-between p-4 px-8">
        <div className="">총 {((selectedYear === "2024" ? receptionData2024 : receptionData2025) ?? []).length}개의 접수</div>
        <ExcelButton
          year={selectedYear}
          receptions={selectedYear === "2024" ? receptionData2024! : receptionData2025!}
        />
      </div>
    </main>
  );
};

const fetchReceptionData = async (year: YearOption): Promise<Reception2025[] | Reception2024[]> => {
  try {
    console.log("requesting reception: ", `${baseUrl}/api/getReception?year=${year}`);
    const res = await fetch(`${baseUrl}/api/getReception?year=${year}`, {
      next: { revalidate: 10, tags: ["reception"] },
    });

    const { data } = (await res.json()) as { data: Reception2025[] };
    // console.log("datas:",data);
    data.sort((item1, item2) => new Date(item2.timestamp).getTime() - new Date(item1.timestamp).getTime());
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default ReceptionAdmin;
