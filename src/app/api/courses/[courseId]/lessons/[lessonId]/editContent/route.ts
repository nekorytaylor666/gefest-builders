import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { serverClient } from "@/app/_trpc/serverClient";
import { APP_CONFIG } from "@/lib/config";

const HOSTNAME = "se.storage.bunnycdn.com";
const STORAGE_ZONE_NAME = "gefest-storage";
const ACCESS_KEY = "6c24261a-31e4-4b9b-b0aeeeae4525-3ed8-4307";

const BUNNY_NET_API =
  "81799771-f31f-4b31-8439-7279f87439c1546ea125-0f7e-4ed1-97d2-6fa53a17c764";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  const lessonId = Number(params.lessonId);
  const courseId = Number(params.courseId);
  const data = await request.formData();
  const file = data.get("file");
  const lesson = await serverClient.lessons.getLessonByCourseIdAndLessonId({
    courseId,
    lessonId,
  });
  if (!lesson)
    return NextResponse.json({
      success: false,
      error: "Not valid lesson, change courseid or lessonid",
    });

  if (!file)
    return NextResponse.json({ success: false, error: "No file provided" });

  const path = `${lesson.course.slug}/lessons/${lesson.order}/${"content.mdx"}`;

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

  const updatedLesson = await serverClient.lessons.editLessonByLessonId({
    lessonId,
    data: {
      mdxContentPath: path,
    },
  });
  const purgeRes = await purge(path);
  console.log(purgeRes);

  if (!response.ok) {
    return NextResponse.json({ success: false, error: response.statusText });
  }

  return NextResponse.json({ success: true, updatedLesson });
}

async function purge(filepath: string) {
  const PULL_ZONE = APP_CONFIG.CDN_PULL_ZONE;
  const url = PULL_ZONE + filepath;

  const purgeUrl = `https://api.bunny.net/purge?url=${encodeURIComponent(
    url
  )}&async=false`;

  const options = {
    method: "POST",
    headers: {
      AccessKey: BUNNY_NET_API,
    },
  };

  try {
    const response = await fetch(purgeUrl, options);
    const data = response.body;
    console.log("purged:", filepath, data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
