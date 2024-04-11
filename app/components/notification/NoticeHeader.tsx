"use client";
import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
// Types
import { Path } from "@/template/paths";

const NoticeHeader = (): ReactNode => {
  const router = useRouter();
  const pathName = usePathname();
  const currPath = pathName;
  console.log(currPath);

  // Dynamic Styling

  const stylebyPath_noficiation =
    pathName === "/notification" || pathName === "/notification/details"
      ? "flex h-full w-2/5 items-center justify-end underline underline-offset-8 hover:cursor-pointer"
      : "flex h-full w-2/5 items-center justify-end hover:cursor-pointer";
  const stylebyPath_guideline =
    pathName === "/notification/guideline"
      ? "flex h-full w-2/5 items-center justify-start underline underline-offset-8 hover:cursor-pointer"
      : "flex h-full w-2/5 items-center justify-start hover:cursor-pointer";
  return (
    <nav className="absolute flex h-[15vh] w-full items-center justify-between text-2xl font-semibold text-white lg:my-12 lg:text-5xl">
      <span
        className={stylebyPath_noficiation}
        onClick={() => {
          currPath !== "/notification" && router.push("/notification?page=1");
        }}
      >
        Notice
      </span>
      <span
        className={stylebyPath_guideline}
        onClick={() =>
          currPath !== "/notification/guideline" &&
          router.push("/notification/guideline")
        }
      >
        Guideline
      </span>
    </nav>
  );
};

export default NoticeHeader;
