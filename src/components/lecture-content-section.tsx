import { cn } from "@/lib/utils";
import React from "react";
import CodeEditor from "./code-editor";
import { Quiz } from "./quiz";
import TypographyInlineCode from "./ui/typography/code";
import TypographyH2 from "./ui/typography/h1";
import TypographyP from "./ui/typography/p";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import { MDXSection } from "@/lib/mdx-utils";
import TypographyH1 from "./ui/typography/h1";
import { Button } from "./ui/button";
import VideoEmbed from "./video-embed";
import ErrorBoundary from "./error-boundary";

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
    Quiz: (props: any) => <Quiz {...props} onSuccess={onNext} />,
    VideoEmbed: (props: any) => <VideoEmbed {...props}></VideoEmbed>,

    Next: (props: any) => (
      <Button {...props} onClick={onNext}>
        Дальше
      </Button>
    ),
  };
  return (
    <ErrorBoundary>
      <div
        ref={ref}
        className={cn(
          "transition-all ease-in-out duration-200 ",
          containerClasses,
          isActiveClasses
        )}
      >
        <MDXProvider components={components}>
          <MDXRemote {...section} />
        </MDXProvider>
      </div>
    </ErrorBoundary>
  );
});
LectureContentSection.displayName = "LectureContentSection";

export default LectureContentSection;
