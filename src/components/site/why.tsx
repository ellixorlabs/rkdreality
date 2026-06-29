"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FileCheck2, Handshake, MapPinned, ScrollText } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const pillars = [
  {
    no: "01",
    icon: ScrollText,
    title: "The Transparency Promise",
    body: "Every price, every dimension, every legal status — disclosed upfront and in writing. What you see is exactly what you sign.",
  },
  {
    no: "02",
    icon: FileCheck2,
    title: "Verified Documentation",
    body: "Title deeds, encumbrance certificates, RERA registration and approvals are independently checked before a plot ever reaches you.",
  },
  {
    no: "03",
    icon: Handshake,
    title: "Customer-First Guidance",
    body: "A dedicated advisor walks you through every step — from your first question to registration — with no pressure to commit.",
  },
  {
    no: "04",
    icon: MapPinned,
    title: "Local Market Expertise",
    body: "Eighteen years on the ground across Bangalore, Mysore and Nelamangala means we know which corridors genuinely appreciate.",
  },
];

export function Why() {
  return (
    <section id="why" className="relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — statement + image */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="kicker text-gold">
                Why RKD Reality
              </span>
              <h2 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl">
                We don&rsquo;t just sell plots. We sell Future.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                First-time investors worry about scams, hidden clauses and legal
                surprises. Our entire process is built to replace that anxiety
                with documented, verifiable confidence.
              </p>
            </Reveal>

            <Reveal delay={1} className="relative mt-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-secondary/50">
                <Image
                  src="/why-doodle.svg"
                  alt="Verified land documents being reviewed and approved"
                  fill
                  unoptimized
                  className="object-contain p-8"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-6 -right-3 max-w-[14rem] rounded-sm border border-border bg-card p-5 shadow-[0_18px_40px_-24px_rgba(27,42,31,0.5)] sm:-right-6"
              >
                <FileCheck2 className="size-5 text-gold" />
                <p className="mt-3 font-serif text-lg leading-snug text-foreground">
                  Documents verified before you ever pay.
                </p>
              </motion.div>
            </Reveal>
          </div>

          {/* Right — pillars list */}
          <div className="lg:col-span-7 lg:pt-4">
            <ul>
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.no} delay={i}>
                  <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 first:border-t-0 sm:gap-10 sm:py-10">
                    <span className="font-serif text-2xl text-gold/70 sm:text-3xl">
                      {p.no}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <p.icon className="size-5 text-forest" />
                        <h3 className="font-serif text-xl text-foreground sm:text-2xl">
                          {p.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-xl text-[0.97rem] leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
