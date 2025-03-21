/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_PUBLIC_ADMIN_PW: process.env.NEXT_PUBLIC_ADMIN_PW,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
              { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ]
        }
      ]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://www.skkudanceconcours.kr/:path*`,
      },
    ];
  },
};

export default nextConfig;
