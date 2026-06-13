import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Atmosphere() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.32]"
        animate={
          reduceMotion
            ? undefined
            : {
                backgroundPosition: ["0px 0px", "36px 28px"],
              }
        }
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(27,26,24,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(27,26,24,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[92vmin] w-[92vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.04, 1],
                opacity: [0.64, 0.78, 0.64],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 48% 44%, rgba(255,255,255,0.82) 0%, rgba(246,244,241,0.44) 42%, rgba(223,214,201,0.22) 72%, transparent 100%)",
        }}
      />

      <div className="absolute inset-x-[7vw] top-[11vh] h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="absolute inset-x-[15vw] bottom-[13vh] h-px bg-gradient-to-r from-transparent via-brass/20 to-transparent" />
      <div className="absolute inset-y-[10vh] left-[12vw] w-px bg-gradient-to-b from-transparent via-ink/8 to-transparent" />
      <div className="absolute inset-y-[16vh] right-[16vw] w-px bg-gradient-to-b from-transparent via-brass/14 to-transparent" />

      <div className="grain absolute inset-0 opacity-[0.13]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_56%,rgba(27,26,24,0.045)_100%)]" />
    </div>
  );
}
