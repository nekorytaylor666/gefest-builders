import React from "react";
import { Suspense } from "react";
import { serverClient } from "@/app/_trpc/serverClient";

import EditorPageContainer from "../../_components/lessonEditor";
import fs from "fs";

import { APP_CONFIG } from "@/lib/config";

async function EditLessonPage({
  params,
}: {
  params: { courseId: string; id: string };
}) {
  const courseId = Number(params.courseId);
  const lessonId = Number(params.id);
  const lesson = await serverClient.lessons.getLessonByCourseIdAndLessonId({
    courseId,
    lessonId,
  });
  let content;
  if (APP_CONFIG.FETCH_LOCALLY) {
    const path = `src/content/${lesson?.mdxContentPath}`;
    console.log("fetchin locally");
    try {
      content = fs.readFileSync(path, "utf8");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  } else {
    const path = `https://gefest.b-cdn.net/${lesson?.mdxContentPath}`;

    console.log("fetching remotely", path);

    const response = await fetch(path);

    content = await response.text();
  }

  return (
    <Suspense fallback={null}>
      <EditorPageContainer
        lessonId={lessonId}
        courseId={courseId}
        initialContent={content}
      />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "auto";

export default EditLessonPage;
