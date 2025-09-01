import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
  images: {
    remotePatterns: [new URL('http://127.0.0.1:7200/**')],
  },
}

export default nextConfig;
