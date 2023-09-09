import { UnwrapArray, UnwrapPromise } from "@/types";
import { serialize } from "next-mdx-remote/serialize";

export async function serializeMdxContent(mdxContent: string) {
  const mdxSource = await serialize(mdxContent);
  return mdxSource;
}
export async function serializeAllMdxSections(mdxSections: string[]) {
  const serializedSections = await Promise.all(
    mdxSections.map((section) => serializeMdxContent(section))
  );
  return serializedSections;
}
export function divideMarkdown(markdownContent: string, delimiter = "---") {
  return markdownContent.split(delimiter).map((block) => block.trim());
}

export type MDXSection = UnwrapArray<
  UnwrapPromise<ReturnType<typeof serializeAllMdxSections>>
>;
