import React, { ReactNode } from 'react';
import Image from 'next/image';
// img & icons
import headerBackground from '@/public/images/sub_header_bg_ballet.jpg';
import ScrollToTopFab from '@/app/components/UI/MUI/ScrollTob';
// components
import NoticeHeader from '@/app/components/notification/NoticeHeader';
import PDFView from '@/app/components/notification/guideline/PDFView';
const GuidelinePage = async (): Promise<ReactNode> => {
  return (
    <main className='relative flex min-h-screen w-full flex-col items-center justify-start'>
      <div className='relative flex h-[50vh] min-h-[40%] w-full items-center justify-center bg-yellow-300 text-5xl'>
        <Image
          className='h-full w-full object-cover lg:object-fill'
          src={headerBackground}
          alt='header'
          layout='cover'
        />
        <NoticeHeader />
      </div>
      <div className='h-[15vh] w-full' />
      <PDFView />
      <ScrollToTopFab />
    </main>
  );
};

export default GuidelinePage;
