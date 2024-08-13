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
import { useActions, useUIState } from "ai/rsc";
import { AI } from "../action";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";

interface LessonContainerProps {
  content: any[];
  lesson: Lesson;
}
const LessonContainer = (props: LessonContainerProps) => {
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const { mutate: markLessonAsCompleted } =
    trpc.progress.markLessonAsCompleted.useMutation();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  //@ts-ignore
  const { submitUserMessage } = useActions<typeof AI>();

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
        <div>
          <div className="container p-4 max-w-screen-lg mx-auto mb-20 pb-[40dvh]">
            <LessonContent
              content={props.content}
              onLessonComplete={onLessonComplete}
            ></LessonContent>
            <div className="mt-4">
              {
                // View messages in UI state
                messages.map((message) => (
                  <div className="my-4" key={message.id}>
                    {message.display}
                  </div>
                ))
              }

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  // Add user message to UI state
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: Date.now(),
                      display: (
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-accent font-bold">
                              <PersonIcon className=""></PersonIcon>
                            </AvatarFallback>
                          </Avatar>
                          <div className="prose max-w-full dark:text-white text-black">
                            {inputValue}
                          </div>
                        </div>
                      ),
                    },
                  ]);

                  // Submit and get response message
                  const responseMessage = await submitUserMessage(inputValue, {
                    courseId: Number(courseId),
                    lessonId: Number(lessonId),
                  });
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);

                  setInputValue("");
                }}
              >
                <Input
                  placeholder="Send a message..."
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.target.value);
                  }}
                />
              </form>
            </div>
          </div>
        </div>
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
