import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match any requests starting with /api
        destination: "http://localhost:5500/api/:path*", // Proxy to the backend
      },
    ];
  },
};

export default nextConfig;
