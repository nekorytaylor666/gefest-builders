import React from "react";
import { HiMiniXMark, HiFire } from "react-icons/hi2";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const LectureNavbar = () => {
  return (
    <nav className="p-4 shadow">
      <div className="flex items-center justify-between w-full gap-2">
        <Button className="p-0" variant={"ghost"}>
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
  );
};

export default LectureNavbar;
