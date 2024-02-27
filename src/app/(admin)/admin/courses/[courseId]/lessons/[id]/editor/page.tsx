import React from "react";
import { Suspense } from "react";
import { serverClient } from "@/app/_trpc/serverClient";

import DraftEditorPageContainer from "../../_components/lessonEditor";

async function EditLessonPage({
  params,
}: {
  params: { courseId: string; id: string };
}) {
  const courseId = Number(params.courseId);
  const lessonId = Number(params.id);

  return <DraftEditorPageContainer lessonId={lessonId} courseId={courseId} />;
}

export const dynamic = "force-dynamic";
export const fetchCache = "auto";

export default EditLessonPage;
