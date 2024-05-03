"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// firebase
import { downloadPDf } from "@/lib/firebase/downloadFile";
// context
import useLoginStore from "@/lib/zustand/loginStore";
import {
  getPDF,
  getPDFPath,
  updatePDF,
  uploadStorageFile,
} from "@/lib/firebase/firebaseCRUD";
// icons * image
import Button from "@mui/material/Button";
import { ImCloudUpload } from "react-icons/im";
import { styled } from "@mui/material/styles";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFView = (): ReactNode => {
  const router = useRouter();
  const [url, setURL] = useState<string>(""); // 파일 경로
  const [numPages, setNumPages] = useState<number>(0); // 총 페이지수
  //   const [pageNumber, setPageNumber] = useState<number>(1); // 현재 페이지
  const [pageScale, setPageScale] = useState<number>(1); // 페이지 스케일
  const [pdfSize, setpdfSize] = useState<number>(0); // 페이지 크기

  const { loginState } = useLoginStore();

  const refresh = async (delay: number): Promise<undefined> => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files;

    if (!uploadedFile) return;
    const filesArray: File[] = Array.from(uploadedFile);
    // firebase 올리기
    try {
      const res = await updatePDF(filesArray[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // File Settings
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 2,
  });
  // pages
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  const fetchPDF = async (): Promise<string> => {
    try {
      const url = await getPDF();
      return url;
    } catch (error) {
      console.log("pdfview", error);
    }
    return "";
  };
  useEffect(() => {
    // if (window !== undefined) {
    if (window.innerHeight < 768) {
      setpdfSize((window.innerWidth * 90) / 100);
    } else {
      setpdfSize((window.innerWidth * 60) / 100);
    }
    // }

    const fetchAndSetURL = async () => {
      const url = await fetchPDF();
      setURL(url); // 프로미스 대신 실제 URL 값을 설정
    };

    fetchAndSetURL();
  }, []);
  const downloadHandler = async () => {
    const pdfPath = await getPDFPath();

    downloadPDf(pdfPath, "SKKU_콩쿨_요강.pdf");
  };
  return (
    <>
      {url != "" ? (
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              width={pdfSize}
              scale={pageScale}
              pageNumber={index + 1}
              loading={false}
            />
          ))}
        </Document>
      ) : null}

      <button
        className="h-[2.5rem] w-60 border-[0.8px] border-solid border-gray-700 hover:bg-gray-100"
        // onClick={() => downloadPDF("요강/24_요강.pdf", "24년도_콩쿨요강.pdf")}
        onClick={downloadHandler}
      >
        요강 다운로드
      </button>
      {loginState === "admin" ? (
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          sx={{
            marginTop: "2rem",
            width: "15rem",
          }}
          startIcon={<ImCloudUpload />}
        >
          요강 교체하기
          <VisuallyHiddenInput type="file" onChange={handleFiles} />
        </Button>
      ) : null}
    </>
  );
};

export default PDFView;
