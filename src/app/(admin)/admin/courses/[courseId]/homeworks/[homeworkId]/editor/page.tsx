import React from "react";
import { Suspense } from "react";
import { serverClient } from "@/app/_trpc/serverClient";

import fs from "fs";

import { APP_CONFIG } from "@/lib/config";
import HomeworkEditor from "../../_components/homeworkEditor";

async function EditHomeworkPage({
  params,
}: {
  params: { courseId: string; homeworkId: string };
}) {
  const courseId = Number(params.courseId);
  const homeworkId = Number(params.homeworkId);
  const homework =
    await serverClient.homework.getHomeworkByCourseIdAndHomeworkId.query({
      courseId,
      homeworkId,
    });
  const homeworkContent = homework?.jsonContent ?? "";
  const jsonContent = homeworkContent && JSON.parse(homeworkContent as any);
  return (
    <Suspense fallback={null}>
      <HomeworkEditor
        homeworkId={homeworkId}
        courseId={courseId}
        initialContent={jsonContent}
      />
    </Suspense>
  );
}

export default EditHomeworkPage;
