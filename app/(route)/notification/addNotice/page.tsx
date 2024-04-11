import React, { ReactNode } from "react";
// editor
import { QuillEditor } from "@/app/components/notification/manage/QuillEditor";
// components

const Page = async (): Promise<ReactNode> => {
  // const editor =
  //   process.env.NODE_ENV === "development" ? (
  //     <QuillEditor />
  //   ) : (
  //     typeof window !== "undefined" && <QuillEditor />
  //   );
  return (
    <main className="relative flex h-screen min-h-screen w-full flex-col items-center justify-start">
      {/* {editor} */}
      <QuillEditor />
    </main>
  );
};

export default Page;
