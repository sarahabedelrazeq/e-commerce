/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["i.ibb.co", "images.pexels.com", "fakestoreapi.com"],
  },
};

module.exports = nextConfig;
