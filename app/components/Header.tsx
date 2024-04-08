import { ReactNode } from "react";
import Navbar from "./Navbar";

const Header = (): ReactNode => {
  return (
    <div className="h-20 lg:h-24 p-2 lg:p-0 w-screen flex justify-center z-10 ">
      <Navbar className="flex items-center justify-center" />
    </div>
  );
};

export default Header;
