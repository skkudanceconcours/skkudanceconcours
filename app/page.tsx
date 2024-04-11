import Image from "next/image";
import posterImage from "@/public/images/poster.svg";
import { HSBombaram } from "@/public/fonts/font";
import MainPageAction from "./components/MainPageAction";

export default function Home() {
  return (
    <main className="relative flex justify-center h-min w-screen pb-28 lg:min-h-screen lg:pb-0">
      <Image
        className="fill w-full p-2 lg:w-2/5 lg:p-0"
        alt="poster"
        width={0}
        height={0}
        src={posterImage}
      />
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
