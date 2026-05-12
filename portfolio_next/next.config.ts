import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khaledmuhmmed99.pythonanywhere.com",
        pathname: "/media/**",
      },
      // Common CDNs for skill icons
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
    // Allow any external URL for images (permissive for a portfolio)
    unoptimized: false,
  },
};

export default nextConfig;
