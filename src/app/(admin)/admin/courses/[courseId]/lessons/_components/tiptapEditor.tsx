"use client";
import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboardHeader";
import MDXRenderer from "@/components/mdx-renderer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MDXContent, serializeMdxContent } from "@/lib/mdx-utils";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorBoundary from "@/components/error-boundary";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import Breadcrumb from "@/components/breadcrumbs";
import { debounce } from "@/lib/utils";
import { MDXEditor, MDXEditorValues } from "@/components/mdxEditor";
import Editor from "@/components/editor";
import { trpc } from "@/app/_trpc/client";
import SuperJSON from "superjson";
const DraftEditorPageContainer = ({
  initialContent,
  courseId,
  lessonId,
}: {
  initialContent: any;
  lessonId: number;
  courseId: number;
}) => {
  const { toast } = useToast();

  const lesson = trpc.lessons.getLessonByCourseIdAndLessonId.useSuspenseQuery({
    courseId,
    lessonId,
  });
  const saveContentMutation = trpc.lessons.editLessonContent.useMutation();
  // const saveContentMutation = useMutation(
  //   (content: string) => {
  //     const file = new Blob([content], { type: "text/markdown" });
  //     console.log(content);
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     return fetch(`/api/courses/${courseId}/lessons/${lessonId}/editContent`, {
  //       method: "POST",
  //       body: formData,
  //     }).then((res) => res.json());
  //   },
  //   {
  //     onSuccess: (res) => {
  //       toast({
  //         title: "Контент урока изменена",
  //         description: "Хорошая работа :)",
  //       });
  //     },
  //   }
  // );

  const lessonContent = lesson[0]?.jsonContent ?? "";
  console.log("lesson content", lessonContent);
  const jsonContent = lessonContent && JSON.parse(lessonContent as any);
  const onContentSumbit = (values: MDXEditorValues) => {};
  return (
    <Suspense fallback={<div>loading...</div>}>
      <DashboardHeader
        heading="Редактирование контента"
        text="Обновление контента урока"
      ></DashboardHeader>
      <Separator className="my-4"></Separator>
      <Editor
        defaultValue={jsonContent}
        onDebouncedUpdate={(editor) => {
          const json = editor?.getJSON();
          const content = JSON.stringify(json);
          saveContentMutation.mutate({ lessonId: lessonId, content });
        }}
      ></Editor>
    </Suspense>
  );
};

export default DraftEditorPageContainer;
