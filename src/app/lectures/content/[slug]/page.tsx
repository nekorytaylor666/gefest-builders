import LectureContent from "@/components/lecture-content";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { divideMarkdown, serializeAllMdxSections } from "@/lib/mdx-utils";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const content = await fs.readFile(
    path.join(
      process.cwd(),
      "src/content/chatgpt-course/lectures/1",
      (slug + ".mdx") as string
    ),
    "utf8"
  );

  const mdxSections = divideMarkdown(content);

  const resMatter = await matter(content);

  const serializedSections = await serializeAllMdxSections(mdxSections);

  return (
    <main className="p-4">
      <LectureContent
        {...resMatter}
        serializedMdxSections={serializedSections}
      ></LectureContent>
    </main>
  );
}

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), "src/content");
  const filenames = await fs.readdir(contentDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}
// export async function getStaticProps() {
//   // MDX text - can be from a local file, database, anywhere
//   // fetch md file from src/content/lectures/slug.mdx

//   const mdxSource = await serialize(source);
//   return { props: { source: mdxSource } };
// }
