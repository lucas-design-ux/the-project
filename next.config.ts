import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Production: Strapi API via Cloudflare proxy
      {
        protocol: "https",
        hostname: "api.wealthlogik.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Dev-only: local Strapi
      ...(isDev
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**",
            },
          ]
        : []),
    ],
    minimumCacheTTL: 31536000, // 1 year for images
    ...(isDev ? { dangerouslyAllowLocalIP: true } : {}),
  },

  async headers() {
    return [
      // Cache static images aggressively
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

