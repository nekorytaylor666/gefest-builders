"use client";
import { trpc } from "@/app/_trpc/client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import LessonContent from "./lessonsContent";
import { Button } from "@/components/ui/button";
import TypographyH2 from "@/components/ui/typography/h2";
import Link from "next/link";
import Image from "next/image";
import { Lesson } from "@prisma/client";
import { toast } from "sonner";
import { useAddActivity } from "@/app/api/hooks/useAddActivity/useAddActivity";

interface LessonContainerProps {
  content: any[];
  lesson: Lesson;
}
const LessonContainer = (props: LessonContainerProps) => {
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const { mutate: markLessonAsCompleted } =
    trpc.progress.markLessonAsCompleted.useMutation();

  const addActivity = useAddActivity();
  const { courseId, lessonId } = useParams() as {
    courseId: string;
    lessonId: string;
  };
  const onLessonComplete = () => {
    setIsLessonCompleted(true);
    markLessonAsCompleted({ courseId, lessonId });
    addActivity({
      activityTypeName: "LESSON_COMPLETED",
      experience: 20,
      metadata: {
        courseId,
        lessonId,
        lessonTitle: props.lesson.title,
      },
    });
  };
  return (
    <>
      {isLessonCompleted ? (
        <SuccessSection />
      ) : (
        <LessonContent
          content={props.content}
          onLessonComplete={onLessonComplete}
        ></LessonContent>
      )}
    </>
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

export default LessonContainer;
