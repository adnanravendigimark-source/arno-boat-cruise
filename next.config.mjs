/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    // Next only serves WebP by default — AVIF is typically 20-30% smaller
    // than WebP for photographic tour/hero images, and next/image will
    // automatically fall back to WebP/original for browsers that don't
    // support AVIF. Free win on image payload with no visual change.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
