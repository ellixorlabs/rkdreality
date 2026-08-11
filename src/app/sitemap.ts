import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/sanity/data";
import { SITE_URL } from "@/lib/site";
import {
  collectYoutubeUrls,
  youtubeEmbed,
  youtubeThumbnail,
} from "@/lib/youtube";

export const revalidate = 300;

function sitemapVideos(
  entry: Awaited<ReturnType<typeof getSitemapEntries>>[number]
): MetadataRoute.Sitemap[number]["videos"] {
  const urls = collectYoutubeUrls(entry.youtubeUrls, entry.youtubeUrl);
  const title = entry.title || "Property video";
  const description =
    entry.description ||
    [entry.title, entry.location, entry.city, entry.priceLabel]
      .filter(Boolean)
      .join(" · ") ||
    "Walkthrough of this RKD Reality property.";

  return urls.flatMap((url, index) => {
    const player = youtubeEmbed(url);
    const thumb = youtubeThumbnail(url);
    if (!player || !thumb) return [];
    return [
      {
        title: urls.length > 1 ? `${title} - video ${index + 1}` : title,
        description,
        thumbnail_loc: thumb,
        player_loc: player,
        family_friendly: "yes" as const,
        live: "no" as const,
        requires_subscription: "no" as const,
      },
    ];
  });
}

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

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((entry) => {
    const videos = sitemapVideos(entry);
    return {
      url: `${SITE_URL}/property/${entry.slug}`,
      lastModified: entry.updatedAt ? new Date(entry.updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.8,
      ...(videos?.length ? { videos } : {}),
    };
  });

  return [...staticRoutes, ...propertyRoutes];
}
