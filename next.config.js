/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: ["image/avif", "image/webp"],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
