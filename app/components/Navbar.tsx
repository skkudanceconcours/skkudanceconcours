"use client";
import useLoginStore from "@/lib/zustand/loginStore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import { Path } from "@/template/paths";
import Login from "./LoginPage";

const Navbar = ({ className }: { className?: string }): ReactNode => {
  const router = useRouter();
  const path: string = usePathname();
  const { loginState } = useLoginStore();
  const loggedIn = loginState === "admin";
  // const home: boolean = path === "/";
  const reception: boolean = path === "/reception";
  const notification: boolean =
    path === "/notification" || path === "/notification/details";
  const receptionAdmin: boolean = path === "/reception/admin";

  // const className_li =
  //   'relative flex-1 h- 20 lg:h-24 p-6 flex justify-center items-end text-center lg:text-xl cursor-pointer transition-colors duration-[400ms] after:content-[""] after:absolute after:left-0 after:bottom-3 after:h-[3px] after:bg-black after:w-full after:opacity-0 hover:after:opacity-100 after:origin-left after:duration-150 after:ease-in';
  // const className_route_li =
  //   'relative flex-1 w-max h- 20 lg:h-24 p-6 flex justify-center items-end text-center lg:text-xl cursor-pointer transition-colors duration-[400ms] after:content-[""] after:absolute after:left-0 after:bottom-3 after:h-[3px] after:bg-black after:w-full after:opacity-100';

  const className_li =
    "relative flex-1 h-12 w-full p-6 flex justify-center items-end text-center lg:text-xl cursor-pointer transition-colors duration-[400ms]";

  return (
    <div
      className={`${className} z-10 flex h-max w-max flex-col lg:static lg:h-full`}
    >
      <Image className="w-12 lg:w-20 cursor-pointer self-start ml-8 my-8 lg:my-0 lg:absolute lg:left-8 lg:top-8 lg:ml-0" src={logo} alt="logo" 
        onClick={() => router.push("/")}/>
        
      <ul className="flex w-max justify-center gap-2 lg:max-w-lg">
        
        <li className={className_li} onClick={() => router.push("/reception" as Path)}>
          REGISTRATION
        </li>
        <li
          className={className_li}
          onClick={() => router.push("/notification?page=1" as Path)}
        >
          NOTICE
        </li>
        
        <Login className={className_li}/>
        
      </ul>
    </div>
  );
};

export default Navbar;
