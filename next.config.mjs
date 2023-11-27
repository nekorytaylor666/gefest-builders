/** @type {import('next').NextConfig} */
import createWithMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import { remarkCodeHike } from "@code-hike/mdx";

const withMDX = createWithMDX({
  extension: /\.mdx?$/,
  options: {},
});

export default withMDX({
  reactStrictMode: true,
  images: {
    domains: ["gefest.b-cdn.net"],
  },

  future: {
    webpack5: true,
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.wasm$/,
      use: ["url-loader"],
    });
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
