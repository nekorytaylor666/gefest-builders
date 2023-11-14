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
    await serverClient.homework.getHomeworkByCourseIdAndHomeworkId({
      courseId,
      homeworkId,
    });
  let content;
  if (APP_CONFIG.FETCH_LOCALLY) {
    const path = `src/content/${homework?.mdxContentPath}`;
    console.log("fetchin locally");
    try {
      content = fs.readFileSync(path, "utf8");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  } else {
    const path = `https://gefest.b-cdn.net/${homework?.mdxContentPath}`;

    console.log("fetching remotely", path);

    const response = await fetch(path);
    content = await response.text();
  }

  return (
    <Suspense fallback={null}>
      <HomeworkEditor
        homeworkId={homeworkId}
        courseId={courseId}
        initialContent={content}
      />
    </Suspense>
  );
}

export default EditHomeworkPage;
