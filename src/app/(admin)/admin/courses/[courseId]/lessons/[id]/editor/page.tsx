import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { serverClient } from "@/app/_trpc/serverClient";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import EditorPageContainer from "../../_components/EditorPageContainer";
import fs from "fs";
const EditorComp = dynamic(() => import("@/components/mdx-editor/MDXEditor"), {
  ssr: false,
});

const markdown = `
# Hello world!
Check the EditorComponent.tsx file for the code .
`;
async function EditLessonPage({
  params,
}: {
  params: { courseId: string; id: string };
}) {
  const { courseId, id: lessonId } = params;
  const lesson = await serverClient.lessons.getLessonByCourseIdAndLessonId({
    courseId: Number(courseId),
    lessonId: Number(lessonId),
  });
  let content;
  if (process.env.NODE_ENV === "development") {
    const path = `src/content/${lesson?.mdxContentPath}`;
    console.log("fetchin locally");
    try {
      content = fs.readFileSync(path, "utf8");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  } else {
    console.log("fetching remotely");
    const response = await fetch(
      `https://gefest.b-cdn.net/${lesson?.mdxContentPath}`
    );
    content = await response.text();
  }

  // const { data, isLoading } =
  //   trpc.lessons.getLessonByCourseIdAndLessonId.useQuery({
  //     courseId: Number(courseId),
  //     lessonId: Number(lessonId),
  //   });

  // const { data: content, isLoading: isContentLoading } = useQuery(
  //   ["content", data?.mdxContentPath],
  //   async () => {
  //     const response = await fetch(
  //       `https://gefest.b-cdn.net/${data?.mdxContentPath}`,
  //       { mode: "no-cors" }
  //     );
  //     console.log(response);
  //     const res = await response.text();
  //     console.log(res);
  //     return res;
  //   },
  //   { enabled: !!data?.courseId }
  // );

  return (
    <>
      <Suspense fallback={null}>
        <EditorPageContainer content={content} />
      </Suspense>
    </>
  );
}

export default EditLessonPage;
