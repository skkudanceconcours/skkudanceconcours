import Image from "next/image";
import posterImage from '@/public/images/poster.svg';
import { HSBombaram } from "@/public/fonts/font";
import MainPageAction from "./components/MainPageAction";

export default function Home() {

  return (
    <main className="w-screen h-min pb-28 lg:pb-0 relative flex flex-col lg:flex-row lg:min-h-screen">
      <Image className='w-full p-2 lg:p-0 lg:w-2/5 fill' alt="poster" width={0} height={0} src={posterImage}/>
      <div className="absolute -bottom-0 w-full lg:static lg:h-fit lg:w-3/5 lg:p-8 lg:pt-32 ">
        <h1 className={`${HSBombaram.className} pr-12 pl-4 lg:pl-0 lg:pr-0 text-white lg:text-gray-700 leading-[1.3] text-3xl lg:text-[5rem]`}>제 34회 성균관대학교<br/> 전국 고·중·초등학생<br/> 무용경연대회</h1>
        <MainPageAction/>
      </div>
    </main>
  );
}
