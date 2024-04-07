import Image from "next/image";
import posterImage from "@/public/images/poster.svg";
import { HSBombaram } from "@/public/fonts/font";
import MainPageAction from "./components/MainPageAction";

export default function Home() {
  return (
    <main className="relative flex h-min w-screen flex-col pb-28 lg:min-h-screen lg:flex-row lg:pb-0">
      <Image
        className="fill w-full p-2 lg:w-2/5 lg:p-0"
        alt="poster"
        width={0}
        height={0}
        src={posterImage}
      />
      <div className="absolute -bottom-0 w-full lg:static lg:h-fit lg:w-3/5 lg:p-8 lg:pt-32 ">
        <h1 className={`${HSBombaram.className} pl-4 pr-12 text-3xl leading-[1.3] text-white lg:pl-0 lg:pr-0 lg:text-[5rem] lg:text-gray-700`}>
          제 34회 성균관대학교
          <br /> 전국 고·중·초등학생
          <br /> 무용경연대회
        </h1>
        <MainPageAction />
      </div>
    </main>
  );
}

export async function generateMetadata() {
  return {
    title: "성균관대학교 무용학과 콩쿨",
    openGraph: {
      images: posterImage
    },
  };
}
