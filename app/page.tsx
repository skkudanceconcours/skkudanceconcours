import Image from "next/image";
import posterImage from '@/public/images/poster.svg';
import { HSBombaram } from "@/public/fonts/font";
import MainPageAction from "./components/MainPageAction";

export default function Home() {

  return (
    <main className="w-screen flex min-h-screen pt-10">
      <Image className='w-2/5 fill' alt="poster" width={0} height={0} src={posterImage}/>
      <div className="w-3/5 p-12 pt-32 ">
        <h1 className={`${HSBombaram.className} text-gray-700 leading-[1.3] text-[5rem]`}>제 34회 성균관대학교 전국 고·중·초등학생 무용경연대회</h1>
        <MainPageAction/>
      </div>
    </main>
  );
}
