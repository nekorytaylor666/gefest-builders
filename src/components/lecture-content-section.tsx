import { cn } from "@/lib/utils";
import React from "react";
import CodeEditor from "./code-editor";
import { Quiz } from "./quiz";
import TypographyInlineCode from "./ui/typography/code";
import TypographyH2 from "./ui/typography/h1";
import TypographyP from "./ui/typography/p";

interface LectureContentSectionProps {
  onNext: () => void;
  isActive: boolean;
}

const LectureContentSection = React.forwardRef<
  HTMLDivElement,
  LectureContentSectionProps
>(({ onNext, isActive }, ref) => {
  const sectionStyle = isActive
    ? {}
    : {
        pointerEvents: "none",
      };
  const isActiveClasses = isActive ? "" : "pointer-events-none";
  const containerClasses = "py-24";
  return (
    <div ref={ref} className={cn(containerClasses, isActiveClasses)}>
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
      <div>
        <button
          onClick={onNext}
          className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
});
LectureContentSection.displayName = "LectureContentSection";

export default LectureContentSection;
