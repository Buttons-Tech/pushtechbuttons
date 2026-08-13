import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**', // This allows all images from their CDN
      },
      {
        protocol: 'https',
        hostname: 'fakerestaurantapi.runasp.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'kitchen-server-d763.onrender.com',
      },
    ],
  },
  // ... your other config like the metadataBase we added earlier
};

export default nextConfig;
