"use client";
import Editor from "@/components/editor";
import MDXRenderer from "@/components/mdx-renderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MDXContent } from "@/lib/mdx-utils";
import React from "react";

const HomeworkContent = ({ content }: { content: any }) => {
  return (
    <Editor className="px-0  mx-auto" readonly defaultValue={content}></Editor>
  );
};

export default HomeworkContent;
