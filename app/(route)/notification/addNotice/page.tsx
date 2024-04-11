import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
// editor
import { QuillEditor } from "@/app/components/notification/manage/QuillEditor";
// components
// const QuillEditor = dynamic(
//   () => import("../../../components/notification/manage/QuillEditor") as any,
//   { ssr: false },
// );
const Page = async (): Promise<ReactNode> => {
  const editor =
    process.env.NODE_ENV === "development" ? (
      <QuillEditor />
    ) : (
      typeof window !== "undefined" && <QuillEditor />
    );
  return (
    <main className="relative flex h-screen min-h-screen w-full flex-col items-center justify-start">
      {editor}
    </main>
  );
};

export default Page;
