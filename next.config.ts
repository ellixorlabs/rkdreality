import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All remote images are optimised through the wsrv.nl CDN.
    // See src/lib/image-loader.ts
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
