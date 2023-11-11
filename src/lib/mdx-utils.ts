import { UnwrapArray, UnwrapPromise } from "@/types";
import { serialize } from "next-mdx-remote/serialize";
import remarkEmbedder from "@remark-embedder/core";

const LoomTransformer = {
  name: "Loom",
  shouldTransform(url: string) {
    const { host, pathname } = new URL(url);
    return (
      ["www.loom.com", "loom.com"].includes(host) &&
      pathname.includes("/share/")
    );
  },
  getHTML(url: string) {
    const iframeUrl = url.replace("/share/", "/embed/");
    return `<iframe src="${iframeUrl}" class="aspect-video bg-slate-300 rounded-md w-full my-8" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
  },
};

export async function serializeMdxContent(mdxContent: string) {
  const mdxSource = await serialize(mdxContent, {
    mdxOptions: {
      development: process.env.NODE_ENV === "development",

      remarkPlugins: [[remarkEmbedder, { transformers: [LoomTransformer] }]],
    },
  });
  return mdxSource;
}
export async function serializeAllMdxSections(mdxSections: string[]) {
  const serializedSections = await Promise.all(
    mdxSections.map((section) => serializeMdxContent(section))
  );
  return serializedSections;
}
export function divideMarkdown(
  markdownContent: string | undefined,
  delimiter = "+++"
) {
  if (markdownContent === undefined) return [];
  return markdownContent.split(delimiter).map((block) => block.trim());
}

export type MDXContent = UnwrapArray<
  UnwrapPromise<ReturnType<typeof serializeAllMdxSections>>
>;
