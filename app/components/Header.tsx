import { ReactNode } from "react";
import Navbar from "./Navbar";

const Header = (): ReactNode => {
  return (
    <div className="absolute h-20 w-screen z-10">
      <Navbar className="flex h-full items-center justify-center" />
    </div>
  );
};

export default Header;
