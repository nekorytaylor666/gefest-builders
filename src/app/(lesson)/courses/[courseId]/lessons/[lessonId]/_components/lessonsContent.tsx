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
}
const LessonContent = ({ chunks }: LessonContentProps) => {
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  const { mutate: markLessonAsCompleted } =
    trpc.progress.markLessonAsCompleted.useMutation();
  const { data } = useUser();
  const userId = data?.user?.id;
  const { courseId, lessonId } = useParams() as {
    courseId: string;
    lessonId: string;
  };
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
    console.log(newCursor, chunks.length, userId);
    if (newCursor >= chunks.length && userId) {
      markLessonAsCompleted({ courseId, lessonId, userId });
      setIsLessonCompleted(true);
    }
  };

  // Calculate progress
  const progress = Math.round((chunkCursor / chunks.length) * 100);

  return (
    <main className="">
      <LectureNavbar progress={progress}></LectureNavbar>
      <div className="px-0 mt-20 ">
        {isLessonCompleted ? (
          // Если урок завершен, отобразите компонент успеха
          <SuccessSection />
        ) : (
          <Dialog>
            <div className="container p-4 max-w-screen-lg mx-auto mb-20">
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
        )}
      </div>
    </main>
  );
};

const SuccessSection = () => {
  const { courseId } = useParams() as {
    courseId: string;
    lessonId: string;
  };
  return (
    <div className="grid grid-cols-1  lg:min-h-screen min-h-screen">
      <div className="flex flex-col gap-4 items-center justify-center p-8 text-center">
        <TypographyH2>Молодец продолжай в том же духе</TypographyH2>
        <Button size={"lg"} asChild>
          <Link href={`/courses/${courseId}`}> Вернуться к урокам</Link>
        </Button>
      </div>
      <div className="w-full relative">
        <Image
          className=" object-contain bottom-0 absolute right-0"
          width={500}
          height={500}
          src="/gefestSuccess.png"
          alt="Success"
        ></Image>
      </div>
    </div>
  );
};

export default LessonContent;