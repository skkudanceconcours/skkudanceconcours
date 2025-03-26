import { Reception2024, Reception2025 } from "@/template/reception";
import * as Excel from "exceljs/dist/exceljs.min.js";
import { saveAs } from "file-saver";

const headers2024 = [
  "번호",
  "접수시각",
  "개인/단체",
  "이름",
  "성별",
  "생년월일",
  "연락처",
  "이메일",
  "(대표자) 학년",
  "학교명",
  "학원명",
  "지도자 성명",
  "지도자 연락처",
  "전공",
  "학년",
  "부문",
  "작품 제목",
  "음악/포즈",
  "음악 다운로드",
  "참가자 명단",
];

const headerWidths2024 = [
  5, //index
  10, //timeStamp
  10, //individualOrGroup
  8, //name
  5, //gender
  20, //birth
  25, //contact
  25, //email
  20, //leaderGrade
  20, //school
  20, //academy
  15, //instructor name
  25, //instructor contact
  20, //major
  20, //grade
  20, //category
  25, //artTitle,
  10, //musicOrPose
  15, //musicURL,
  20, //participant list
];

const headers2025 = [
  "번호",
  "접수시각",
  "이름",
  "성별",
  "생년월일",
  "연락처",
  "이메일",
  "학교명",
  "학원명",
  "지도자 성명",
  "지도자 연락처",
  "전공",
  "학년",
  // "부문",
  "작품 제목",
  "음악/포즈",
  "음악 다운로드",
];

const headerWidths2025 = [
  5, //index
  10, //timeStamp
  8, //name
  5, //gender
  20, //birth
  25, //contact
  25, //email
  20, //school
  20, //academy
  15, //instructor name
  25, //instructor contact
  20, //major
  20, //grade
  // 20, //category
  25, //artTitle,
  10, //musicOrPose
  15, //musicURL,
];

const styleHeaderCell = (cell: any) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "ffebebeb" },
  };
  cell.border = {
    bottom: { style: "thin", color: { argb: "-100000f" } },
    right: { style: "thin", color: { argb: "-100000f" } },
  };
  cell.font = {
    name: "Arial",
    size: 12,
    bold: true,
    color: { argb: "ff252525" },
  };
  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
};

const styleDataCell = (cell: any) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "ffffffff" },
  };
  cell.border = {
    bottom: { style: "thin", color: { argb: "-100000f" } },
    right: { style: "thin", color: { argb: "-100000f" } },
  };
  cell.font = {
    name: "Arial",
    size: 10,
    color: { argb: "ff252525" },
  };
  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
};

export const downloadExcel = async (year: YearOption, data: Reception2024[] | Reception2025[]) => {
  try {
    // 여러 엑셀 시트를 포함하는 하나의 workbook(단위) 생성
    const wb = new Excel.Workbook();

    // 엑셀 sheet 생성
    const sheet = wb.addWorksheet("콩쿨 접수 명단");

    // 상단 헤더(TH) 추가
    const headerRow = sheet.addRow(year === "2024" ? headers2024 : headers2025);
    // 헤더의 높이값 지정
    headerRow.height = 30.75;
    // 각 헤더 cell에 스타일 지정
    headerRow.eachCell((cell: any, colNum: number) => {
      styleHeaderCell(cell);
      sheet.getColumn(colNum).width = year === "2024" ? headerWidths2024[colNum - 1] : headerWidths2025[colNum - 1];
    });
    if (year == "2024") {
      // 각 Data cell에 데이터 삽입 및 스타일 지정
      (data as Reception2024[]).forEach(
        (
          {
            timestamp,
            individualOrGroup,
            name,
            gender,
            birth,
            contact,
            email,
            school,
            leaderGrade,
            academy,
            instructorName,
            instructorContact,
            major,
            grade,
            category,
            artTitle,
            musicFileURL,
            musicOrPose,
            participants,
          }: Reception2024,
          idx: number,
        ) => {
          const rowDatas = [
            idx + 1,
            timestamp,
            individualOrGroup,
            name,
            gender,
            birth,
            contact,
            email,
            leaderGrade,
            school,
            academy,
            instructorName,
            instructorContact,
            major,
            grade,
            category,
            artTitle,
            musicOrPose,
            musicFileURL,
            participants?.length === 0 ? null : participants,
          ];
          const appendRow = sheet.addRow(rowDatas);
          appendRow.height = 30.75;
          appendRow.eachCell((cell: any, colNum: number) => {
            styleDataCell(cell);
            if (colNum === 1) {
              cell.font = {
                color: { argb: "ff1890ff" },
              };
            }
          });
        },
      );
    } else {
      (data as Reception2025[]).forEach(
        (
          {
            timestamp,
            name,
            gender,
            birth,
            contact,
            email,
            school,
            academy,
            instructorName,
            instructorContact,
            major,
            grade,
            // category,
            artTitle,
            musicFileURL,
            musicOrPose,
          }: Reception2025,
          idx: number,
        ) => {
          const rowDatas = [
            idx + 1,
            timestamp,
            name,
            gender,
            birth,
            contact,
            email,
            school,
            academy,
            instructorName,
            instructorContact,
            major,
            grade,
            // category,
            artTitle,
            musicOrPose,
            musicFileURL,
          ];
          const appendRow = sheet.addRow(rowDatas);
          appendRow.height = 30.75;
          appendRow.eachCell((cell: any, colNum: number) => {
            styleDataCell(cell);
            if (colNum === 1) {
              cell.font = {
                color: { argb: "ff1890ff" },
              };
            }
          });
        },
      );
    }

    // 파일 생성
    const fileData = await wb.xlsx.writeBuffer(); //writeBuffer는 프로미스를 반환하므로 async-await을 사용해야 한다.
    const blob = new Blob([fileData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `콩쿨 접수 명단`);
  } catch (error) {
    console.log(error);
  }
};
//출처: https://heeeming.tistory.com/entry/라이브러리-exceljs를-활용하여-JS데이터를-엑셀-파일로-추출해-보자 [박히밍 개발 블로그:티스토리]
