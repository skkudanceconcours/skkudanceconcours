"use client";
// import { tableSortLabelClasses } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

const NoticeHeader = (): ReactNode => {
  return (
    <div className="relative flex h-[20vh] w-4/5  flex-col justify-center">
      <p className="flex h-3/5 w-full items-center justify-start text-5xl font-semibold">
        공지사항
      </p>
    </div>
  );
};

export default NoticeHeader;
