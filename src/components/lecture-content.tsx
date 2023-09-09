"use client";
import React, { Suspense } from "react";
import TypographyP from "./ui/typography/p";
import TypographyH2 from "./ui/typography/h1";
import CodeEditor from "./code-editor";
import TypographyInlineCode from "./ui/typography/code";
import { Quiz } from "./quiz";

const LectureContent = () => {
  return (
    <div className=" container max-w-2xl">
      <LectureContentSection></LectureContentSection>
    </div>
  );
};

const LectureContentSection = () => {
  return (
    <div>
      <TypographyH2>Новые Математические Операции</TypographyH2>

      <TypographyP>
        В этой лекции мы узнаем о новых математических операциях, которые мы
        можем использовать в наших программах. Мы узнаем о следующих операциях
        <TypographyInlineCode>%</TypographyInlineCode>,{" "}
        <TypographyInlineCode>**</TypographyInlineCode>,{" "}
        <TypographyInlineCode>{"//"}</TypographyInlineCode>,{" "}
        <TypographyInlineCode>+=</TypographyInlineCode>
      </TypographyP>

      <div className="mt-8">
        <CodeEditor></CodeEditor>
      </div>
      <div className="mt-8 bg-[#f5f5f5] p-4 rounded">
        <Quiz></Quiz>
      </div>
    </div>
  );
};

export default LectureContent;
