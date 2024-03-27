import { ReactNode } from "react";
import Navbar from "./Navbar";
import { roboto } from "@/public/fonts/font";

const Header = ():ReactNode => {


    return <div className="w-screen h-32">
        <h1 className={`${roboto.className} text-2xl font-bold mt-12 ml-20`}>
            제 34회 성균관대학교 고/중/초 무용경연대회</h1>
        <Navbar className="float-end mr-16"/>
    </div>
}

export default Header;