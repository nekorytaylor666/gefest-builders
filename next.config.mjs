/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["gefest.b-cdn.net"],
  },

  future: {
    webpack5: true,
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.riv$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });

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
};

export default config;
