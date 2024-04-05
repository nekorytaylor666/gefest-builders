import { serverClient } from "@/app/_trpc/serverClient";
import { splitArrayByHorizontalRule } from "./_utils/contentManipulation";
import LessonContainer from "./_components/lessonContainer";
import ExerciseContainer from "./_components/exerciseContainer";
import { AI, createSubmitUserMessage } from "./action";
import { createAI } from "ai/rsc";

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
  const lessonContent = JSON.parse(lesson?.jsonContent as string);
  // const contentChunks = splitArrayByHorizontalRule(content);
  const content = lessonContent
    .filter((field: any) => field.type === "text")
    .map((field: any) => field.content)
    .join(" ");
  const AI = createAI({
    actions: {
      submitUserMessage: createSubmitUserMessage(content),
    },
    // Each state can be any shape of object, but for chat applications
    // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
    initialUIState: [],
    initialAIState: [
      {
        role: "system",
        content: `Ты учитель программирования. Помогаешь ученикам с HTML, CSS, Javascript. Ты помогаешь студенту понять этот урок: ${content}`,
      },
    ],
  });

  return (
    <AI>
      <LessonContainer
        content={lessonContent}
        lesson={lesson}
      ></LessonContainer>
    </AI>
  );
  // return <ExerciseContainer></ExerciseContainer>;
}
