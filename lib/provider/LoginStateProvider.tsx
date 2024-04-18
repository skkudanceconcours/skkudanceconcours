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
  const { loginState } = useLoginStore();
  useEffect(() => {
    if(loginState === "anonymous" && path === "/reception/admin") redirect("/" as Path);
  }, [loginState]);

  return children;
};

export default LoginStateProvider;
