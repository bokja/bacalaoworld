/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async headers() {
    const isProduction = process.env.VERCEL_ENV === "production";
    return [
      ...(!isProduction
        ? [
            {
              source: "/:path*",
              headers: [
                { key: "X-Robots-Tag", value: "noindex, nofollow" },
              ],
            },
          ]
        : []),
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bacalaoworld.no" }],
        destination: "https://bacalaoworld.no/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
