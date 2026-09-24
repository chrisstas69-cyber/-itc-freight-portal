import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin root to this app so the parent ~/package-lock.json does not confuse Next.js
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      { source: "/login", destination: "/contact", permanent: false },
      { source: "/portal", destination: "/contact", permanent: false },
      { source: "/portal/:path*", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
