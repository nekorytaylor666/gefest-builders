import { cn } from "@/lib/utils";
import React from "react";
import { Quiz } from "./quiz";
import TypographyInlineCode from "./ui/typography/code";
import TypographyH2 from "./ui/typography/h2";
import TypographyP from "./ui/typography/p";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import { MDXContent } from "@/lib/mdx-utils";
import TypographyH1 from "./ui/typography/h1";
import { Button } from "./ui/button";
import VideoEmbed from "./video-embed";
import ErrorBoundary from "./error-boundary";
import TypographyH3 from "./ui/typography/h3";
import { Sandpack } from "@codesandbox/sandpack-react";
import { CH } from "@code-hike/mdx/components";

interface MDXRendererProps {
  onNext?: () => void;
  isActive?: boolean;
  content: MDXContent;
}

const MDXRenderer = React.forwardRef<HTMLDivElement, MDXRendererProps>(
  ({ onNext, isActive, content }, ref) => {
    const isActiveClasses = isActive ? "pb-20" : "";
    const containerClasses = " height-auto";

    const components = {
      h1: (props: any) => <TypographyH1 {...props}></TypographyH1>,
      h2: (props: any) => <TypographyH2 {...props}></TypographyH2>,
      h3: (props: any) => <TypographyH3 {...props}></TypographyH3>,
      a: (props: any) => (
        <a
          {...props}
          className="font-medium text-primary underline underline-offset-4"
        >
          {props.children}
        </a>
      ),
      p: (props: any) => <TypographyP {...props}></TypographyP>,
      CH,
      Sandpack: (props: any) => <Sandpack {...props} />,
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
            "transition-all ease-in-out duration-200 leading-loose",
            containerClasses,
            isActiveClasses
          )}
        >
          <MDXProvider components={components}>
            {/* @ts-ignore */}
            <MDXRemote {...content} />
          </MDXProvider>
        </div>
      </ErrorBoundary>
    );
  }
);
MDXRenderer.displayName = "MDXRenderer";

export default MDXRenderer;
