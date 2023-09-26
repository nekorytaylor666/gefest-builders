import React from "react";
import { NavMenu } from "./navmenu";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className=" bg-white  py-4 px-16 container">
      <div className="flex items-center justify-between w-full">
        <Image
          className="hidden lg:block "
          width={150}
          height={47}
          src={"/logo.svg"}
          alt="logo"
        ></Image>
        <NavMenu></NavMenu>
      </div>
    </div>
  );
};

export default Navbar;
