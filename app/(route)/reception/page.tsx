'use client';
import PrivacyPolicy from "@/app/components/PrivacyPolicy";
import ReceptionForm from "@/app/components/ReceptionForm";
import { ReactNode, useState } from "react"

const ReceptionPage = ():ReactNode =>{
    const [privacyConfirm,setPrivacyConfirm] = useState<boolean>(false);

    return <main className="w-screen min-h-screen flex flex-col p-20 px-40">
        <h1 className="text-3xl">경연대회 접수양식</h1>
        <ReceptionForm privacyConfirm={privacyConfirm}/>
        <PrivacyPolicy setPrivacyConfirm={setPrivacyConfirm}/>
    </main>
}

export default ReceptionPage;