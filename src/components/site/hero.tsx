"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const trust = [
  { value: "100%", label: "Title-Verified Plots" },
  { value: "₹0", label: "Hidden Charges" },
  { value: "1,200+", label: "Families Guided" },
  { value: "RERA", label: "Registered Layouts" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.8]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-forest-deep"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=80"
          alt="Aerial view of green land parcels at dawn"
          fill
          priority
          className="object-cover"
        />
      </motion.div>
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
            Bangalore · Mysore · Nelamangala
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-serif text-[1.85rem] leading-[1.1] tracking-tight text-ivory text-balance sm:mt-6 sm:text-5xl sm:leading-[1.07] lg:text-[3.5rem] lg:leading-[1.05]"
          >
            Own land you can{" "}
            <span className="italic text-gold-soft">trust</span> — verified,
            documented, and truly yours.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/75 sm:mt-6 sm:text-base lg:text-lg"
          >
            For first-time investors who refuse to gamble. RKD Reality guides you
            from inquiry to ownership with transparent processes and
            legally-verified documentation — no surprises, ever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
          >
            <a
              href="#properties"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-forest-deep transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_12px_30px_-12px_rgba(176,141,76,0.8)] active:scale-[0.98]"
            >
              Explore Opportunities
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-ivory/30 px-7 py-3.5 text-sm font-medium tracking-wide text-ivory backdrop-blur-sm transition-all duration-300 hover:border-ivory/60 hover:bg-ivory/10 active:scale-[0.98]"
            >
              <ShieldCheck className="size-4 text-gold-soft" />
              Book a Free Site Visit
            </a>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ivory/15 bg-ivory/10 sm:mt-8 sm:grid-cols-4 lg:mt-10"
        >
          {trust.map((t) => (
            <div
              key={t.label}
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
