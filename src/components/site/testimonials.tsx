"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

type TestimonialView = {
  quote: string;
  name: string;
  role?: string;
  image?: string;
};

type TestimonialInput = {
  id: string;
  name: string;
  role?: string;
  quote: string;
  featured?: boolean;
  photo?: string;
};

export function Testimonials({ items }: { items?: TestimonialInput[] }) {
  if (!items || items.length === 0) return null;

  const toView = (t: TestimonialInput): TestimonialView => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    image: t.photo,
  });
  const featuredDoc = items.find((t) => t.featured) ?? items[0];
  const featured = toView(featuredDoc);
  const supporting = items
    .filter((t) => t.id !== featuredDoc.id)
    .slice(0, 2)
    .map(toView);

  return (
    <section id="testimonials" className="relative scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="kicker text-gold">
            Stories of Confidence
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl">
            Trust, earned one investor at a time.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Featured */}
          <Reveal className="lg:col-span-7">
            <figure className="flex h-full flex-col justify-between rounded-sm border border-border bg-card p-8 sm:p-10">
              <div>
                <Quote className="size-9 text-gold/40" />
                <blockquote className="mt-6 font-serif text-2xl leading-snug text-foreground text-balance sm:text-[1.9rem] sm:leading-[1.3]">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-foreground">{featured.name}</p>
                  <p className="text-sm text-muted-foreground">{featured.role}</p>
                </div>
                <div className="ml-auto hidden items-center gap-0.5 sm:flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* Supporting */}
          <div className="grid gap-6 lg:col-span-5">
            {supporting.map((t, i) => (
              <Reveal key={t.name} delay={i + 1}>
                <figure className="rounded-sm border border-border bg-card p-7">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[0.97rem] leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
