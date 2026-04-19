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
  const { loginState, _hasHydrated } = useLoginStore();
  useEffect(() => {
    if (_hasHydrated && loginState === "anonymous" && path === "/reception/admin") redirect("/" as Path);
  }, [loginState, _hasHydrated]);

  return children;
};

export default LoginStateProvider;
