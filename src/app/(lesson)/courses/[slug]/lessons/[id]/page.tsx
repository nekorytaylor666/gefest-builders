import LectureContent from "@/components/lecture-content";
import { divideMarkdown, serializeAllMdxSections } from "@/lib/mdx-utils";
import { serverClient } from "@/app/_trpc/serverClient";
import fs from "fs";

export default async function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;
  const course = await serverClient.courses.getCourseBySlug(slug);
  let content;
  if (process.env.NODE_ENV === "development") {
    const path = `src/content/${slug}/lessons/${id}/content.mdx`;
    try {
      content = fs.readFileSync(path, "utf8");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  } else {
    const response = await fetch(
      `https://gefest.b-cdn.net/${slug}/lessons/${id}/content.mdx`
    );
    content = await response.text();
  }
  console.log(content);

  const mdxSections = divideMarkdown(content);

  const serializedSections = await serializeAllMdxSections(mdxSections);

  return (
    <main>
      <LectureContent
        course={course}
        lessonId={parseInt(id)}
        serializedMdxSections={serializedSections}
      ></LectureContent>
    </main>
  );
}

export async function generateStaticParams() {
  const courses = await serverClient.courses.listCourses();

  const contentPaths = new Map<string, { lessonId: number[] }>();
  for (const course of courses) {
    const lessonIds = course.lessons.map((lesson) => lesson.order);
    contentPaths.set(course.slug, { lessonId: lessonIds });
  }
  const contentPathsArray = Array.from(contentPaths.entries());
  const contentPathsCombinations = contentPathsArray.flatMap(
    ([slug, { lessonId }]) => {
      return lessonId.map((id) => ({ slug, id: String(id) }));
    }
  );

  return contentPathsCombinations;
}
