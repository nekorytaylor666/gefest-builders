import { cn } from "@/lib/utils";
import React from "react";
import CodeEditor from "./code-editor";
import { Quiz } from "./quiz";
import TypographyInlineCode from "./ui/typography/code";
import TypographyH2 from "./ui/typography/h1";
import TypographyP from "./ui/typography/p";
import ReactMarkdown from "react-markdown";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import { MDXSection } from "@/lib/mdx-utils";
import TypographyH1 from "./ui/typography/h1";

interface LectureContentSectionProps {
  onNext: () => void;
  isActive: boolean;
  section: MDXSection;
}

const LectureContentSection = React.forwardRef<
  HTMLDivElement,
  LectureContentSectionProps
>(({ onNext, isActive, section }, ref) => {
  const isActiveClasses = isActive ? "pb-20" : "pointer-events-none";
  const containerClasses = "py-4 height-auto";

  const components = {
    h1: (props: any) => <TypographyH1 {...props}></TypographyH1>,
    h2: (props: any) => <TypographyH2 {...props}></TypographyH2>,
    p: (props: any) => <TypographyP {...props}></TypographyP>,
    code: (props: any) => (
      <TypographyInlineCode {...props}></TypographyInlineCode>
    ),
    CodeEditor: (props: any) => (
      <CodeEditor {...props} onSuccess={onNext} onSkip={onNext} />
    ),
  };
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-in-out duration-200",
        containerClasses,
        isActiveClasses
      )}
    >
      <MDXProvider components={components}>
        <MDXRemote {...section} />
      </MDXProvider>
    </div>
  );
});
LectureContentSection.displayName = "LectureContentSection";

export default LectureContentSection;
