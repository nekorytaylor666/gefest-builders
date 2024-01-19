import { Sheet } from "@/components/ui/sheet";

import { trpc } from "@/app/_trpc/client";

import { serverClient } from "@/app/_trpc/serverClient";
import CommentsSection from "./_components/commentsSection";
import { Separator } from "@/components/ui/separator";
import {
  splitArrayByHorizontalRule,
  wrapChunkOfContent,
} from "./_utils/contentManipulation";
import LessonContent from "./_components/lessonsContent";

export default async function Page({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const { courseId, lessonId } = params;
  const lesson = await serverClient.lessons.getLessonById(Number(lessonId));
  if (!lesson?.jsonContent) return <div>Нет контента:(</div>;
  const content = JSON.parse(lesson?.jsonContent as string);
  const contentChunks = splitArrayByHorizontalRule(content);
  console.log("content chunk", contentChunks[0]);

  return <LessonContent chunks={contentChunks}></LessonContent>;
}
