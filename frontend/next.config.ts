import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["pow-captcha-module"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
