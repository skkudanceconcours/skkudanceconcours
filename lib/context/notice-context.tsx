"use client";
import React, { ReactNode, useState, createContext } from "react";

// Types
import { NoticeViewType } from "@/template/notice";

const initContext = {
  contents: "",
  timestamp: new Date(),
  title: "",
  viewCount: 0,
};

export const noticeContext = createContext<NoticeViewType>(initContext);

type Props = {
  children: ReactNode;
};

export const NoticeProvider = ({ children }: Props): ReactNode => {
  const [noticeState, setnoticeState] = useState<NoticeViewType | null>(
    initContext,
  );

  return (
    <noticeContext.Provider value={{ noticeState, setnoticeState }}>
      {children}
    </noticeContext.Provider>
  );
};
