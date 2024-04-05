'use client';
import NextTable from "@/app/components/nextUI/Table";
import useLoginStore from "@/lib/zustand/store";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ReceptionAdmin = ():ReactNode => {

    //useEffect
    useEffect(()=>{
      if(sessionStorage.getItem('loginState') !== process.env.NEXT_PUBLIC_ADMIN_PW){
        redirect('/');
      }
    },[]);

    return <main className="w-screen h-screen pt-24">
        <div className="w-full h-full p-4 relative">
            <p>콩쿨 접수 현황</p>
            <NextTable />
            
        </div>
    </main>
}

export default ReceptionAdmin;