'use client'
import { ReactNode } from "react";
import { raleway } from "@/public/fonts/font";

type ButtonProps = {
    className?:string;
    children:ReactNode;
    onClick:()=>void;
}
const Button = ({className,children,onClick}:ButtonProps):ReactNode => {

    return <button className={`${className} ${raleway.className}  min-w-20 min-h-10 px-4 border-[1px] border-[#A0128E] rounded-full text-[#3d3d3d] cursor-pointer`}
        onClick={onClick}>
        {children}
    </button>   
}

export default Button;