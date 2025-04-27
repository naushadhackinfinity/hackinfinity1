/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn1.genspark.ai'],
    unoptimized: true, // Required for Netlify deployment
  },
  reactStrictMode: true,
  swcMinify: true,

  // Optimize for Netlify deployment
  output: 'standalone',

  // Enable trailing slash for better compatibility
  trailingSlash: true,

  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
