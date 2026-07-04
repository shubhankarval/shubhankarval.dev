import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    github: {
      stale: 3600, // 1 hour
      revalidate: 3600, // 1 day
      expire: 86400, // 1 day
    },
  },
};

export default nextConfig;
