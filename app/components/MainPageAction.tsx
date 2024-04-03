'use client';
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import fileDownload from "js-file-download";

const MainPageAction = ():ReactNode => {

    const router = useRouter()
    return <div className="flex p-12 justify-center gap-10">
    <button className="w-60 h-[2.5rem] border-[0.8px] border-gray-700 border-solid hover:bg-gray-100"
      onClick={() => {}}>요강 다운로드</button>
    <button className="w-60 h-[2.5rem] border-[0.8px] border-gray-700 border-solid hover:bg-gray-100 "
      onClick={()=> router.push('/reception')}>접수하기</button>
  </div>
}

export default MainPageAction;