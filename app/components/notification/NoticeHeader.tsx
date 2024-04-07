import React, { ReactNode } from "react";

const NoticeHeader = (): ReactNode => {
  return (
    <h1 className="relative lg:my-12 flex h-[15vh] w-4/5 flex-col justify-center text-2xl lg:text-5xl font-semibold">
      공지사항
    </h1>
  );
};

export default NoticeHeader;
