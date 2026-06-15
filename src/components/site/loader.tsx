"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const MIN_DURATION = 1900;

function PlotSpinner() {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 360 210"
      className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[24rem] -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-[31rem]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="plotStroke" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#f5d88a" />
          <stop offset="1" stopColor="#b08d4c" />
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
        fill="rgba(201,168,95,0.045)"
        stroke="url(#plotStroke)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#plotGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 0.9, 0.65] }}
        transition={{
          duration: 2.1,
          ease: [0.45, 0, 0.2, 1],
          repeat: Infinity,
          repeatDelay: 0.35,
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
          stroke="rgba(247,242,232,0.22)"
          strokeWidth="0.8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.55, 0.2] }}
          transition={{
            duration: 1.6,
            delay: 0.18 + index * 0.08,
            ease: [0.45, 0, 0.2, 1],
            repeat: Infinity,
            repeatDelay: 0.7,
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
          fill="#c9a85f"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.25, 1],
            opacity: [0, 1, 0.65],
          }}
          transition={{
            duration: 1.2,
            delay: index * 0.08,
            ease: [0.22, 1, 0.36, 1],
            repeat: Infinity,
            repeatDelay: 1.1,
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* measuring sweep along the plot, not across the logo */}
      <motion.path
        d="M40 146 L110 95 L177 116 L245 74 L320 122"
        fill="none"
        stroke="#fff4c7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="18 180"
        initial={{ strokeDashoffset: 220, opacity: 0 }}
        animate={{ strokeDashoffset: -60, opacity: [0, 0.9, 0] }}
        transition={{
          duration: 1.9,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.25,
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
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 35%, #1d2c22 0%, #131e16 45%, #0a0f0b 100%)",
          }}
        >
          {/* soft gold glow behind the mark */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.55, 0.35], scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,95,0.35) 0%, rgba(201,168,95,0) 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid place-items-center"
          >
            <PlotSpinner />
            <Image
              src="/rkd-logo.png"
              alt="RKD Reality"
              width={592}
              height={240}
              priority
              className="relative z-10 h-28 w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:h-36"
            />
          </motion.div>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7 text-[0.62rem] uppercase tracking-[0.5em] text-[#c9a85f]/80"
          >
            Trust · Transparency · Value
          </motion.p>

          {/* progress line */}
          <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: [0.45, 0, 0.2, 1] }}
              className="h-full bg-gradient-to-r from-[#b08d4c] to-[#c9a85f]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
