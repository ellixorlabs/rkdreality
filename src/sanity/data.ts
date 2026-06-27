import "server-only";

import { client } from "./client";
import type {
  Property,
  PropertyStatus,
  Seo,
  SiteSettings,
  HeroContent,
  FounderData,
  TestimonialItem,
  FaqItem,
} from "./types";

type RawProperty = {
  _id: string;
  slug?: string;
  title: string;
  location: string;
  city: string;
  propertyType: string;
  priceLabel: string;
  priceFrom?: number;
  sizeLabel?: string;
  status: PropertyStatus;
  image?: string;
  gallery?: string[];
  highlights?: string[];
  appreciation?: string;
  overview?: string[];
  amenities?: string[];
  locationHighlights?: string[];
  mapUrl?: string;
  youtubeUrl?: string;
  seo?: Seo;
};

function mapProperty(d: RawProperty): Property {
  return {
    id: d._id,
    slug: d.slug ?? "",
    title: d.title,
    location: d.location,
    city: d.city,
    type: d.propertyType,
    priceLabel: d.priceLabel,
    priceFrom: d.priceFrom ?? 0,
    sizeLabel: d.sizeLabel ?? "",
    status: d.status,
    image: d.image || undefined,
    highlights: d.highlights ?? [],
    appreciation: d.appreciation ?? "",
    gallery: d.gallery?.length ? d.gallery : undefined,
    overview: d.overview?.length ? d.overview : undefined,
    amenities: d.amenities?.length ? d.amenities : undefined,
    locationHighlights: d.locationHighlights?.length
      ? d.locationHighlights
      : undefined,
    mapUrl: d.mapUrl || undefined,
    youtubeUrl: d.youtubeUrl || undefined,
    seo: d.seo,
  };
}

export async function getProperties(): Promise<Property[]> {
  const docs = await client.fetch<RawProperty[]>(
    `*[_type == "property"] | order(coalesce(order, 999) asc, _createdAt desc){
      _id, "slug": slug.current, title, location, city, propertyType, priceLabel,
      priceFrom, sizeLabel, status, image, gallery, highlights, appreciation
    }`,
    {},
    { next: { tags: ["property"] } }
  );

  return (docs ?? []).map(mapProperty);
}

export async function getProperty(slug: string): Promise<Property | null> {
  const d = await client.fetch<RawProperty | null>(
    `*[_type == "property" && slug.current == $slug][0]{
      _id, "slug": slug.current, title, location, city, propertyType, priceLabel,
      priceFrom, sizeLabel, status, image, gallery, highlights, appreciation,
      overview, amenities, locationHighlights, mapUrl, youtubeUrl,
      seo{metaTitle, metaDescription, keywords, ogImage, noIndex}
    }`,
    { slug },
    { next: { tags: ["property"] } }
  );

  return d ? mapProperty(d) : null;
}

export async function getPropertySlugs(): Promise<string[]> {
  const slugs = await client.fetch<string[]>(
    `*[_type == "property" && defined(slug.current)].slug.current`,
    {},
    { next: { tags: ["property"] } }
  );
  return slugs ?? [];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]{
      title, tagline, description, logo, approvals, contact
    }`,
    {},
    { next: { tags: ["siteSettings"] } }
  );
}

export async function getHero(): Promise<HeroContent | null> {
  return client.fetch<HeroContent | null>(
    `*[_type == "hero" && _id == "hero"][0]{
      kicker, headline, highlightWord, subheadline, backgroundImage,
      primaryCta, secondaryCta, stats[]{value, label}
    }`,
    {},
    { next: { tags: ["hero"] } }
  );
}

export async function getFounder(): Promise<FounderData | null> {
  return client.fetch<FounderData | null>(
    `*[_type == "founder" && _id == "founder"][0]{
      name, role, portrait, kicker, heading, paragraphs,
      pullQuote, signatureQuote, credentials[]{stat, label}
    }`,
    {},
    { next: { tags: ["founder"] } }
  );
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const docs = await client.fetch<TestimonialItem[]>(
    `*[_type == "testimonial"] | order(coalesce(order, 999) asc, _createdAt desc){
      "id": _id, name, role, quote, rating, featured, photo
    }`,
    {},
    { next: { tags: ["testimonial"] } }
  );
  return docs ?? [];
}

export async function getFaqs(): Promise<FaqItem[]> {
  const docs = await client.fetch<FaqItem[]>(
    `*[_type == "faq"] | order(coalesce(order, 999) asc, _createdAt asc){
      "id": _id, question, answer, category
    }`,
    {},
    { next: { tags: ["faq"] } }
  );
  return docs ?? [];
}
