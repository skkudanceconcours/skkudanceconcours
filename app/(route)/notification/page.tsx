// react & next
import Image from "next/image";
import { ReactNode } from "react";
// components
import NoticeHeader from "@/app/components/notification/NoticeHeader";
import NoticeBody from "@/app/components/notification/NoticeBody";
// Types
import { NoticeType } from "@/template/notice";
// img & icons
import headerBackground from "@/public/images/sub_header_bg_ballet.jpg";
// firebase
import { getAllNotices } from "@/lib/firebase/firebaseCRUD";

const DATA_PER_PAGE = 10;

const NotificationPage = async (): Promise<ReactNode> => {
  const { data, totalPages } = await fetchData();

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start">
      <div className="relative flex h-[50vh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl">
        <Image src={headerBackground} alt="header" layout="fill" />
      </div>
      <NoticeHeader />
      <NoticeBody
        data={data}
        totalPages={totalPages}
        DATA_PER_PAGE={DATA_PER_PAGE}
      />
    </main>
  );
};

const fetchData = async (): Promise<{
  data: NoticeType[];
  totalPages: number;
}> => {
  try {
    console.log("fetchData");
    const data = await getAllNotices();
    if (data) {
      return { data: data, totalPages: Math.ceil(data.length / DATA_PER_PAGE) };
    }
  } catch (error) {
    console.log(`error fetching data: ${error}`);
  }
  return { data: [], totalPages: 0 };
};

export default NotificationPage;
