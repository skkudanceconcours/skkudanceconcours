'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';
// img & icons
import headerBackground from '@/public/images/sub_header_bg_ballet.jpg';
import ScrollToTopFab from '@/app/components/UI/MUI/ScrollTob';
// components
import NoticeHeader from '@/app/components/notification/NoticeHeader';
import NoticeView from '@/app/components/notification/NoticeView';
// context
import useNoticeStore from '@/lib/zustand/noticeStore';
const DetailsPage = (): ReactNode => {
  const { contents, title, timeStamp, viewCount, files, id } = useNoticeStore();

  return (
    <main className='relative flex min-h-screen w-full flex-col items-center justify-start'>
      <div className='relative flex h-[50dvh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl'>
        <Image src={headerBackground} alt='header' layout='fill' />
        <NoticeHeader />
      </div>
      <div className='h-[15dvh] w-full' />
      <NoticeView contents={contents} timeStamp={timeStamp} title={title} viewCount={viewCount} files={files} id={id} />
      <ScrollToTopFab />
    </main>
  );
};

export default DetailsPage;
