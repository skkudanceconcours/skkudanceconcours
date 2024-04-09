"use client";
import useLoginStore from "@/lib/zustand/loginStore";
import { Path } from "@/template/paths";
import { redirect, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const LoginStateProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const path = usePathname() as Path;
  const { loginState, login } = useLoginStore();
  useEffect(() => {
    if (loginState === process.env.NEXT_PUBLIC_ADMIN_PW) {
      login();
    } else {
      if (path === "/receptionadmin") redirect("/");
    }
  }, [loginState]);
  return children;
};

export default LoginStateProvider;
