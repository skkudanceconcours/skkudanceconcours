import { ReactNode } from "react";
import Navbar from "./Navbar";


const Header = (): ReactNode => {
  return (
    <div className="z-10 flex w-screen justify-center p-2 lg:h-60 lg:p-0 ">
      <Navbar/>
    </div>
  );
};

export default Header;
