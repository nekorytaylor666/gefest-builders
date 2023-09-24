/** @type {import('next').NextConfig} */
import createWithMDX from "@next/mdx";
const withMDX = createWithMDX({
  extension: /\.mdx?$/,
});

export default withMDX({
  reactStrictMode: true,
  images: {
    domains: ["gefest.b-cdn.net"],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
