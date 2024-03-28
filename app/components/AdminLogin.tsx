'use client'
import { quicksand } from "@/public/fonts/font";
import { ReactNode, useState } from "react";

const AdminLogin = (): ReactNode => {
  const [isOpenLogin,setIsOpenLogin] = useState<boolean>(false);

  return (
    <div className="absolute right-0 bottom-0 flex h-8 items-center">
      <p className="cursor-pointer m-2"
        onClick={()=>setIsOpenLogin(prev => !prev)}>관리자 모드</p>
      <input className={`${quicksand.className} ${isOpenLogin ? 'w-20 border-b-2 border-black m-2' : 'w-0'} transition-all outline-none`} />
    </div>
  );
};

export default AdminLogin;
