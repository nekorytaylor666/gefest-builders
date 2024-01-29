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
interface LessonContentProps {
  chunks: any[];
  onLessonComplete: () => void;
}
const LessonContent = ({ chunks, onLessonComplete }: LessonContentProps) => {
  const [chunkCursor, setChunkCursor] = useState(1);

  const updateChunks = (cursor: number) => {
    const newChunksUntilCursor = chunks.slice(0, cursor).flat(1);
    return wrapChunkOfContent(newChunksUntilCursor);
  };

  const [wrappedContentChunk, setWrappedContentChunk] = useState(
    updateChunks(chunkCursor)
  );

  const onNextClick = () => {
    const newCursor = chunkCursor + 1;
    setChunkCursor(newCursor);
    setWrappedContentChunk(updateChunks(newCursor));

    if (newCursor >= chunks.length) {
      onLessonComplete();
    }
  };

  // Calculate progress
  const progress = Math.round((chunkCursor / chunks.length) * 100);

  return (
    <main className="">
      <LectureNavbar progress={progress}></LectureNavbar>
      <div className="px-0 mt-20 ">
        <Dialog>
          <div className="container p-4 max-w-screen-lg mx-auto mb-20 pb-[40dvh]">
            <ContentReader
              className="p-0"
              content={wrappedContentChunk}
              readonly={true}
            ></ContentReader>
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
