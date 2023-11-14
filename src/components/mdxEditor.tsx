// components/MDXEditor.tsx
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { MDXContent, serializeMdxContent } from "@/lib/mdx-utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorBoundary from "@/components/error-boundary";
import MDXRenderer from "@/components/mdx-renderer";
import { debounce } from "@/lib/utils";

import { z } from "zod";
import { Button } from "./ui/button";

const MDXEditorSchema = z.object({
  content: z.string(),
});

export type MDXEditorValues = z.infer<typeof MDXEditorSchema>;

interface MDXEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  onContentSubmit: (values: MDXEditorValues) => void;
}
export const MDXEditor: React.FC<MDXEditorProps> = ({
  initialContent,
  onContentChange,
  onContentSubmit,
}) => {
  const [serializedMDX, setSerializedMDX] = useState<MDXContent>();
  const { register, setValue, handleSubmit } = useForm<MDXEditorValues>({
    defaultValues: { content: initialContent },
  });

  const onEditorContentChange = useCallback(
    async (markdown: string) => {
      const res = await serializeMdxContent(markdown);
      setSerializedMDX(res);
      onContentChange?.(markdown);
    },
    [onContentChange]
  );

  useEffect(() => {
    if (!initialContent) return;
    onEditorContentChange(initialContent);
  }, [initialContent, onEditorContentChange]);

  const debouncedOnEditorContentChange = debounce(onEditorContentChange, 1000);

  return (
    <form onSubmit={handleSubmit(onContentSubmit)}>
      <Button type="submit">Сохранить</Button>
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
  );
};
