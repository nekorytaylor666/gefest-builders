import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserNav } from "./user-nav";
import ActivitiesBar from "./activityBar";

const Navbar = () => {
  return (
    <div className="   py-4 px-4 lg:px-16 container">
      <div className="flex items-center justify-between w-full">
        <Link className="cursor-pointer flex items-center" href={"/"}>
          <Image
            className="block w-8 h-8 object-contain"
            width={150}
            height={47}
            src={"/logo.png"}
            alt="logo"
          ></Image>
          <span className="text-xl font-bold tracking-tight">
            Gefest Builders
          </span>
        </Link>
        <div className="flex items-center gap-4 ">
          <ActivitiesBar></ActivitiesBar>
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
