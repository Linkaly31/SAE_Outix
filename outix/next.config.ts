import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/accueil",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;