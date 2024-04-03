'use client'
import submitLottie from '@/public/lottie/submitLottie.json';
import Lottie from "lottie-react";
import { ReactNode, useEffect, useState } from 'react';

const SubmitLottie = ():ReactNode => {
    const [clientSide,setClientSide] = useState<boolean>(false);  
    return (
        clientSide ?
        <Lottie animationData={submitLottie}/>
        : <></>
      );
}
export default SubmitLottie;