import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DesignerCredit } from "./DesignerCredit.jsx";

const ease = [0.22, 1, 0.36, 1];

export function ConstructionHero() {
  const reduceMotion = useReducedMotion();
  const animation = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0 };

  return (
    <section className="flex min-h-svh items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.p
          className="mb-9 font-sans text-[0.66rem] font-medium uppercase tracking-[0.34em] text-stone sm:mb-10"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          animate={animation}
          transition={{ duration: 1.1, ease, delay: 0.08 }}
        >
          Estate Experience In Progress
        </motion.p>

        <motion.h1
          className="font-editorial text-[clamp(4.5rem,15vw,13.5rem)] font-medium leading-[0.86] tracking-[0.01em] text-ink"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
          animate={animation}
          transition={{ duration: 1.35, ease, delay: 0.2 }}
        >
          RKD Reality
        </motion.h1>

        <motion.div
          className="mt-9 h-px w-24 bg-brass/45 sm:mt-11"
          initial={{ opacity: 0, scaleX: reduceMotion ? 1 : 0.35 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.55 }}
        />

        <motion.p
          className="mt-9 max-w-2xl font-editorial text-[clamp(1.55rem,3.1vw,3rem)] font-normal leading-[1.06] tracking-[0.01em] text-graphite"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={animation}
          transition={{ duration: 1.15, ease, delay: 0.68 }}
        >
          Our digital experience is currently under construction.
        </motion.p>

        <motion.p
          className="mt-5 max-w-xl font-sans text-sm font-light leading-7 tracking-[0.08em] text-stone sm:text-[0.95rem]"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={animation}
          transition={{ duration: 1.1, ease, delay: 0.82 }}
        >
          A refined experience is being crafted with precision and purpose.
        </motion.p>

        <DesignerCredit />
      </div>
    </section>
  );
}
