import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserNav } from "./user-nav";
import ActivitiesBar from "./activityBar";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="   py-4 px-4 lg:px-16 container">
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
        <div className="flex items-center gap-4 ">
          <ActivitiesBar></ActivitiesBar>
          <UserNav />
        </div>
      </div>
    </div>
  );
};



export default Navbar;
