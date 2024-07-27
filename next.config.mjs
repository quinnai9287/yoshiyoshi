/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: false,
    assetPrefix: process.env.DEV ? '' : '/yoshiyoshi',
};

export default nextConfig;
