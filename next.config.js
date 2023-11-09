/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   eslint: {
      ignoreDuringBuilds: true,
   },
   images: {
      domains: ["res.cloudinary.com"],
   },
   swcMinify: true,
};

module.exports = nextConfig;
