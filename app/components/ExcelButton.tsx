"use client";
import { downloadExcel } from "@/lib/functions/excel";
import { Reception2024, Reception2025 } from "@/template/reception";
import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

type ExcelButtonProps = {
  year: YearOption;
  receptions: Reception2024[] | Reception2025[];
};

const ExcelButton = ({ year, receptions }: ExcelButtonProps): ReactNode => {
  const onDownload = () => {
    downloadExcel(year, receptions);
  };

  return (
    <Button className="" onClick={onDownload} color="primary">
      엑셀 다운로드
    </Button>
  );
};

export default ExcelButton;
