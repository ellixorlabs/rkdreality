import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app so the sibling monorepo package.json
  // (../package.json) doesn't get picked up as the file-tracing root.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // All remote images are optimised through the wsrv.nl CDN.
    // See src/lib/image-loader.ts
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
