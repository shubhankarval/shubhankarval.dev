import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  async rewrites() {
    return [
      {
        source: '/analytics.js',
        destination: 'https://umami.shubhankarval.dev/script.js',
      },
      {
        source: '/api/send',
        destination: 'https://umami.shubhankarval.dev/api/send',
      },
    ];
  },
};

export default nextConfig;
