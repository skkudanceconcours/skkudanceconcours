'use client';
import Portal from '@/app/components/ModalPortal';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import TextInput from './UI/nextUI/TextInput';
import { nanumgothic } from '@/public/fonts/font';
import { Button } from '@nextui-org/react';
import useLoginStore from '@/lib/zustand/loginStore';
import { redirect } from 'next/dist/server/api-utils';
import { Path } from '@/template/paths';
import { useRouter } from 'next/navigation';

const Login = ({ className }: { className?: string }): ReactNode => {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { loginState, login } = useLoginStore();
  const loggedIn = loginState === 'admin';
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const onLogin = () => {
    if (!passwordRef.current) return;
    const input = passwordRef.current.value;
    if (input === process.env.NEXT_PUBLIC_ADMIN_PW) {
      login();
      setOpenLogin(false);
      router.push('/reception/admin' as Path);
    }
    setError(true);
  };

  useEffect(() => {
    window?.addEventListener('keydown', e => {
      // console.log(e.code);
      if (e.code === 'Escape') {
        setOpenLogin(false);
      } else if (e.code === 'Enter') {
        onLogin();
      }
    });
  });

  return (
    <>
      {openLogin && (
        <Portal>
          <main className='absolute left-0 top-0 z-20 h-full w-full bg-[rgba(255,255,255,0.8)]'>
            <RxCross1
              className='fixed right-8 top-8 z-30 h-10 w-10 cursor-pointer'
              onClick={() => setOpenLogin(false)}
            />
            <div className='fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center'>
              <label className={`${nanumgothic.className} w-full text-center text-2xl font-bold`}>
                관리자 비밀번호
              </label>
              <TextInput password autoFocus={true} ref={passwordRef} error={error} onChange={() => setError(false)} />
              <Button className='w-40 self-center' onClick={onLogin} color={!error ? 'primary' : 'danger'}>
                관리자 로그인
              </Button>
            </div>
          </main>
        </Portal>
      )}
      <li
        className={className}
        onClick={() => {
          if (!loggedIn) setOpenLogin(true);
          else router.push('/reception/admin' as Path);
        }}
      >
        ADMIN
      </li>
    </>
  );
};

export default Login;
