import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@auth0/nextjs-auth0";
import { db } from "@/lib/db";
import { serverClient } from "@/app/_trpc/serverClient";

const HOSTNAME = "se.storage.bunnycdn.com";
const STORAGE_ZONE_NAME = "gefest-storage";
const ACCESS_KEY = "6c24261a-31e4-4b9b-b0aeeeae4525-3ed8-4307";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; homeworkId: string } }
) {
  const homeworkId = Number(params.homeworkId);
  const courseId = Number(params.courseId);
  const data = await request.formData();
  const file = data.get("file");
  const homework =
    await serverClient.homework.getHomeworkByCourseIdAndHomeworkId({
      courseId,
      homeworkId,
    });
  if (!homework)
    return NextResponse.json({
      success: false,
      error: "Not valid lesson, change courseid or lessonid",
    });

  if (!file)
    return NextResponse.json({ success: false, error: "No file provided" });

  const path = `${homework.course.slug}/homeworks/${
    homework.id
  }/${"content.mdx"}`;

  const url = `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/${path}`;

  const config = {
    method: "PUT",

    headers: {
      AccessKey: ACCESS_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: file,
  };

  const response = await fetch(url, config);
  const body = await response.json();

  // const updatedHomework = await serverClient.homework.editHomeworkSubmission({
  //   homeworkId,
  //   data: {
  //     mdxContentPath: path,
  //   },
  // });
  if (!response.ok) {
    return NextResponse.json({ success: false, error: response.statusText });
  }

  return NextResponse.json({ success: true });
}
