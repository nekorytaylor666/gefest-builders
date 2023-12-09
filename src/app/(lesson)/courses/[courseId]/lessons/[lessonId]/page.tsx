"use client";

import { Sheet } from "@/components/ui/sheet";

import { trpc } from "@/app/_trpc/client";

import Editor from "@/components/editor";
import LectureNavbar from "@/components/lecture-navbar";

export default function Page({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const { courseId, lessonId } = params;
  const [lesson] = trpc.lessons.getLessonById.useSuspenseQuery(
    Number(lessonId)
  );
  return (
    <Sheet>
      <main className="">
        <LectureNavbar progress={50}></LectureNavbar>
        <Editor
          className="container mt-20 mx-auto"
          defaultValue={
            lesson?.jsonContent
              ? JSON.parse(lesson?.jsonContent as string)
              : null
          }
          readonly={true}
        ></Editor>
        {/* <div className="container mt-20">
          <div
            className="prose mx-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div> */}
        {/* <Editor
          defaultValue={lesson?.jsonContent}
          onDebouncedUpdate={(editor) => {
            const json = editor?.getJSON();
            const content = JSON.stringify(json);
            saveContentMutation.mutate({ lessonId: lessonId, content });
          }}
        ></Editor> */}
        {/* <LectureContent
          course={course}
          lessonId={parseInt(id)}
          serializedMdxSections={serializedSections}
        ></LectureContent> */}

        {/* <SheetTrigger className="sticky bottom-4 left-4">
          <Button className="w-16 h-16" variant={"outline"} size={"icon"}>
            <ChatBubbleIcon className="w-8 h-8"></ChatBubbleIcon>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] lg:w-1/2 max-w-screen-2xl">
          <SheetHeader>
            <SheetTitle>Ваш Гефест ассистент</SheetTitle>
          </SheetHeader>

          <Suspense
            fallback={
              <Skeleton className="w-full h-[800px] rounded-md"></Skeleton>
            }
          >
            <AssistantChat></AssistantChat>
          </Suspense>
        </SheetContent> */}
      </main>
    </Sheet>
  );
}
