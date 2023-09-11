import React from "react";
import { HiMiniXMark, HiFire } from "react-icons/hi2";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { getSession } from "@auth0/nextjs-auth0";

const LectureNavbar = async () => {
  const session = await getSession();

  const user = session?.user;
  return (
    <>
      <nav className="p-4 shadow-sm lg:shadow-none">
        <div className="flex items-center justify-between w-full gap-2 container max-w-4xl">
          <Button className="p-0" size={"icon"} variant={"ghost"}>
            <HiMiniXMark className="h-8 w-8"></HiMiniXMark>
          </Button>
          <div className="flex items-center gap-2 w-full flex-1">
            <Progress value={0.5}></Progress>
            <Progress value={0}></Progress>
            <Progress value={0}></Progress>
            <Progress value={0}></Progress>
          </div>
          <div className="flex gap-0.5 items-center">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              1
            </h3>
            <HiFire className="text-orange-600 h-6 w-6"></HiFire>
          </div>
        </div>
      </nav>
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    </>
  );
};

export default LectureNavbar;
