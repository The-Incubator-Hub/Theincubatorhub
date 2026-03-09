/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Allow server-side file system operations
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs', '@prisma/client'],
  },
};

export default nextConfig;
