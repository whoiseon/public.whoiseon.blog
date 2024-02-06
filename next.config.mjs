/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['static.toss.im', 'lh3.googleusercontent.com', 'imslow.me'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    }
  }
};

export default nextConfig;
