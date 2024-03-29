'use client'
import { ReactNode } from "react";
import { raleway } from "@/public/fonts/font";

type ButtonProps = {
    className?:string;
    children:ReactNode;
    onClick:()=>void;
}
const Button = ({className,children,onClick}:ButtonProps):ReactNode => {

    return <button className={`${className} ${raleway.className} w-fit min-w-20 min-h-10 px-4 border-[1px] border-[#A0128E] rounded-full text-[#646464] cursor-pointer hover:bg-[#A0128E] hover:text-white`}
        onClick={onClick}>
        {children}
    </button>   
}

export default Button;