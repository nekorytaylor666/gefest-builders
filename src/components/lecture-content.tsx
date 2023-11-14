"use client";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import MDXRenderer from "./mdx-renderer";

import TypographyH2 from "@/components/ui/typography/h1";
import { Button } from "./ui/button";
import { MDXContent } from "@/lib/mdx-utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import LectureNavbar from "./lecture-navbar";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { ProcedureReturnType } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { setHours } from "date-fns";

interface LectureContentProps {
  course: ProcedureReturnType<
    (typeof serverClient)["courses"]["getCourseBySlug"]
  >;
  lessonId: number;
  serializedMdxSections: MDXContent[];
}

const LectureContent = ({
  course,
  lessonId,
  serializedMdxSections,
}: LectureContentProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  const { toast } = useToast();

  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useUser();
  const userId = user?.id as string;

  const data = trpc.progress.markLessonAsCompleted.useMutation();

  const onLessonComplete = () => {
    toast({
      title: "Урок закончен!",
      description: "Продолжайте в том же духе :)",
    });
    if (!course?.id) return;

    setShowSuccess(true);
    data.mutate(
      { userId, courseId: course!.id, lessonId },
      {
        onSuccess(res) {
          console.log(res);
        },
      }
    );
  };

  const onLectureContentNext = () => {
    if (currentSection >= serializedMdxSections.length - 1) {
      onLessonComplete();
    } else {
      setCurrentSection((prev) => {
        return prev + 1;
      });
    }
  };

  const progress = () => {
    if (!serializedMdxSections) {
      return 0;
    }
    return (currentSection / (serializedMdxSections.length - 1)) * 100;
  };

  return (
    <div className="">
      <LectureNavbar progress={progress()}></LectureNavbar>

      <div className="pt-20   p-4">
        {!showSuccess ? (
          <div>
            <LectureContentPlot
              serializedMdxSections={serializedMdxSections}
              onNextSection={onLectureContentNext}
              currentSection={currentSection}
            ></LectureContentPlot>
          </div>
        ) : (
          <SuccessSection courseSlug={course!.slug}></SuccessSection>
        )}
      </div>
    </div>
  );
};

const LectureContentPlot = (props: {
  serializedMdxSections: MDXContent[];
  onNextSection: () => void;
  currentSection: number;
}) => {
  const { serializedMdxSections, onNextSection, currentSection } = props;

  const lectureRefs = useRef<(HTMLDivElement | null)[]>([]); // To store the references of lectures

  useEffect(() => {
    // When lectureContent length changes, it means a new item is added. We'll scroll to that.
    if (lectureRefs.current.length) {
      const lastLectureRef: HTMLDivElement | null =
        lectureRefs.current[lectureRefs.current.length - 1];
      if (lastLectureRef?.parentNode) {
        lastLectureRef?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [currentSection]);
  const isLastSection = useMemo(() => {
    return currentSection === serializedMdxSections.length - 1;
  }, [currentSection, serializedMdxSections.length]);

  return (
    <div className="lg:container lg:max-w-screen-md">
      {serializedMdxSections
        .slice(0, currentSection + 1)
        .map((section, index) => (
          <MDXRenderer
            key={index}
            ref={(el) => (lectureRefs.current[index] = el)}
            content={section}
            isActive={index === currentSection}
            onNext={onNextSection}
          ></MDXRenderer>
        ))}
      <div className="w-full flex justify-end">
        <Button variant={"default"} onClick={onNextSection}>
          {isLastSection ? "Завершить" : "Далее"}
        </Button>
      </div>
    </div>
  );
};

const SuccessSection = ({ courseSlug }: { courseSlug: string }) => {
  const router = useRouter();
  const onLessonFinishButtonClick = () => {
    router.push("/courses/" + courseSlug);
  };

  return (
    <div className="lg:grid lg:grid-cols-2 flex flex-col-reverse items-center gap-4 w-full h-full max-w-screen-2xl mx-auto p-2">
      <div className="flex flex-col gap-4 lg:items-start text-center p-4 ">
        <TypographyH2>Вы закончили урок</TypographyH2>
        <p className="text-lg">Теперь надо закрепить материал!</p>
        <Button onClick={onLessonFinishButtonClick} size={"lg"}>
          Продолжить изучение!
        </Button>
      </div>
      <div className="w-full flex justify-center items-center h-full">
        <img className="lg:w-2/3 w-full" src="/success.svg" alt="success"></img>
      </div>
    </div>
  );
};

export default LectureContent;
