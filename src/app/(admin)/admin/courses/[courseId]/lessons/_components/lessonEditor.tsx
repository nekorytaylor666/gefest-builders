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
const EditorPageContainer = ({
  initialContent,
  courseId,
  lessonId,
}: {
  initialContent: any;
  lessonId: number;
  courseId: number;
}) => {
  const { toast } = useToast();

  const saveContentMutation = useMutation(
    (content: string) => {
      const file = new Blob([content], { type: "text/markdown" });
      const formData = new FormData();
      formData.append("file", file);
      return fetch(`/api/courses/${courseId}/lessons/${lessonId}/editContent`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Контент урока изменена",
          description: "Хорошая работа :)",
        });
      },
    }
  );

  const onContentSumbit = (values: MDXEditorValues) => {
    saveContentMutation.mutate(values.content);
  };
  return (
    <Suspense fallback={<div>loading...</div>}>
      <DashboardHeader
        heading="Редактирование контента"
        text="Обновление контента урока"
      ></DashboardHeader>
      <Separator className="my-4"></Separator>
      <MDXEditor
        initialContent={initialContent}
        onContentSubmit={onContentSumbit}
      ></MDXEditor>
    </Suspense>
  );
};

export default EditorPageContainer;
