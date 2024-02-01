"use client";
import React from "react";
import { HiMiniXMark, HiFire } from "react-icons/hi2";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useParams, useRouter } from "next/navigation";
import { UserNav } from "./navbar/user-nav";

const LectureNavbar = ({ progress }: { progress: number }) => {
  const router = useRouter();
  const { courseId } = useParams();
  return (
    <nav className="fixed w-full top-0 z-50 p-4 shadow-sm lg:shadow-none bg-white">
      <div className="flex items-center justify-between w-full gap-2  lg:px-8">
        <Button
          onClick={() => router.push("/courses/" + courseId)}
          className="p-0"
          size={"icon"}
          variant={"ghost"}
        >
          <HiMiniXMark className="h-8 w-8"></HiMiniXMark>
        </Button>
        <div className="flex items-center gap-2 w-full flex-1 lg:container lg:max-w-screen-md">
          <Progress value={progress}></Progress>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-0.5 items-center">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              1
            </h3>
            <HiFire className="text-orange-600 h-6 w-6"></HiFire>
          </div>
          <UserNav></UserNav>
        </div>
      </div>
    </nav>
  );
};

export default LectureNavbar;
