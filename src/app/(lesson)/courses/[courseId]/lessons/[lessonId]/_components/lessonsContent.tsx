"use client";
import React, { useEffect, useState } from "react";
import Editor from "@/components/editor";
import LectureNavbar from "@/components/lecture-navbar";
import { wrapChunkOfContent } from "../_utils/contentManipulation";
import { Button } from "@/components/ui/button";
import ContentReader from "@/components/editor/reader";
import { trpc } from "@/app/_trpc/client";
import { useParams } from "next/navigation";
import { useUser } from "@/lib/hooks/useUserSession";
import Image from "next/image";
import TypographyH1 from "@/components/ui/typography/h1";
import TypographyH2 from "@/components/ui/typography/h2";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { AssistantInput } from "./assistantInputNew";
import Chat from "./assistantChatWindow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Stars, Wand2 } from "lucide-react";
import { blocksList } from "@/components/toolbox/tools";
interface LessonContentProps {
  content: any[];
  onLessonComplete: () => void;
}
const LessonContent = ({ content, onLessonComplete }: LessonContentProps) => {
  const [chunkCursor, setChunkCursor] = useState(1);

  const onNextClick = () => {
    const newCursor = chunkCursor + 1;
    setChunkCursor(newCursor);

    window.scrollTo({
      top: window.scrollY + 500,
      behavior: "smooth",
    });

    if (newCursor > content.length) {
      onLessonComplete();
    }
  };

  const progress = Math.round((chunkCursor / content.length) * 100);

  return (
    <main className="">
      <LectureNavbar progress={progress}></LectureNavbar>
      <div className="px-0 mt-20 ">
        <Dialog>
          <div className="container p-4 max-w-screen-lg mx-auto mb-20 pb-[40dvh]">
            {content?.slice(0, chunkCursor).map((block, index) => {
              return (
                <div key={index}>
                  {blocksList[block.type].readComponent({
                    value: block.content,
                  })}
                  <div className="my-8"></div>
                </div>
              );
            })}
            <div className="flex justify-between gap-4 pt-8">
              <Button variant={"ghost"} asChild>
                <DialogTrigger>
                  <Stars className="mr-2"></Stars> Спросить Гефеста
                </DialogTrigger>
              </Button>

              <Button type="button" onClick={onNextClick}>
                Дальше
              </Button>
            </div>
          </div>
          <DialogContent className="h-[80dvh] overflow-y-auto p-0 max-w-screen-sm">
            <Chat />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default LessonContent;
