"use client";

import { motion } from "motion/react";
import { Compass, FileSearch, MapPin, ScrollText, KeyRound } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    no: "01",
    icon: Compass,
    title: "Explore",
    body: "Browse a curated shortlist matched to your budget, location and goals.",
  },
  {
    no: "02",
    icon: FileSearch,
    title: "Verify",
    body: "We share the title, EC, approvals and RERA status for independent review.",
  },
  {
    no: "03",
    icon: MapPin,
    title: "Visit",
    body: "Walk the actual plot with an advisor — boundaries, access and surroundings.",
  },
  {
    no: "04",
    icon: ScrollText,
    title: "Decide",
    body: "Compare options transparently, with zero pressure and clear cost breakdowns.",
  },
  {
    no: "05",
    icon: KeyRound,
    title: "Register",
    body: "We handle paperwork, sub-registrar process and handover end to end.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="grain relative scroll-mt-20 overflow-hidden bg-forest-deep py-24 text-ivory sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="kicker text-gold-soft">
            <span className="h-px w-8 bg-gold-soft" />
            From Inquiry to Ownership
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-ivory text-balance sm:text-5xl">
            Five clear steps. No grey areas.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/70">
            Every investor follows the same transparent path — so you always
            know exactly where you stand and what comes next.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-ivory/15 lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-7 hidden h-px bg-gold-soft lg:block"
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.no} delay={i} className="relative">
                <div className="flex items-center gap-4 lg:block">
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-gold-soft/50 bg-forest-deep">
                    <s.icon className="size-5 text-gold-soft" />
                  </span>
                  <div className="lg:mt-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-sm text-gold-soft/70">
                        {s.no}
                      </span>
                      <h3 className="font-serif text-2xl text-ivory">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/65 lg:mt-3">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={2}>
          <div className="mt-16 flex flex-col items-start gap-4 border-t border-ivory/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-xl text-ivory/90 sm:text-2xl">
              Ready to walk your future plot?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-sm bg-gold px-7 py-4 text-sm font-medium text-forest-deep transition-colors hover:bg-gold-soft"
            >
              Book Your Free Site Visit
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
