import { ReactNode } from "react";
import Navbar from "./Navbar";
import { roboto } from "@/public/fonts/font";

const Header = (): ReactNode => {
  return (
    <div className="absolute h-20 w-screen ">
      <Navbar className="flex h-full items-center justify-center" />
    </div>
  );
};

export default Header;
