"use client";
import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboardHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { trpc } from "@/app/_trpc/client";
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
import {
  GBlockInstance,
  useContentStoryEditorStore,
} from "@/store/contentStoryEditorStore";
import { useStore } from "@/store/customUseStore";
import { Lesson } from "@prisma/client";

const DraftEditorPageContainer = ({
  courseId,
  lessonId,
}: {
  lessonId: number;
  courseId: number;
}) => {
  const content = useStore(useContentStoryEditorStore, (state) => state);
  const blocks = content?.lessonsBlocks[lessonId] || []; // Fetch blocks for the current lesson

  const [toolboxDialog, setToolboxDialog] = useState(false);
  const { isLoading: lessonIsLoading } =
    trpc.lessons.getLessonByCourseIdAndLessonId.useQuery(
      {
        courseId,
        lessonId,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: Infinity,
        onSuccess(lesson) {
          if (!lesson) return;
          content?.setLessonBlocksForLessonId(
            lessonId.toString(),
            JSON.parse(
              (lesson.jsonContent as string) || "[]"
            ) as GBlockInstance[]
          );
        },
      }
    );

  const { mutate: saveContentMutation, isLoading } =
    trpc.lessons.editLessonContent.useMutation();

  const handleSaveContent = () => {
    saveContentMutation(
      { lessonId: lessonId, content: JSON.stringify(blocks) },
      {
        onSuccess(data, variables, context) {
          toast("Контент сохранен", { icon: <Check></Check> });
        },
      }
    );
  };

  const handleAddBlock = (tool: GBlock) => {
    const newBlock: GBlockInstance = {
      id: Date.now().toString(),
      content: "",
      type: tool.type,
    };
    content?.addBlock(lessonId.toString(), newBlock);
    setToolboxDialog(false);
  };

  const handleRemoveblock = (blockId: string) => {
    content?.removeBlock(lessonId.toString(), blockId);
  };

  if (lessonIsLoading)
    return (
      <div className="h-screen">
        <Skeleton className="h-28 w-1/2"></Skeleton>
        <Skeleton className="h-[calc(80vh)] mt-8"></Skeleton>
      </div>
    );
  return (
    <Dialog open={toolboxDialog} onOpenChange={setToolboxDialog}>
      <div className="p-4 mb-[calc(20vh)] ">
        <DashboardHeader
          heading="Редактирование контента"
          text="Обновление контента урока"
        >
          <div className="flex items-center gap-4">
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
        <div className="container max-w-screen-2xl">
          {blocks?.map((block, index) => {
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
        </div>
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
  );
};

export default DraftEditorPageContainer;
