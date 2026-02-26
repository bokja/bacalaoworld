import type { MetadataRoute } from "next";

const PRODUCTION_HOST = "bacalaoworld.no";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `https://${PRODUCTION_HOST}/sitemap.xml`,
    host: `https://${PRODUCTION_HOST}`,
  };
}
