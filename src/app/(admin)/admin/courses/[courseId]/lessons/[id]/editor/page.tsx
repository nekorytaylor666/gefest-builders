import React from "react";
import { Suspense } from "react";
import { serverClient } from "@/app/_trpc/serverClient";

import DraftEditorPageContainer from "../../_components/tiptapEditor";

async function EditLessonPage({
  params,
}: {
  params: { courseId: string; id: string };
}) {
  const courseId = Number(params.courseId);
  const lessonId = Number(params.id);
  const lesson =
    await serverClient.lessons.getLessonByCourseIdAndLessonId.query({
      courseId,
      lessonId,
    });
  if (!lesson) return <div>Lesson not found</div>;
  return (
    <Suspense fallback={null}>
      <DraftEditorPageContainer
        lessonId={lessonId}
        courseId={courseId}
        lesson={lesson}
      />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "auto";

export default EditLessonPage;
