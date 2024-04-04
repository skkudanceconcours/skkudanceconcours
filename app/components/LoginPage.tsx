'use client';
import Portal from "@/app/components/ModalPortal";
import { ReactNode, useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import TextInput from "./nextUI/TextInput";
import { nanumgothic } from "@/public/fonts/font";
import { Button } from "@nextui-org/react";
import useLoginStore from "@/lib/zustand/store";


const Login = ():ReactNode => {
    const [openLogin, setOpenLogin] = useState<boolean>(false);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { loginState, login, logout } = useLoginStore();
    const loggedIn = loginState === 'admin';
    const [error,setError] = useState<boolean>(false);
    
    const onLogin = () => {
        if(!passwordRef.current) return;
        const input = passwordRef.current.value;
        if(input === process.env.NEXT_PUBLIC_ADMIN_PW) {
            //TODO
            login();
            setOpenLogin(false);
        };
        setError(true);
    }

    return (<>{openLogin && <Portal>
      <main className="absolute left-0 top-0 w-full h-full bg-[rgba(255,255,255,0.8)] z-20">
        <RxCross1 className="fixed w-10 h-10 top-8 right-8 cursor-pointer z-30"
          onClick={()=>setOpenLogin(false)}/>
          <div className="fixed flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <label className={`${nanumgothic.className} w-full text-center font-bold text-2xl`}>관리자 비밀번호</label>
            <TextInput 
              password 
              autoFocus={true} 
              ref={passwordRef} 
              error={error}
              onChange={()=>setError(false)}/>
            <Button 
              className="w-40 self-center" 
              onClick={onLogin}
              color={!error ? 'primary' : 'danger'}>
                관리자 로그인
            </Button>
          </div>
      </main>
    </Portal>}
    <p className="cursor-pointer"
          onClick={()=>setOpenLogin(true)}>{loggedIn ? '로그아웃' : '로그인'}</p>
    </>)
}

export default Login;