"use client";
import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboardHeader";
import MDXRenderer from "@/components/mdx-renderer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MDXContent, serializeMdxContent } from "@/lib/mdx-utils";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { MDXRemote } from "next-mdx-remote";
import { MDXProvider } from "@mdx-js/react";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { serialize } from "next-mdx-remote/serialize";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorBoundary from "@/components/error-boundary";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
const EditorPageContainer = ({
  initialContent,
  courseId,
  lessonId,
}: {
  initialContent: any;
  lessonId: number;
  courseId: number;
}) => {
  const [serializedMDX, setSerializedMDX] = useState<MDXContent>();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { content: initialContent },
  });
  const { toast } = useToast();

  const onEditorContentChange = async (markdown: string) => {
    const res = await serializeMdxContent(markdown);
    setSerializedMDX(res);
  };

  const debounce = (func: Function, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  };

  const debouncedOnEditorContentChange = debounce(onEditorContentChange, 1000);

  const saveContentMutation = useMutation(
    (content: string) => {
      const file = new Blob([content], { type: "text/markdown" });
      console.log(content);
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

  const onContentSumbit = (values: any) => {
    saveContentMutation.mutate(values.content);
  };
  return (
    <Suspense fallback={<div>loading...</div>}>
      <form onSubmit={handleSubmit(onContentSumbit)}>
        <DashboardHeader
          heading="Редактирование контента"
          text="Обновление контента урока"
        >
          <Button type="submit">Загрузить</Button>
        </DashboardHeader>
        <Separator className="my-4"></Separator>
        <div className="grid grid-cols-2 gap-4 p-2">
          <Textarea
            className=" h-[800px]"
            {...register("content")}
            onChange={(el) => {
              setValue("content", el.target.value);
              debouncedOnEditorContentChange(el.target.value);
            }}
          />
          {serializedMDX && (
            <ErrorBoundary>
              <ScrollArea className="h-[800px] w-full rounded-md border p-4">
                <MDXRenderer content={serializedMDX}></MDXRenderer>
              </ScrollArea>
            </ErrorBoundary>
          )}
        </div>
      </form>
    </Suspense>
  );
};

export default EditorPageContainer;
