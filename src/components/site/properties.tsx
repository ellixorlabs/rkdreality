"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  Images,
  MapPin,
  Ruler,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { SiteGallery } from "@/components/site/site-gallery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import {
  properties,
  propertyTypes,
  cities,
  type Property,
} from "@/lib/properties";

const statusStyles: Record<Property["status"], string> = {
  Available: "bg-forest/90 text-ivory",
  "Few Plots Left": "bg-gold text-forest-deep",
  "Sold Out": "bg-muted text-muted-foreground",
};

function waLink(p: Property) {
  const msg = encodeURIComponent(
    `Hello RKD Reality, I'm interested in "${p.title}" (${p.location}). Please share details and arrange a site visit.`
  );
  return `https://wa.me/919740091582?text=${msg}`;
}

function PropertyCard({
  p,
  onOpenGallery,
}: {
  p: Property;
  onOpenGallery: (p: Property) => void;
}) {
  const hasGallery = Boolean(p.gallery && p.gallery.length > 0);
  const photoCount = p.gallery?.length ?? 0;

  const media = (
    <>
      <Image
        src={p.image}
        alt={p.title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />
      <span
        className={cn(
          "absolute left-4 top-4 rounded-sm px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em]",
          statusStyles[p.status]
        )}
      >
        {p.status}
      </span>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-sm bg-ivory/90 px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-[0.12em] text-forest backdrop-blur-sm">
        <BadgeCheck className="size-3.5 text-gold" />
        {p.type}
      </span>
      {hasGallery && (
        <>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-sm bg-forest-deep/70 px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-[0.12em] text-ivory backdrop-blur-sm">
            <Images className="size-3.5 text-gold-soft" />
            {photoCount} photos
          </span>
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-forest-deep/0 opacity-0 transition-all duration-500 group-hover:bg-forest-deep/25 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-sm bg-ivory/95 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-forest-deep">
              <Images className="size-4 text-gold" />
              View gallery
            </span>
          </span>
        </>
      )}
    </>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_36px_70px_-44px_rgba(27,42,31,0.6)]"
    >
      {hasGallery ? (
        <button
          type="button"
          onClick={() => onOpenGallery(p)}
          aria-label={`Open ${p.title} photo gallery`}
          className="relative aspect-[16/11] cursor-pointer overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {media}
        </button>
      ) : (
        <div className="relative aspect-[16/11] overflow-hidden">{media}</div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <MapPin className="size-3.5 text-gold" />
          {p.location}
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-foreground">
          {p.title}
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.highlights.map((h) => (
            <span
              key={h}
              className="rounded-sm border border-border bg-secondary/60 px-2.5 py-1 text-[0.7rem] text-secondary-foreground"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <Ruler className="size-3.5" /> Plot Size
            </div>
            <p className="mt-1 text-foreground">{p.sizeLabel}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <TrendingUp className="size-3.5" /> Outlook
            </div>
            <p className="mt-1 text-foreground">{p.appreciation}</p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
              Starting
            </p>
            <p className="font-serif text-2xl text-forest">{p.priceLabel}</p>
          </div>
          <a
            href={waLink(p)}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-1.5 rounded-sm bg-forest px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest-deep"
          >
            Enquire
            <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
        <p className="mt-4 truncate text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground/80">
          RERA · {p.rera}
        </p>
      </div>
    </motion.article>
  );
}

export function Properties() {
  const [type, setType] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [activeGallery, setActiveGallery] = useState<Property | null>(null);

  useEffect(() => {
    if (!activeGallery) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveGallery(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeGallery]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchType = type === "all" || p.type === type;
      const matchCity = city === "all" || p.city === city;
      const matchQuery =
        query.trim() === "" ||
        `${p.title} ${p.location} ${p.city}`
          .toLowerCase()
          .includes(query.toLowerCase());
      return matchType && matchCity && matchQuery;
    });
  }, [type, city, query]);

  return (
    <section id="properties" className="relative scroll-mt-20 bg-sand/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="kicker text-gold">
            <span className="h-px w-8 bg-gold" />
            Featured Investment Opportunities
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl">
            Curated land, vetted before it reaches you.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            A short, deliberately selective list of opportunities — each one
            title-verified, RERA-registered where applicable, and chosen for
            long-term value rather than volume.
          </p>
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={1}>
          <div className="mt-12 flex flex-col gap-4 rounded-sm border border-border bg-card p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by location or project…"
                className="h-11 w-full rounded-sm border border-input bg-background pl-10 pr-3 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>
            <div className="flex gap-3">
              <Select value={type} onValueChange={(v) => setType(v ?? "all")}>
                <SelectTrigger className="h-11 w-full min-w-[10rem] rounded-sm border-input bg-background sm:w-44">
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {propertyTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={city} onValueChange={(v) => setCity(v ?? "all")}>
                <SelectTrigger className="h-11 w-full min-w-[9rem] rounded-sm border-input bg-background sm:w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <PropertyCard key={p.id} p={p} onOpenGallery={setActiveGallery} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            No matching opportunities right now —{" "}
            <a href="#contact" className="text-forest underline underline-offset-4">
              tell us what you&rsquo;re looking for
            </a>
            .
          </p>
        )}
      </div>

      <AnimatePresence>
        {activeGallery && activeGallery.gallery && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveGallery(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-deep/90 p-4 backdrop-blur-md sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeGallery.title} photo gallery`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl"
            >
              <div className="mb-4 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-ivory/70">
                    <MapPin className="size-3.5 text-gold" />
                    {activeGallery.location}
                  </p>
                  <h3 className="mt-1.5 truncate font-serif text-2xl text-ivory sm:text-3xl">
                    {activeGallery.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGallery(null)}
                  aria-label="Close gallery"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-ivory/25 bg-forest-deep/60 text-ivory backdrop-blur-sm transition-all duration-300 hover:bg-forest-deep/90 active:scale-95"
                >
                  <X className="size-5" />
                </button>
              </div>
              <SiteGallery
                images={activeGallery.gallery}
                name={activeGallery.title}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
