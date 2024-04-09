"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// Images * Icons
import Button from "@mui/material/Button";
// firebase
import { downloadPDf } from "@/lib/firebase/downloadFile";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFView = ({ url }: { url: string }): ReactNode => {
  const [numPages, setNumPages] = useState<number>(0); // 총 페이지수
  //   const [pageNumber, setPageNumber] = useState<number>(1); // 현재 페이지
  const [pageScale, setPageScale] = useState<number>(1); // 페이지 스케일
  const [pdfSize, setpdfSize] = useState<number>(0); // 페이지 크기

  // pages

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log(`numPages ${numPages}`);
    setNumPages(numPages);
  }

  //   // functions
  //   const handlePageNumber = (val: string) => {
  //     if (val === "back") {
  //       if (pageNumber != 1) {
  //         setPageNumber((prev) => --prev);
  //         window.scrollTo(0, 0);
  //       }

  //       return;
  //     } else if (val === "front") {
  //       if (pageNumber != numPages) {
  //         setPageNumber((prev) => ++prev);
  //         window.scrollTo(0, 0);
  //       }
  //     }
  //   };
  useEffect(() => {
    if (window !== undefined) {
      setpdfSize((window.innerWidth * 60) / 100);
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
        onClick={() => downloadPDf("요강/24_요강.pdf")}
      >
        요강 다운로드
      </button>
      {/* <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={pdfSize} scale={pageScale} pageNumber={pageNumber} />
      </Document> */}
      {/* <div className="flex w-4/5 flex-col items-center justify-start">
        <p className="font-semibold">
          Page {pageNumber} of {numPages}
        </p>
        <div className="m-6 flex w-full items-center justify-around">
          <Button
            variant="outlined"
            onClick={() => handlePageNumber("back")}
            style={{}}
            disabled={pageNumber === 1 ? true : false}
          >
            이전
          </Button>
          <Button
            variant="outlined"
            onClick={() => handlePageNumber("front")}
            disabled={pageNumber === numPages ? true : false}
          >
            다음
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default PDFView;
