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

    const className_li = 'h-24 p-2 flex items-center hover:text-[#20CE88] text-center text-xl cursor-pointer transition-colors duration-[400ms]'


    //#20CE88
    return <div className={`${className}`}>
        <ul className="flex gap-6 ">
            <li className={`${home && 'text-[#20CE88]'} ${className_li}`}
                onClick={()=>router.push('/')}>홈</li>
            <li className={`${about && 'text-[#20CE88]'} ${className_li}`}
                onClick={()=>router.push('/about')}>요강</li>
            <li className={`${reception && 'text-[#20CE88]'} ${className_li}`}
                onClick={()=>router.push('/reception')}>접수</li>
            <li className={`${notification && 'text-[#20CE88]'} ${className_li}`}
                onClick={()=>router.push('/notification')}>공지사항</li>
        </ul>
    </div>
}

export default Navbar;