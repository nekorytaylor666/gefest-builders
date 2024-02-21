"use client";
import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboardHeader";
import MDXRenderer from "@/components/mdx-renderer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MDXContent, serializeMdxContent } from "@/lib/mdx-utils";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { type Editor as EditorType } from "@tiptap/core";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { toast } from "sonner";
import { Blocks, Check, Cross, Edit3, Trash, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import ToolboxGrid from "@/components/toolbox/toolboxGrid";
import { GBlock, GBlockType, blocksList } from "@/components/toolbox/tools";
import { Card } from "@/components/ui/card";
import {
  GBlockInstance,
  useContentStoryEditorStore,
} from "@/store/contentStoryEditorStore";
import { useStore } from "@/store/customUseStore";
import { Lesson } from "@prisma/client";

const DraftEditorPageContainer = ({
  courseId,
  lessonId,
  lesson,
}: {
  lessonId: number;
  courseId: number;
  lesson: Lesson;
}) => {
  const content = useStore(useContentStoryEditorStore, (state) => state);
  const blocks = content?.lessonsBlocks[lessonId] || []; // Fetch blocks for the current lesson

  const [editContent, setEditContent] = useState("");
  const [autoSave, setAutoSave] = useLocalStorage("autoSave", false);
  // const [blocks, setBlocks] = useState<GBlockType[]>([]);
  const [toolboxDialog, setToolboxDialog] = useState(false);

  const { mutate: saveContentMutation, isLoading } =
    trpc.lessons.editLessonContent.useMutation();

  const handleContentUpdate = (editor: EditorType | undefined) => {
    const json = editor?.getJSON();
    const content = JSON.stringify(json);
    setEditContent(content);
    if (autoSave) {
      saveContentMutation({ lessonId: lessonId, content: content });
    }
  };

  // Функция сохранения контента
  const handleSaveContent = () => {
    saveContentMutation(
      { lessonId: lessonId, content: editContent },
      {
        onSuccess(data, variables, context) {
          toast("Контент сохранен", { icon: <Check></Check> });
        },
      }
    );
  };
  const lessonContent = lesson?.jsonContent ?? "";
  const jsonContent = lessonContent && JSON.parse(lessonContent as any);

  const toggleAutoSave = () => {
    // Переключаем состояние автосохранения
    setAutoSave(!autoSave);
  };
  const handleAddBlock = (tool: GBlock) => {
    const newBlock: GBlockInstance = {
      id: Date.now().toString(),
      content: "",
      type: tool.type,
    }; // Generate a unique ID for the block
    content?.addBlock(lessonId.toString(), newBlock);
    setToolboxDialog(false);
  };

  const handleRemoveblock = (blockId: string) => {
    content?.removeBlock(lessonId.toString(), blockId);
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Skeleton className="h-8 w-32"></Skeleton>
          <Skeleton className="h-[calc(80vh)]"></Skeleton>
        </div>
      }
    >
      <Dialog open={toolboxDialog} onOpenChange={setToolboxDialog}>
        <div className="p-4 mb-[calc(20vh)] container mx-auto max-w-screen-md">
          <DashboardHeader
            heading="Редактирование контента"
            text="Обновление контента урока"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-save-mode"
                  checked={autoSave}
                  onCheckedChange={toggleAutoSave}
                />
                <Label htmlFor="auto-save-mode">Автосохранение</Label>
              </div>

              <Button
                variant={"secondary"}
                onClick={handleSaveContent}
                disabled={isLoading}
              >
                {isLoading ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </DashboardHeader>
          <div className="mt-8"></div>
          {blocks.map((block, index) => {
            return (
              <div key={index}>
                <div className="relative">
                  {blocksList[block.type].component({
                    value: block.content,
                    onValueChange: (value) => {
                      console.log(value);
                      content?.updateBlock(
                        lessonId.toString(),
                        block.id,
                        value
                      );
                    },
                  })}
                  <Button
                    onClick={() => handleRemoveblock(block.id)}
                    variant={"ghost"}
                    className="absolute top-0 -right-14"
                  >
                    <X></X>
                  </Button>
                </div>
                <Separator className="my-8"></Separator>
              </div>
            );
          })}
          <DialogTrigger asChild>
            <Button
              size={"lg"}
              className="w-full text-lg h-auto p-4 mt-8"
              variant={"outline"}
            >
              <Blocks className="mr-2"></Blocks>
              Добавить блок
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Выберите блок</DialogTitle>
              <DialogDescription>
                Выберите блок, который хотите добавить в урок
              </DialogDescription>
            </DialogHeader>
            <ToolboxGrid onToolClick={handleAddBlock}></ToolboxGrid>
          </DialogContent>
        </div>
      </Dialog>
    </Suspense>
  );
};

export default DraftEditorPageContainer;
