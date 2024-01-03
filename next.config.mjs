// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "source.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "assets.tina.io",
            },
        ],
    },
};

export default withPlaiceholder(nextConfig);