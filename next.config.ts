/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
