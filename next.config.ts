import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server for the VPS (deploy/vps). Vercel ignores this.
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
