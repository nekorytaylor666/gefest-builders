import React from "react";
import { NavMenu } from "./navmenu";
import Image from "next/image";
import Link from "next/link";
import { UserNav } from "./user-nav";
const Navbar = () => {
  return (
    <div className=" bg-white  py-4 px-4 lg:px-16 container">
      <div className="flex items-center justify-between w-full">
        <Link className="cursor-pointer" href={"/"}>
          <Image
            className="block "
            width={150}
            height={47}
            src={"/logo.svg"}
            alt="logo"
          ></Image>
        </Link>
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
