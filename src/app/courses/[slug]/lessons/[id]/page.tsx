import LectureContent from "@/components/lecture-content";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { divideMarkdown, serializeAllMdxSections } from "@/lib/mdx-utils";
import { serverClient } from "@/app/_trpc/serverClient";

export default async function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;
  const response = await fetch(
    `https://gefest.b-cdn.net/${slug}/lessons/${id}/content.mdx`
  );
  const content = await response.text();

  const mdxSections = divideMarkdown(content);

  const resMatter = await matter(content);

  const serializedSections = await serializeAllMdxSections(mdxSections);

  return (
    <main>
      <LectureContent
        courseSlug={slug}
        lessonId={parseInt(id)}
        {...resMatter}
        serializedMdxSections={serializedSections}
      ></LectureContent>
    </main>
  );
}

// export async function generateStaticParams() {
//   const courses = await serverClient.courses.listCourses();

//   const contentPaths = new Map<string, { lessonId: number[] }>();
//   for (const course of courses) {
//     const lessonIds = course.lessons.map((lesson) => lesson.id);
//     contentPaths.set(course.slug, { lessonId: lessonIds });
//   }
//   const contentPathsArray = Array.from(contentPaths.entries());
//   const contentPathsCombinations = contentPathsArray.flatMap(
//     ([slug, { lessonId }]) =>
//       lessonId.map((id) => `/${slug}/lessons/${id}/content.mdx`)
//   );
//   return contentPathsCombinations;
// }
