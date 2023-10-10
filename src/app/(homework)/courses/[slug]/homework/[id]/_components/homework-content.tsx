"use client";
import MDXRenderer from "@/components/mdx-renderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MDXContent } from "@/lib/mdx-utils";
import React from "react";

const HomeworkContent = ({ content }: { content: MDXContent }) => {
  return <MDXRenderer content={content}></MDXRenderer>;
};

export default HomeworkContent;
