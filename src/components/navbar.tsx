import React from "react";
import { NavMenu } from "./navmenu";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 bg-white flex items-center justify-between w-full py-4 px-16">
      <Image
        className="hidden lg:block "
        width={150}
        height={47}
        src={"/logo.svg"}
        alt="logo"
      ></Image>
      <NavMenu></NavMenu>
    </div>
  );
};

export default Navbar;
