"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import LectureContentSection from "./lecture-content-section";
import { MDXRemote } from "next-mdx-remote/rsc";

import TypographyInlineCode from "@/components/ui/typography/code";
import TypographyP from "@/components/ui/typography/p";
import TypographyH2 from "@/components/ui/typography/h1";
import { Button } from "./ui/button";
import { set } from "react-hook-form";
import { ScrollArea } from "./ui/scroll-area";
import { TypeOf } from "zod";
import { MDXSection, serializeAllMdxSections } from "@/lib/mdx-utils";
import { UnwrapPromise } from "@/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import LectureNavbar from "./lecture-navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LectureContentProps {
  data: any;
  courseSlug: string;
  serializedMdxSections: MDXSection[];
}

const LectureContent = ({
  data,
  courseSlug,
  serializedMdxSections,
}: LectureContentProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const router = useRouter();

  const lectureRefs = useRef<(HTMLDivElement | null)[]>([]); // To store the references of lectures

  const onLectureContentNext = () => {
    if (currentSection === serializedMdxSections.length) {
      router.push("/success");
    } else {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setCurrentSection((prev) => prev + 1);
  };

  const onLessonFinishButtonClick = () => {
    router.push("/courses/" + courseSlug);
  };

  useEffect(() => {
    // When lectureContent length changes, it means a new item is added. We'll scroll to that.
    if (lectureRefs.current.length) {
      const lastLectureRef: HTMLDivElement | null =
        lectureRefs.current[lectureRefs.current.length - 1];
      lastLectureRef?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentSection]);

  const progress = (currentSection / serializedMdxSections.length) * 100;

  return (
    <div className="">
      <LectureNavbar progress={progress}></LectureNavbar>
      <div className="lg:grid lg:grid-cols-2 flex flex-col-reverse items-center gap-4 w-full h-full max-w-screen-2xl mx-auto p-2">
        <div className="flex flex-col gap-4 lg:items-start text-center p-4 ">
          <TypographyH2>Вы закончили урок</TypographyH2>
          <p className="text-lg">Теперь надо закрепить материал!</p>
          <Button onClick={onLessonFinishButtonClick} size={"lg"}>
            Продолжить изучение!
          </Button>
        </div>
        <div className="w-full flex justify-center items-center h-full">
          <img
            className="lg:w-2/3 w-full"
            src="/success.svg"
            alt="success"
          ></img>
        </div>
      </div>
      <div className=" lg:container lg:max-w-screen-md p-4">
        {/* {serializedMdxSections
          .slice(0, currentSection + 1)
          .map((section, index) => (
            <LectureContentSection
              key={index}
              ref={(el) => (lectureRefs.current[index] = el)}
              section={section}
              isActive={index === currentSection}
              onNext={onLectureContentNext}
            ></LectureContentSection>
          ))} */}
      </div>
    </div>
  );
};

export default LectureContent;
