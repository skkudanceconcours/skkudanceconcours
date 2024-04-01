import Image from "next/image";
import posterImage from '@/public/images/poster.svg';

export default function Home() {
  return (
    <main className="w-screen flex min-h-screen pt-10">
      <Image className='w-1/2 fill' alt="poster" width={0} height={0} src={posterImage}/>
      <div className="w-1/2 p-12 pt-32 leading-[1.3] text-[6rem]">
        <h1>제 34회 성균관대학교 전국 고·중·초등학생 무용경연대회</h1>
      </div>
    </main>
  );
}
