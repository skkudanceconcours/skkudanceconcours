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
import { DATA_PER_PAGE } from "@/app/api/route";

const NotificationPage = async (): Promise<ReactNode> => {
  const { data, totalPages } = await fetchData();

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start">
      <div className="relative flex h-[50vh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl">
        <Image
          className="h-full w-full object-cover lg:object-fill"
          src={headerBackground}
          alt="header"
          layout="cover"
        />
      </div>
      <NoticeHeader />
      <NoticeBody data={data} totalPages={totalPages} />
    </main>
  );
};

const fetchData = async (): Promise<{
  data: NoticeType[];
  totalPages: number;
}> => {
  try {
    const res = await fetch("http://localhost:3000/api");
    const data = await res.json();
    console.log(res);
    // return res;
  } catch (error) {
    console.log(error);
  }
  return { data: [], totalPages: 0 };
};

export default NotificationPage;
