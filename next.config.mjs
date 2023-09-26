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

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.wasm$/,
      use: ["url-loader"],
    });

    return config;
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
