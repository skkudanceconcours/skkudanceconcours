"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// firebase
import { downloadPDf } from "@/lib/firebase/downloadFile";
// context
import useLoginStore from "@/lib/zustand/loginStore";
import { updatePDF, uploadStorageFile } from "@/lib/firebase/firebaseCRUD";
// icons * image
import Button from "@mui/material/Button";
import { ImCloudUpload } from "react-icons/im";
import { styled } from "@mui/material/styles";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFView = ({ url }: { url: string }): ReactNode => {
  const [numPages, setNumPages] = useState<number>(0); // 총 페이지수
  //   const [pageNumber, setPageNumber] = useState<number>(1); // 현재 페이지
  const [pageScale, setPageScale] = useState<number>(1); // 페이지 스케일
  const [pdfSize, setpdfSize] = useState<number>(0); // 페이지 크기

  const { loginState } = useLoginStore();

  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files;

    if (!uploadedFile) return;
    const filesArray: File[] = Array.from(uploadedFile);
    // firebase 올리기
    try {
      const res = await updatePDF(filesArray[0]);
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
    width: 1,
  });
  // pages
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (window !== undefined) {
      if (window.innerHeight < 768) {
        setpdfSize((window.innerWidth * 90) / 100);
      } else {
        setpdfSize((window.innerWidth * 60) / 100);
      }
    }
  }, []);
  return (
    <>
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
      <button
        className="h-[2.5rem] w-60 border-[0.8px] border-solid border-gray-700 hover:bg-gray-100"
        onClick={() => downloadPDf("요강/24_요강.pdf", "24년도_콩쿨요강.pdf")}
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
