/** @type {import('next').NextConfig} */
import createWithMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

import fauxRemarkEmbedder from "@remark-embedder/core";
import fauxOembedTransformer from "@remark-embedder/transformer-oembed";
const remarkEmbedder = fauxRemarkEmbedder.default;
const oembedTransformer = fauxOembedTransformer.default;

const withMDX = createWithMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeExternalLinks],
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkEmbedder, { transformers: [oembedTransformer] }],
    ],
  },
});

export default withMDX({
  reactStrictMode: true,
  images: {
    domains: ["gefest.b-cdn.net"],
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.wasm$/,
      use: ["url-loader"],
    });

    return config;
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
