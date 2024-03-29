"use client"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const Navbar = ({className}:{className?: string}):ReactNode => {
    const router = useRouter();
    const path:string = usePathname();

    const home:boolean = path === '/';
    const about:boolean = path === '/about';
    const reception:boolean = path === '/reception';
    const notification:boolean = path === '/notification';

    const className_li = 'relative w-1/3 h-24 p-3 flex justify-center items-end text-center text-xl cursor-pointer transition-colors duration-[400ms] after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-black after:w-0 hover:after:w-full after:origin-left after:duration-150 after:ease-in'
    const className_route_li = 'relative w-1/3  h-24 p-3 flex w-1/4 justify-center items-end text-center text-xl cursor-pointer transition-colors duration-[400ms] after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-black after:w-full'
    //#20CE88
    return <div className={`${className}`}>
        <ul className="w-1/3 flex gap-2 max-w-lg">
            <li className={`${home ? className_route_li : className_li} `}
                onClick={()=>router.push('/')}>홈</li>
            <li className={`${notification ? className_route_li : className_li}`}
                onClick={()=>router.push('/notification')}>게시판</li>
            <li className={`${about ? className_route_li : className_li}`}
                onClick={()=>router.push('/about')}>요강</li>
            {/* <li className={`${notification && 'text-[#20CE88]'} ${className_li}`}
                onClick={()=>router.push('/notification')}>공지사항</li> */}
            
        </ul>
    </div>
}

export default Navbar;