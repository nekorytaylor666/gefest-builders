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

interface LectureContentSectionProps {
  onNext: () => void;
  isActive: boolean;
  section: MDXSection;
}

const LectureContentSection = React.forwardRef<
  HTMLDivElement,
  LectureContentSectionProps
>(({ onNext, isActive, section }, ref) => {
  const isActiveClasses = isActive ? "" : "pointer-events-none";
  const containerClasses = "py-24";

  const components = {
    h2: (props: any) => <TypographyH2 {...props}></TypographyH2>,
    p: (props: any) => <TypographyP {...props}></TypographyP>,
    code: (props: any) => (
      <TypographyInlineCode {...props}></TypographyInlineCode>
    ),
    CodeEditor: (props: any) => (
      <CodeEditor {...props} onSuccess={onNext} onSkip={onNext} />
    ),
    // ... other components
  };
  return (
    <div ref={ref} className={cn(containerClasses, isActiveClasses)}>
      <MDXProvider components={components}>
        <MDXRemote {...section} />
      </MDXProvider>
    </div>
  );
});
LectureContentSection.displayName = "LectureContentSection";

export default LectureContentSection;
