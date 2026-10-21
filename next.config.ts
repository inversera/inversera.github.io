import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // Required for next/image when exporting without a Next.js server.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
