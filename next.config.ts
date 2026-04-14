import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// Começamos com a configuração de produção, sem nada local.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Somente as URLs de produção permitidas
      {
        protocol: "https",
        hostname: "api.wealthlogik.com",
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
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 31536000, // 1 year
  },

  async headers() {
    return [
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

// A MÁGICA: Se estivermos no ambiente de desenvolvimento local, injetamos as regras perigosas.
if (process.env.NODE_ENV === 'development') {
  if (nextConfig.images) {
    nextConfig.images.remotePatterns?.push({
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    });
    nextConfig.images.dangerouslyAllowLocalIP = true;
  }
}

export default withBundle_analyzer(nextConfig);
