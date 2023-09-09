"use client";
import React, { Suspense, useEffect, useRef } from "react";
import LectureContentSection from "./lecture-content-section";
import { MDXRemote } from "next-mdx-remote/rsc";
import ReactMarkdown from "react-markdown";

import TypographyInlineCode from "@/components/ui/typography/code";
import TypographyP from "@/components/ui/typography/p";
import TypographyH2 from "@/components/ui/typography/h1";

const components = {
  h2: TypographyH2,
  p: TypographyP,
  code: TypographyInlineCode,
};

const LectureContent = ({ data, content }: { data: any; content: any }) => {
  const [lectureContent, setLectureContent] = React.useState<string[]>([
    "lectureContent0",
  ]);

  const [currentActiveIndex, setCurrentActiveIndex] = React.useState(0);

  const lectureRefs = useRef<(HTMLDivElement | null)[]>([]); // To store the references of lectures

  const addLectureContent = () => {
    setLectureContent((prev) => [...prev, "lectureContent" + prev.length]);
    setCurrentActiveIndex((prevIndex) => prevIndex + 1);
  };

  const onLectureContentNext = () => {
    addLectureContent();
    console.log("onLectureContentSuccess");
  };

  useEffect(() => {
    // When lectureContent length changes, it means a new item is added. We'll scroll to that.
    if (lectureRefs.current.length) {
      const lastLectureRef: HTMLDivElement | null =
        lectureRefs.current[lectureRefs.current.length - 1];
      lastLectureRef?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lectureContent.length]);

  return (
    <div className=" container max-w-2xl">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

export default LectureContent;
