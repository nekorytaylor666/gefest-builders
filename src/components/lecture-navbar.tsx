import React from "react";
import { HiMiniXMark, HiFire } from "react-icons/hi2";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { getSession } from "@auth0/nextjs-auth0";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";

const LectureNavbar = async () => {
  const session = await getSession();

  const user = session?.user;
  console.log(user);
  return (
    <>
      <nav className="fixed w-full top-0 z-50 p-4 shadow-sm lg:shadow-none bg-white">
        <div className="flex items-center justify-between w-full gap-2 container max-w-4xl p-0">
          <Button className="p-0" size={"icon"} variant={"ghost"}>
            <HiMiniXMark className="h-8 w-8"></HiMiniXMark>
          </Button>
          <div className="flex items-center gap-2 w-full flex-1">
            <Progress value={0.5}></Progress>
            <Progress value={0}></Progress>
            <Progress value={0}></Progress>
            <Progress value={0}></Progress>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 items-center">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                1
              </h3>
              <HiFire className="text-orange-600 h-6 w-6"></HiFire>
            </div>

            <div className="relative aspect-square rounded-full w-10 h-10 overflow-hidden flex items-center justify-center bg-gradient-to-t from-green-400 to-green-100">
              <img
                className="absolute inset-0 object-cover"
                width={80}
                height={80}
                src={user?.picture}
                alt=""
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LectureNavbar;
