import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Mengizinkan gambar dari semua domain (untuk dev)
      },
    ],
  },
};

export default nextConfig;