import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**', // This allows all images from their CDN
      },
    ],
  },
  // ... your other config like the metadataBase we added earlier
};

export default nextConfig;
