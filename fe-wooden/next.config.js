/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        outputStandalone: true,
        output: 'standalone',
    },
    reactProductionProfiling: true,
    images: {
        domains: ['storage.yandexcloud.net'],
    },
};

module.exports = nextConfig;
