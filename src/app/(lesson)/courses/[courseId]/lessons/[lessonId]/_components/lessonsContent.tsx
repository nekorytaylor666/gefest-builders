"use client";
import React, { useEffect, useState } from "react";
import LectureNavbar from "@/components/lecture-navbar";
import { Button } from "@/components/ui/button";
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
    <main>
      <LectureNavbar progress={progress}></LectureNavbar>
      <div className="px-0 mt-20 ">
        <div className="">
          {content?.slice(0, chunkCursor).map((block: any, index: number) => {
            return (
              <div key={index}>
                {blocksList[
                  block.type as keyof typeof blocksList
                ].readComponent({
                  value: block.content,
                })}
                <div className="my-8"></div>
              </div>
            );
          })}
          <div className="flex justify-end gap-4 pt-8">
            <Button type="button" onClick={onNextClick}>
              Дальше
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LessonContent;
