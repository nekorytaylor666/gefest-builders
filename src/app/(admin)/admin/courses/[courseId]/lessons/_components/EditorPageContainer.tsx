"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const EditorComp = dynamic(() => import("@/components/mdx-editor/MDXEditor"), {
  ssr: false,
});

const EditorPageContainer = ({ content }: { content: any }) => {
  return (
    <Suspense fallback={null}>
      <EditorComp markdown={content ?? ""} />
    </Suspense>
  );
};

export default EditorPageContainer;
