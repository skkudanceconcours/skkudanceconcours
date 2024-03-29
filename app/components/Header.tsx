import { ReactNode } from "react";
import Navbar from "./Navbar";
import { roboto } from "@/public/fonts/font";

const Header = ():ReactNode => {
    
    return <div className="w-screen h-32">
        <Navbar className="float-end mr-16"/>
    </div>
}

export default Header;