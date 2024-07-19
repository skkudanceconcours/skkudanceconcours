// react & next
import Image from 'next/image';
import { ReactNode, Suspense } from 'react';
// components
import NoticeHeader from '@/app/components/notification/NoticeHeader';
import NoticeBody from '@/app/components/notification/NoticeBody';
// Types
import { NoticeType } from '@/template/notice';
// img & icons
import Spinner from '@/app/components/UI/Spinner';
import headerBackground from '@/public/images/sub_header_bg_ballet.jpg';
// firebase
import { baseUrl } from '@/lib/functions/dynamicURL';

const fetchData = async (): Promise<{
  data: NoticeType[];
  totalPages: number;
}> => {
  try {
    const res = await fetch(`${baseUrl}/api/getNotice`, {
      next: { revalidate: 10, tags: ['notice'] }, //revalidate every 60 seconds
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
    <main className='relative flex min-h-screen w-full flex-col items-center justify-start pb-20'>
      <div className='relative flex h-[50dvh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl'>
        <Image
          className='h-full w-full object-cover lg:object-fill'
          src={headerBackground}
          alt='header'
          layout='cover'
        />
        <NoticeHeader />
      </div>
      <div className='h-[15dvh] w-full' />
      <Suspense fallback={<Spinner />}>
        <NoticeBody data={data} totalPages={totalPages} />
      </Suspense>
    </main>
  );
};

export default NotificationPage;
