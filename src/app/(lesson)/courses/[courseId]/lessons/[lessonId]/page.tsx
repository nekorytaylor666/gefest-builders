import { serverClient } from "@/app/_trpc/serverClient";
import { splitArrayByHorizontalRule } from "./_utils/contentManipulation";
import LessonContainer from "./_components/lessonContainer";
import ExerciseContainer from "./_components/exerciseContainer";

export default async function Page({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const { lessonId } = params;
  const lesson = await serverClient.lessons.getLessonById.query(
    Number(lessonId)
  );
  if (!lesson?.jsonContent) return <div>Нет контента:(</div>;
  const content = JSON.parse(lesson?.jsonContent as string);
  // const contentChunks = splitArrayByHorizontalRule(content);
  // return <LessonContainer content={content} lesson={lesson}></LessonContainer>;
  return <ExerciseContainer></ExerciseContainer>;
}
