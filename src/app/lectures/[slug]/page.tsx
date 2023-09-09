import LectureContent from "@/components/lecture-content";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const source = await fs.readFile(
    path.join(process.cwd(), "src/content", (slug + ".mdx") as string),
    "utf8"
  );
  const resMatter = matter(source);
  return (
    <main className="p-4">
      <LectureContent {...resMatter}></LectureContent>
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
