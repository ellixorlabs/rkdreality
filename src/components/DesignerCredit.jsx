import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function DesignerCredit() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.p
      className="mt-16 font-sans text-xs font-light uppercase tracking-[0.28em] text-stone sm:mt-20"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
    >
      Designed by{" "}
      <a
        className="designer-link relative inline-block text-ink outline-none transition-[letter-spacing,color] duration-500 ease-out hover:tracking-[0.34em] focus-visible:tracking-[0.34em] focus-visible:text-brass"
        href="https://ellixorlabs.com"
        rel="noopener noreferrer"
        aria-label="Visit Ellixor Labs"
      >
        Ellixor Labs
      </a>
    </motion.p>
  );
}
