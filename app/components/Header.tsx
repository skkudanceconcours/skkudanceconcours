import { ReactNode } from "react";
import Navbar from "./Navbar";
import { roboto } from "@/public/fonts/font";

const Header = ():ReactNode => {
    
    return <div className="w-screen h-20 relative ">
        <Navbar className="h-full flex justify-center items-center"/>
    </div>
}

export default Header;