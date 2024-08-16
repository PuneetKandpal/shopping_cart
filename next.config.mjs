/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: process.env.NEXT_IMAGE_DOMAINS.split("+"),
  },
};

export default nextConfig;
