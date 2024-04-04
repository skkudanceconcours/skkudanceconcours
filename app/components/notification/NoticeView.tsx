import React, { ReactNode } from "react";
// Types
import { Timestamp } from "firebase/firestore";

const NoticeView = ({ data }: NoticeViewType): ReactNode => {
  return (
    <div className="relative flex h-[20vh] w-4/5  flex-col justify-center">
      <section>{data.title}</section>
      <section>최고관리자</section>
      <section>{data.contents}</section>
    </div>
  );
};

export default NoticeView;
