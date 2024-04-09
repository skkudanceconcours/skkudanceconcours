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
import { baseUrl } from "@/lib/functions/dynamicURL";

const fetchData = async (): Promise<{
  data: NoticeType[];
  totalPages: number;
}> => {
  try {
    console.log("fetchData");
    console.log(`${baseUrl}/api/getNotice`);

    const res = await fetch(`${baseUrl}/api/getNotice`, {
      next: { revalidate: 60 }, //revalidate every 60 seconds
    });

    const { data, totalPages } = await res.json();

    return { data: data, totalPages: totalPages };
  } catch (error) {
    console.log(error);
  }
  return { data: [], totalPages: 0 };
};

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
        <NoticeHeader />
      </div>
      <div className="h-[15vh] w-full" />
      <NoticeBody data={data} totalPages={totalPages} />
    </main>
  );
};

export default NotificationPage;
