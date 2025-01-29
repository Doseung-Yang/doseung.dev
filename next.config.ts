/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
