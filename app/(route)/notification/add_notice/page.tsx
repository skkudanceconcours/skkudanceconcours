import React, { ReactNode } from "react";
// editor
import { QuillEditor } from "@/app/components/notification/manage/QuillEditor";
import NoticeHeader from "@/app/components/notification/NoticeHeader";
// components

const Page = (): ReactNode => {
  return (
    <main className="relative flex h-screen min-h-screen w-full flex-col items-center justify-start">
      <QuillEditor />
    </main>
  );
};

export default Page;
