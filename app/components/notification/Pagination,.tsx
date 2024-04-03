"use client";
import { useState, useEffect } from "react";

interface PaginationProps {
  totalItems: number; // 총 게시글수
  itemCountPerPage: number; // 페이지당 게시글수
  pageCount: number; // 현재 페이지 넘버 (page-?)
  currentPage: number; // 현재 페이지
}

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState<number>(1);
  const noPrev: boolean = start === 1;
  const noNext: boolean = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div>
      {!noPrev && "이전"}
      <ul></ul>
      {!noNext && "다음"}
    </div>
  );
}
