import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/mdx";

const baseUrl = "https://bacalaoworld.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/oppskrifter/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikler/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const recipes = getAllContent("oppskrifter").map((r) => ({
    url: `${baseUrl}/oppskrifter/${r.slug}/`,
    lastModified: new Date(r.updatedDate || r.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articles = getAllContent("artikler").map((a) => ({
    url: `${baseUrl}/artikler/${a.slug}/`,
    lastModified: new Date(a.updatedDate || a.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...recipes, ...articles];
}
