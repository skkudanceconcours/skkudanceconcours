import ReceptionForm from "@/app/components/ReceptionForm";
import { ReactNode, useState } from "react"

const ReceptionPage = ():ReactNode =>{

    return <main className="w-screen min-h-screen relative flex flex-col p-20 px-40 ">
        <h1 className="text-3xl">경연대회 접수양식</h1>
        <ReceptionForm/>
        
    </main>
}

export default ReceptionPage;