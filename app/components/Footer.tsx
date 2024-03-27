import { quicksand, raleway } from "@/public/fonts/font";
import { ReactNode } from "react";

const Footer = ():ReactNode => {


    return <div className="w-screen h-40 flex flex-col items-center">
        <p className="text-2xl m-4">성균관대학교 무용학과</p>
        <a>성균관대학교 무용학과</a>
        <a className={`${quicksand.className} underline`} href="https://skkudance.kr" target="_blank">(skkudance.kr)</a>
    </div>
}

export default Footer;