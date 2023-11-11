/** @type {import('next').NextConfig} */
import createWithMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
const withMDX = createWithMDX({
  extension: /\.mdx?$/,
  options: {},
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
