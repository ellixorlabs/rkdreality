import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  IndianRupee,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Ruler,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { SiteGallery } from "@/components/site/site-gallery";
import { Reveal } from "@/components/motion/reveal";
import {
  getProperty,
  getPropertySlugs,
  getSiteSettings,
} from "@/sanity/data";

export const revalidate = 0;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) return { title: "Property not found — RKD Reality" };

  const title = p.seo?.metaTitle || `${p.title}, ${p.city} — RKD Reality`;
  const description =
    p.seo?.metaDescription ||
    `${p.title} in ${p.location}, ${p.city}. ${p.priceLabel}. Verified, legally secure land with guidance from inquiry to ownership.`;
  const ogImage = p.seo?.ogImage || p.image || p.gallery?.[0];

  return {
    title,
    description,
    keywords: p.seo?.keywords,
    robots: p.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

const statusStyles: Record<string, string> = {
  Available: "bg-forest text-ivory",
  "Few Plots Left": "bg-gold text-forest-deep",
  "Sold Out": "bg-muted text-muted-foreground",
};

function youtubeEmbed(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}

export default async function PropertyPage({ params }: Params) {
  const { slug } = await params;
  const [p, settings] = await Promise.all([
    getProperty(slug),
    getSiteSettings(),
  ]);

  if (!p) notFound();

  const contact = settings?.contact;
  const whatsappNumber = contact?.whatsappNumber ?? "";
  const phone = contact?.phone;
  const coverSrc = p.image || p.gallery?.[0];

  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hello RKD Reality, I'm interested in "${p.title}" (${p.location}). Please share full details and arrange a site visit.`
      )}`
    : "/#contact";
  const telHref = phone ? `tel:${phone.replace(/\s/g, "")}` : "/#contact";
  const mapHref =
    p.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${p.location}, ${p.city}`
    )}`;

  const overview =
    p.overview && p.overview.length > 0
      ? p.overview
      : [
          `${p.title} is a ${p.type.toLowerCase()} opportunity located at ${p.location}, ${p.city}. Every plot here is title-verified and chosen for long-term value, with documentation independently checked before it reaches you.`,
          `Our team walks you through the title, encumbrance certificate, approvals and the full purchase process — so you can invest with documented, verifiable confidence rather than guesswork.`,
        ];

  const facts = [
    { icon: IndianRupee, label: "Starting Price", value: p.priceLabel },
    p.sizeLabel && { icon: Ruler, label: "Plot Size", value: p.sizeLabel },
    { icon: BadgeCheck, label: "Property Type", value: p.type },
    { icon: MapPin, label: "City", value: p.city },
    p.appreciation && {
      icon: TrendingUp,
      label: "Growth Outlook",
      value: p.appreciation,
    },
  ].filter(Boolean) as { icon: typeof IndianRupee; label: string; value: string }[];

  return (
    <>
      <Navbar phone={phone} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[64vh] min-h-[440px] w-full overflow-hidden">
            {coverSrc ? (
              <Image
                src={coverSrc}
                alt={p.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-forest" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/45 to-forest-deep/35" />

            {/* Back link */}
            <div className="absolute inset-x-0 top-0">
              <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-8">
                <Link
                  href="/#properties"
                  className="inline-flex items-center gap-2 text-sm text-ivory/80 transition-colors hover:text-ivory"
                >
                  <ArrowLeft className="size-4" />
                  Back to opportunities
                </Link>
              </div>
            </div>

            {/* Title block */}
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14">
                <Reveal>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`rounded-sm px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] ${
                        statusStyles[p.status] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.status}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-ivory/90 px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-[0.12em] text-forest backdrop-blur-sm">
                      <BadgeCheck className="size-3.5 text-gold" />
                      {p.type}
                    </span>
                  </div>
                  <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-ivory text-balance sm:text-5xl lg:text-6xl">
                    {p.title}
                  </h1>
                  <p className="mt-4 flex items-center gap-2 text-sm text-ivory/80">
                    <MapPin className="size-4 text-gold" />
                    {p.location}, {p.city}
                  </p>
                  <p className="mt-5 font-serif text-3xl text-gold-soft">
                    {p.priceLabel}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Key facts */}
        <section className="border-b border-border bg-ivory">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
              {facts.map((f) => (
                <div key={f.label} className="bg-card p-5">
                  <div className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
                    <f.icon className="size-3.5 text-gold" />
                    {f.label}
                  </div>
                  <p className="mt-2 font-serif text-lg text-foreground">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="bg-ivory py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Main column */}
              <div className="lg:col-span-8">
                <Reveal>
                  <span className="kicker text-gold">
                    About this property
                  </span>
                  <div className="mt-6 space-y-5">
                    {overview.map((para, i) => (
                      <p
                        key={i}
                        className="text-base leading-relaxed text-muted-foreground"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>

                {p.highlights.length > 0 && (
                  <Reveal delay={1} className="mt-12">
                    <h2 className="font-serif text-2xl text-foreground">
                      Highlights
                    </h2>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {p.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground"
                        >
                          <CheckCircle2 className="size-4 text-forest" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                )}

                {p.amenities && p.amenities.length > 0 && (
                  <Reveal delay={1} className="mt-12">
                    <h2 className="font-serif text-2xl text-foreground">
                      Amenities &amp; Features
                    </h2>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {p.amenities.map((a) => (
                        <li
                          key={a}
                          className="flex items-center gap-2.5 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="size-4 shrink-0 text-gold" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {p.gallery && p.gallery.length > 0 && (
                  <Reveal delay={1} className="mt-14">
                    <h2 className="font-serif text-2xl text-foreground">
                      Gallery
                    </h2>
                    <div className="mt-5">
                      <SiteGallery images={p.gallery} name={p.title} />
                    </div>
                  </Reveal>
                )}

                {p.youtubeUrl && youtubeEmbed(p.youtubeUrl) && (
                  <Reveal delay={1} className="mt-14">
                    <h2 className="font-serif text-2xl text-foreground">
                      Video
                    </h2>
                    <div className="mt-5 aspect-video overflow-hidden rounded-sm border border-border bg-secondary">
                      <iframe
                        src={youtubeEmbed(p.youtubeUrl)!}
                        title={`${p.title} video`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  </Reveal>
                )}

                {/* Location */}
                <Reveal delay={1} className="mt-14">
                  <h2 className="font-serif text-2xl text-foreground">
                    Location
                  </h2>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-gold" />
                    {p.location}, {p.city}
                  </p>
                  {p.locationHighlights && p.locationHighlights.length > 0 && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {p.locationHighlights.map((l) => (
                        <li
                          key={l}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <Navigation className="mt-0.5 size-4 shrink-0 text-forest" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-sm border border-forest/30 px-5 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-ivory"
                  >
                    <Navigation className="size-4" />
                    Get directions
                  </a>
                </Reveal>
              </div>

              {/* Sticky enquiry card */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <Reveal>
                    <div className="rounded-sm border border-border bg-card p-7 shadow-[0_24px_60px_-44px_rgba(27,42,31,0.6)]">
                      <p className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                        Starting from
                      </p>
                      <p className="mt-1 font-serif text-3xl text-forest">
                        {p.priceLabel}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        Book a free, no-pressure site visit. We&rsquo;ll share
                        the documents and walk the plot with you.
                      </p>

                      <div className="mt-6 space-y-3">
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#1f7a4d] px-5 py-3.5 text-sm font-medium text-white transition-colors hover:brightness-95"
                        >
                          <MessageCircle className="size-4" />
                          Enquire on WhatsApp
                        </a>
                        <a
                          href={telHref}
                          className="flex w-full items-center justify-center gap-2 rounded-sm bg-forest px-5 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-forest-deep"
                        >
                          <Phone className="size-4" />
                          {phone ? `Call ${phone}` : "Call us"}
                        </a>
                        <Link
                          href="/#contact"
                          className="flex w-full items-center justify-center gap-2 rounded-sm border border-border px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-gold"
                        >
                          Request a callback
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="grain relative bg-forest-deep py-16 text-ivory sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif text-3xl text-ivory sm:text-4xl">
                Ready to walk this plot?
              </h2>
              <p className="mt-3 max-w-lg text-ivory/70">
                Documents verified before you ever pay. Schedule a visit and see{" "}
                {p.title} in person.
              </p>
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-gold px-7 py-4 text-sm font-medium text-forest-deep transition-colors hover:bg-gold-soft"
            >
              Book Your Free Site Visit
            </a>
          </div>
        </section>
      </main>

      <Footer contact={contact} description={settings?.description} />
      <WhatsAppFloat whatsappNumber={whatsappNumber || undefined} />
    </>
  );
}
