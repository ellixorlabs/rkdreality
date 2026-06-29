"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Quote, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

import type { FounderData } from "@/sanity/types";

export function Founder({ data }: { data?: FounderData | null }) {
  if (!data) return null;

  const {
    name,
    role,
    portrait,
    kicker,
    heading,
    paragraphs = [],
    pullQuote,
    signatureQuote,
    credentials = [],
  } = data;

  return (
    <section
      id="founder"
      className="grain relative isolate scroll-mt-20 overflow-hidden bg-forest py-24 text-ivory sm:py-32"
    >
      <div className="aurora -z-10" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-sm border border-gold/30 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]"
              >
                {portrait && (
                  <Image
                    src={portrait}
                    alt={`${name}${role ? `, ${role}` : ""}`}
                    width={900}
                    height={1125}
                    className="size-full object-cover"
                    priority={false}
                  />
                )}
                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ivory/10" />
              </motion.div>

              {/* Thin gold accent rail */}
              <span className="absolute -left-3 top-8 hidden h-24 w-px bg-gold/60 sm:block" />

              {/* Floating signature caption */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="absolute -bottom-6 -right-3 max-w-[15rem] rounded-sm border border-gold/25 bg-forest-deep/95 p-5 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:-right-6"
              >
                <ShieldCheck className="size-5 text-gold" />
                <p className="mt-3 font-serif text-lg leading-snug text-ivory">
                  &ldquo;{signatureQuote}&rdquo;
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gold-soft">
                  {name}
                </p>
              </motion.div>
            </div>
          </Reveal>

          {/* Content */}
          <div className="lg:col-span-7 lg:pl-4">
            <Reveal>
              <span className="kicker text-gold">
                {kicker}
              </span>
              <h2 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-ivory text-balance sm:text-5xl">
                {heading}
              </h2>
            </Reveal>

            <Reveal delay={1}>
              <div className="mt-6">
                <p className="font-serif text-2xl text-gold-soft">{name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-ivory/60">
                  {role}
                </p>
              </div>

              <div className="mt-7 max-w-xl space-y-5 text-[0.97rem] leading-relaxed text-ivory/80">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={2}>
              <figure className="mt-9 max-w-xl border-l-2 border-gold/50 pl-5">
                <Quote className="size-5 text-gold/50" />
                <blockquote className="mt-2 font-serif text-xl leading-snug text-ivory text-balance">
                  {pullQuote}
                </blockquote>
              </figure>
            </Reveal>

            <Reveal delay={3}>
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-ivory/15 pt-8">
                {credentials.map((c) => (
                  <div key={c.label}>
                    <dt className="font-serif text-3xl text-gold sm:text-4xl">
                      {c.stat}
                    </dt>
                    <dd className="mt-2 text-xs leading-snug text-ivory/65">
                      {c.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
