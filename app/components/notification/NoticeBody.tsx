import React, { ReactNode, useEffect, useState } from "react";
// Types
import { NoticeType } from "@/template/notice";
// firebase
import { ReadAllData } from "@/lib/firebase/firebaseCRUD";
import { DocumentData } from "firebase/firestore";

const Notice = ({
  contents,
  num,
  timestamp,
  title,
  viewCount,
  important,
}: NoticeType): ReactNode => {
  const month: String = String(timestamp.toDate().getMonth() + 1).padStart(
    2,
    "0",
  ); // 월을 가져와서 두 자리 수로 만듭니다.
  const day: String = String(timestamp.toDate().getDate()).padStart(2, "0"); // 일을 가져와서 두 자리 수로 만듭니다.
  const dateString: string = `${month}-${day}`;

  // dyanmic_styles
  const is_imp = important
    ? "flex w-full items-center bg-blue-400 font-bold"
    : "flex w-full items-center bg-red-400";
  return (
    <div className={is_imp}>
      <div className="flex h-5 w-[12%] items-center justify-center">
        {important ? "공지" : num}
      </div>
      <div className="flex h-5 w-[64%] items-center justify-center">
        {title}
      </div>
      <div className="flex h-5 w-[12%] items-center justify-center">
        {viewCount}
      </div>
      <div className="flex h-5 w-[12%] items-center justify-center">
        {dateString}
      </div>
    </div>
  );
};

function sortNotices(data: NoticeType[]): NoticeType[] {
  return data.sort((a, b) => {
    if (a.important && !b.important) {
      return -1;
    }
    if (!a.important && b.important) {
      return 1;
    }

    return b.timestamp.toMillis() - a.timestamp.toMillis();
  });
}

const NoticeBody = () => {
  // useState
  const [noticeData, setNoticeData] = useState<NoticeType[]>([]);
  let cnt = 0;
  const notices = noticeData.map((notice) => {
    !notice.important && cnt++;
    return (
      <Notice
        key={notice.id}
        num={cnt}
        contents={notice.contents}
        timestamp={notice.timestamp}
        title={notice.title}
        viewCount={notice.viewCount}
        important={notice.important}
      />
    );
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ReadAllData("notices");
        const sorted_data: NoticeType[] = sortNotices(data as NoticeType[]);
        setNoticeData(sorted_data);
      } catch (error) {
        console.log(`error fetching data: ${error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative w-4/5 rounded-md border-2 border-solid border-black">
      {notices}
    </div>
  );
};

export default NoticeBody;
