/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,

  images: {
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ['lottie-web'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  poweredByHeader: false,

  async headers() {
    return [
      // ❗ HTML pages: không cache
      {
        source: '/((?!_next/static).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },

      // ✅ Static assets: cache mạnh CHỈ khi production
      // (filenames được content-hash nên safe)
      // Development: no-store để tránh stale JS bundle
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // ✅ Video / images: cache theo môi trường
      {
        source: '/(.*)\\.(mp4|webm|mov|jpg|png|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
