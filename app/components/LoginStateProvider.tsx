'use client';
import useLoginStore from "@/lib/zustand/store";
import { ReactNode, useEffect } from "react";

const LoginStateProvider = ({children}:{children:ReactNode}):ReactNode => {
    const { login } = useLoginStore();
    useEffect(() => {
      const key = sessionStorage.getItem('loginState');
      if (key === process.env.NEXT_PUBLIC_ADMIN_PW){
        login();
      }
    },[]);
    return children;
}

export default LoginStateProvider;