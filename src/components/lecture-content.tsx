"use client";
import React, { Suspense, useEffect, useRef } from "react";
import LectureContentSection from "./lecture-content-section";

const LectureContent = () => {
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
      {lectureContent.map((item, index) => (
        <LectureContentSection
          isActive={index === currentActiveIndex}
          ref={(el) => (lectureRefs.current[index] = el)} // Store the DOM node in the refs array
          key={item}
          onNext={onLectureContentNext}
        ></LectureContentSection>
      ))}
    </div>
  );
};

export default LectureContent;
