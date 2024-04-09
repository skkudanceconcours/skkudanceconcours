/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_ADMIN_PW: process.env.NEXT_ADMIN_PW,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
