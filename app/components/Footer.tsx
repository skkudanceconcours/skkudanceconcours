import { nanumgothic, quicksand, raleway } from "@/public/fonts/font";
import { ReactNode } from "react";
import Login from "./LoginPage";

const Footer = ():ReactNode => {

    return <div className={`${nanumgothic.className} w-screen my-8 flex flex-col items-center relative leading-6 text-gray-600 text-[0.8rem]`}>
        <p>COPYRIGHT ⓒ School of Art,</p>
        <p>Sungkyunkwan University(SKKU) All Rights Reserved</p>
        <p>(03063) 서울특별시 종로구 성균관로 25-2</p>
        <p>성균관대학교 인문사회과학캠퍼스</p>
        <p>수선관 별관 6층 62601호</p>
        <br/><br/>
        <p>Production. 성균관대학교 예술대학 무용학과 공연문의. 02-760-0604</p>
        <p>성균관대학교 예술대학 무용학과 (skkudance.kr)</p>
        <p>Design by. SKKUDANCE</p>
        <Login/>
    </div>
}

export default Footer;