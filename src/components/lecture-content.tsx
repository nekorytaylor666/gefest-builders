"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import LectureContentSection from "./lecture-content-section";
import { MDXRemote } from "next-mdx-remote/rsc";
import ReactMarkdown from "react-markdown";

import TypographyInlineCode from "@/components/ui/typography/code";
import TypographyP from "@/components/ui/typography/p";
import TypographyH2 from "@/components/ui/typography/h1";
import { Button } from "./ui/button";
import { set } from "react-hook-form";
import { ScrollArea } from "./ui/scroll-area";
import { TypeOf } from "zod";
import { MDXSection, serializeAllMdxSections } from "@/lib/mdx-utils";
import { UnwrapPromise } from "@/types";

interface LectureContentProps {
  data: any;
  serializedMdxSections: MDXSection[];
}

const LectureContent = ({
  data,
  serializedMdxSections,
}: LectureContentProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  const lectureRefs = useRef<(HTMLDivElement | null)[]>([]); // To store the references of lectures

  const onLectureContentNext = () => {
    setCurrentSection((prev) => prev + 1);
  };

  const handleSkip = () => {
    setCurrentSection((prev) => prev + 1);
  };

  useEffect(() => {
    // When lectureContent length changes, it means a new item is added. We'll scroll to that.
    if (lectureRefs.current.length) {
      const lastLectureRef: HTMLDivElement | null =
        lectureRefs.current[lectureRefs.current.length - 1];
      lastLectureRef?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSection]);

  return (
    <div className=" container max-w-2xl">
      {serializedMdxSections
        .slice(0, currentSection + 1)
        .map((section, index) => (
          <LectureContentSection
            key={index}
            ref={(el) => (lectureRefs.current[index] = el)}
            section={section}
            isActive={index === currentSection}
            onNext={onLectureContentNext}
          ></LectureContentSection>
        ))}
      <button onClick={handleSkip}>Skip</button>
    </div>
  );
};

export default LectureContent;
