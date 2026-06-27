export type PropertyStatus = "Available" | "Few Plots Left" | "Sold Out";

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  type: string;
  priceLabel: string;
  priceFrom: number;
  sizeLabel: string;
  status: PropertyStatus;
  image?: string;
  highlights: string[];
  appreciation: string;
  gallery?: string[];
  overview?: string[];
  amenities?: string[];
  locationHighlights?: string[];
  mapUrl?: string;
  youtubeUrl?: string;
  seo?: Seo;
};

export type ContactInfo = {
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  instagramUrl?: string;
  hours?: string;
};

export type SiteSettings = {
  title?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  approvals?: string[];
  contact?: ContactInfo;
};

export type Cta = {
  label?: string;
  href?: string;
};

export type HeroContent = {
  kicker?: string;
  headline?: string;
  highlightWord?: string;
  subheadline?: string;
  backgroundImage?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  stats?: { value: string; label: string }[];
};

export type FounderData = {
  name: string;
  role?: string;
  portrait?: string;
  kicker?: string;
  heading?: string;
  paragraphs?: string[];
  pullQuote?: string;
  signatureQuote?: string;
  credentials?: { stat: string; label: string }[];
};

export type TestimonialItem = {
  id: string;
  name: string;
  role?: string;
  quote: string;
  rating?: number;
  featured?: boolean;
  photo?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};
