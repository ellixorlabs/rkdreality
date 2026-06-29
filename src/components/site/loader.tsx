"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const MIN_DURATION = 2400;

function PlotSpinner() {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 360 210"
      className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[30rem] -translate-x-1/2 -translate-y-1/2 sm:h-[22rem] sm:w-[40rem]"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="plotStroke" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#a89160" />
          <stop offset="1" stopColor="#8a734a" />
        </linearGradient>
        <filter id="plotGlow">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* surveyed land parcels */}
      <motion.path
        d="M40 146 L110 95 L177 116 L245 74 L320 122 L285 171 L195 158 L127 181 Z"
        fill="rgba(138,115,74,0.05)"
        stroke="url(#plotStroke)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#plotGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 0.95, 0.7] }}
        transition={{
          duration: 3,
          ease: [0.4, 0, 0.2, 1],
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      />
      {[
        "M110 95 L127 181",
        "M177 116 L195 158",
        "M245 74 L285 171",
        "M177 116 L127 181",
        "M177 116 L285 171",
      ].map((d, index) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="rgba(29,29,31,0.16)"
          strokeWidth="0.9"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.5, 0.18] }}
          transition={{
            duration: 2.2,
            delay: 0.25 + index * 0.1,
            ease: [0.4, 0, 0.2, 1],
            repeat: Infinity,
            repeatDelay: 0.9,
          }}
        />
      ))}

      {/* survey points */}
      {[
        [40, 146],
        [110, 95],
        [177, 116],
        [245, 74],
        [320, 122],
        [285, 171],
        [195, 158],
        [127, 181],
      ].map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#8a734a"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0.7],
          }}
          transition={{
            duration: 1.6,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1],
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* measuring sweep along the plot, not across the logo */}
      <motion.path
        d="M40 146 L110 95 L177 116 L245 74 L320 122"
        fill="none"
        stroke="#a89160"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="18 180"
        initial={{ strokeDashoffset: 220, opacity: 0 }}
        animate={{ strokeDashoffset: -60, opacity: [0, 0.85, 0] }}
        transition={{
          duration: 2.6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.4,
        }}
      />
    </motion.svg>
  );
}

export function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(MIN_DURATION - elapsed, 0);
      window.setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // Fallback in case the load event was missed.
      const fallback = window.setTimeout(finish, 3500);
      return () => {
        window.removeEventListener("load", finish);
        window.clearTimeout(fallback);
      };
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 35%, #ffffff 0%, #f5f5f7 55%, #ececef 100%)",
          }}
        >
          {/* soft neutral glow behind the mark */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 0.5, 0.35], scale: 1 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
            className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(138,115,74,0.16) 0%, rgba(138,115,74,0) 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid place-items-center"
          >
            <PlotSpinner />
            <Image
              src="/rkd-logo.png"
              alt="RKD Reality"
              width={399}
              height={353}
              priority
              unoptimized
              className="relative z-10 h-44 w-auto drop-shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:h-56"
            />
          </motion.div>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 text-[0.62rem] uppercase tracking-[0.5em] text-[#8a734a]"
          >
            Trust · Transparency · Value
          </motion.p>

          {/* progress line */}
          <div className="mt-8 h-px w-40 overflow-hidden bg-black/10">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
              className="h-full bg-gradient-to-r from-[#a89160] to-[#8a734a]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
