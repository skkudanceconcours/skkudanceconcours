import { ReactNode } from "react";
import Navbar from "./Navbar";

const Header = (): ReactNode => {
  return (
    <div className="h-20 lg:h-24 p-2 lg:p-0 w-screen z-10">
      <Navbar className="flex h-full items-center justify-center" />
    </div>
  );
};

export default Header;
