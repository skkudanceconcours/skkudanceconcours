import React, { ReactNode } from "react";
// editor
import { QuillEditor } from "@/app/components/notification/manage/QuillEditor";
// components

const Page = async (): Promise<ReactNode> => {
  return (
    <main className="relative flex h-screen min-h-screen w-full flex-col items-center justify-start">
      <QuillEditor />
    </main>
  );
};

export default Page;
