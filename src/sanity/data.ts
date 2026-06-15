import "server-only";

import { client } from "./client";
import type {
  Property,
  PropertyStatus,
  SiteSettings,
  HeroContent,
  FounderData,
  TestimonialItem,
  FaqItem,
} from "./types";

type RawProperty = {
  _id: string;
  title: string;
  location: string;
  city: string;
  propertyType: string;
  priceLabel: string;
  priceFrom?: number;
  sizeLabel?: string;
  status: PropertyStatus;
  image: string;
  gallery?: string[];
  highlights?: string[];
  appreciation?: string;
};

export async function getProperties(): Promise<Property[]> {
  const docs = await client.fetch<RawProperty[]>(
    `*[_type == "property"] | order(coalesce(order, 999) asc, _createdAt desc){
      _id, title, location, city, propertyType, priceLabel, priceFrom,
      sizeLabel, status, image, gallery, highlights, appreciation
    }`
  );

  return (docs ?? []).map((d) => ({
    id: d._id,
    title: d.title,
    location: d.location,
    city: d.city,
    type: d.propertyType,
    priceLabel: d.priceLabel,
    priceFrom: d.priceFrom ?? 0,
    sizeLabel: d.sizeLabel ?? "",
    status: d.status,
    image: d.image,
    highlights: d.highlights ?? [],
    appreciation: d.appreciation ?? "",
    gallery: d.gallery?.length ? d.gallery : undefined,
  }));
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]{
      title, tagline, description, logo, approvals, contact
    }`
  );
}

export async function getHero(): Promise<HeroContent | null> {
  return client.fetch<HeroContent | null>(
    `*[_type == "hero" && _id == "hero"][0]{
      kicker, headline, highlightWord, subheadline, backgroundImage,
      primaryCta, secondaryCta, stats[]{value, label}
    }`
  );
}

export async function getFounder(): Promise<FounderData | null> {
  return client.fetch<FounderData | null>(
    `*[_type == "founder" && _id == "founder"][0]{
      name, role, portrait, kicker, heading, paragraphs,
      pullQuote, signatureQuote, credentials[]{stat, label}
    }`
  );
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const docs = await client.fetch<TestimonialItem[]>(
    `*[_type == "testimonial"] | order(coalesce(order, 999) asc, _createdAt desc){
      "id": _id, name, role, quote, rating, featured, photo
    }`
  );
  return docs ?? [];
}

export async function getFaqs(): Promise<FaqItem[]> {
  const docs = await client.fetch<FaqItem[]>(
    `*[_type == "faq"] | order(coalesce(order, 999) asc, _createdAt asc){
      "id": _id, question, answer, category
    }`
  );
  return docs ?? [];
}
