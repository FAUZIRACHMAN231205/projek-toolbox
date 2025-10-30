import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    // allow external placeholder images used in the dashboard (avatars)
    domains: ["placehold.co"],
  },
};

export default nextConfig;
