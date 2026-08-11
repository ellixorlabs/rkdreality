"use client";

import {useRef} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import type {FeatureItem} from "@/sanity/types";
import {FeatureGlyph} from "@/lib/property-features";

export function FeatureCarousel({
  title,
  items,
}: {
  title: string;
  items: FeatureItem[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  if (!items.length) return null;

  const scrollByCard = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-feature-card]");
    const step = (card?.offsetWidth ?? 160) + 16;
    el.scrollBy({left: dir * step, behavior: "smooth"});
  };

  return (
    <section className="mt-14">
      <h2 className="text-center font-serif text-3xl tracking-tight text-[#8a734a] sm:text-4xl">
        {title}
      </h2>

      <div className="relative mt-8">
        <button
          type="button"
          aria-label={`Previous ${title}`}
          onClick={() => scrollByCard(-1)}
          className="absolute left-0 top-1/2 z-10 hidden size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest/70 text-gold-soft shadow-sm sm:grid"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label={`Next ${title}`}
          onClick={() => scrollByCard(1)}
          className="absolute right-0 top-1/2 z-10 hidden size-9 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest/70 text-gold-soft shadow-sm sm:grid"
        >
          <ChevronRight className="size-4" />
        </button>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
              <article
                key={`${item.icon}-${item.label}`}
                data-feature-card
                className="flex w-[9.5rem] shrink-0 snap-start flex-col items-center justify-between rounded-2xl bg-[#f3f3f3] px-4 py-6 text-center sm:w-[10.5rem]"
              >
                <FeatureGlyph
                  icon={item.icon}
                  className="size-11 text-[#8a734a]"
                />
                <p className="mt-5 text-[0.82rem] leading-snug text-foreground">
                  {item.label}
                </p>
              </article>
          ))}
        </div>
      </div>
    </section>
  );
}
