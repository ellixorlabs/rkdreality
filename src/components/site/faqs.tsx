"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export function Faqs({ items }: { items?: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items?.[0]?.id ?? null);

  if (!items || items.length === 0) return null;

  return (
    <section id="faqs" className="relative scroll-mt-20 bg-sand/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="kicker justify-center text-gold">
            Questions, Answered
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl">
            Everything you want to know before you buy.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-border rounded-sm border border-border bg-card">
          {items.map((item) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none transition-colors hover:bg-secondary/40 focus-visible:bg-secondary/40 sm:px-7"
                >
                  <span className="font-serif text-lg text-foreground sm:text-xl">
                    {item.question}
                  </span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-forest">
                    {isOpen ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[0.97rem] leading-relaxed text-muted-foreground sm:px-7">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
