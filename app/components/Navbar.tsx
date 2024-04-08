"use client";
import useLoginStore from "@/lib/zustand/loginStore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import logo from "@/public/images/무용학과로고_반전.png";
import Image from "next/image";
import { UniverseLTPro } from "@/public/fonts/font";

const Navbar = ({ className }: { className?: string }): ReactNode => {
  const router = useRouter();
  const path: string = usePathname();
  const { loginState } = useLoginStore();
  const loggedIn = loginState === 'admin';
  const home: boolean = path === "/";
  const reception: boolean = path === "/reception";
  const notification: boolean =
    path === "/notification" || path === "/notification/details";
  const receptionAdmin: boolean = path === "/receptionadmin";

  // const className_li =
  //   'relative flex-1 h- 20 lg:h-24 p-6 flex justify-center items-end text-center lg:text-xl cursor-pointer transition-colors duration-[400ms] after:content-[""] after:absolute after:left-0 after:bottom-3 after:h-[3px] after:bg-black after:w-full after:opacity-0 hover:after:opacity-100 after:origin-left after:duration-150 after:ease-in';
  // const className_route_li =
  //   'relative flex-1 w-max h- 20 lg:h-24 p-6 flex justify-center items-end text-center lg:text-xl cursor-pointer transition-colors duration-[400ms] after:content-[""] after:absolute after:left-0 after:bottom-3 after:h-[3px] after:bg-black after:w-full after:opacity-100';

  const className_li =
    'relative flex-1 h-12 w-full p-6 flex justify-center items-end text-center lg:text-xl cursor-pointer transition-colors duration-[400ms]';
  

  return (
    <div className={`${className} w-max z-10`}>
      <div className="absolute left-8 top-2 flex flex-col items-start p-4 cursor-pointer"
           onClick={() => router.push("/")}>
        <Image className="w-10" src={logo} alt="logo" />
        <p className={`${UniverseLTPro.className} pt-2 text-xl leading-[1.8rem] tracking-[0.2rem]`}>
          Skku<br/>
          Dance<br/>
          Concours
        </p>
      </div>
      <ul className="flex justify-center w-max lg:max-w-lg gap-2">
        <li className={className_li}
          onClick={() => router.push("/reception")} >
          REGISTRATION
        </li>
        <li className={className_li}
          onClick={() => router.push("/notification?page=1")} >
          NOTICE
        </li>
        {loggedIn && <li className={className_li}
                onClick={()=>router.push('/receptionadmin')}>ADMIN</li> }
      </ul>
    </div>
  );
};

export default Navbar;
