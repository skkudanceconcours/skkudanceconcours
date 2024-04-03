/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_ADMIN_PW: process.env.NEXT_ADMIN_PW,
  },
};

export default nextConfig;
