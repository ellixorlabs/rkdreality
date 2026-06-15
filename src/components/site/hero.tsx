"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { HeroContent } from "@/sanity/types";

function renderHeadline(headline: string, highlight?: string) {
  if (!highlight) return headline;
  const idx = headline.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return headline;
  const before = headline.slice(0, idx);
  const match = headline.slice(idx, idx + highlight.length);
  const after = headline.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span className="italic text-gold-soft">{match}</span>
      {after}
    </>
  );
}

export function Hero({ data }: { data?: HeroContent | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.8]);

  if (!data) return null;

  const stats = data.stats ?? [];
  const primaryCta = data.primaryCta;
  const secondaryCta = data.secondaryCta;

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-forest-deep"
    >
      {data.backgroundImage && (
        <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
          <Image
            src={data.backgroundImage}
            alt={data.headline ?? "RKD Reality"}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      )}
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-forest-deep via-forest-deep/70 to-forest/40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-transparent to-forest-deep/30" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-7 pt-24 sm:px-8 sm:pb-10 lg:pb-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="kicker text-gold-soft"
          >
            <span className="h-px w-8 bg-gold-soft" />
            {data.kicker}
          </motion.div>

          {data.headline && (
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-serif text-[1.85rem] leading-[1.1] tracking-tight text-ivory text-balance sm:mt-6 sm:text-5xl sm:leading-[1.07] lg:text-[3.5rem] lg:leading-[1.05]"
            >
              {renderHeadline(data.headline, data.highlightWord)}
            </motion.h1>
          )}

          {data.subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/75 sm:mt-6 sm:text-base lg:text-lg"
            >
              {data.subheadline}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
          >
            {primaryCta?.label && primaryCta.href && (
              <a
                href={primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-forest-deep transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_12px_30px_-12px_rgba(176,141,76,0.8)] active:scale-[0.98]"
              >
                {primaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            )}
            {secondaryCta?.label && secondaryCta.href && (
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-ivory/30 px-7 py-3.5 text-sm font-medium tracking-wide text-ivory backdrop-blur-sm transition-all duration-300 hover:border-ivory/60 hover:bg-ivory/10 active:scale-[0.98]"
              >
                <ShieldCheck className="size-4 text-gold-soft" />
                {secondaryCta.label}
              </a>
            )}
          </motion.div>
        </div>

        {stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ivory/15 bg-ivory/10 sm:mt-8 sm:grid-cols-4 lg:mt-10"
          >
            {stats.map((t, i) => (
              <div
                key={`${t.label}-${i}`}
                className="bg-forest-deep/40 px-4 py-3.5 backdrop-blur-sm transition-colors duration-300 hover:bg-forest-deep/20 sm:px-5 sm:py-5"
              >
                <dt className="font-serif text-2xl text-gold-soft sm:text-3xl">
                  {t.value}
                </dt>
                <dd className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-ivory/60 sm:text-xs">
                  {t.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-9 w-px bg-gradient-to-b from-gold-soft/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
