import submitLottie from '@/public/lottie/submitLottie.json';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const Lottie = dynamic(()=> import('lottie-react'));

const SubmitLottie = ():ReactNode => {
    return (
        <Lottie animationData={submitLottie}/>);
}
export default SubmitLottie;