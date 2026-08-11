import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/sanity/data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let properties: Awaited<ReturnType<typeof getSitemapEntries>> = [];

  try {
    properties = await getSitemapEntries();
  } catch (error) {
    console.error("Sitemap property fetch failed:", error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((entry) => ({
    url: `${SITE_URL}/property/${entry.slug}`,
    lastModified: entry.updatedAt ? new Date(entry.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
