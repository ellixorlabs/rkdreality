"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const MIN_DURATION = 1900;

function PlotFrame() {
  const corners: [number, number][] = [
    [26, 26],
    [314, 26],
    [314, 174],
    [26, 174],
  ];

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 340 200"
      className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-[22rem] -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-[27rem]"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="plotStroke" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#f5d88a" />
          <stop offset="1" stopColor="#b08d4c" />
        </linearGradient>
      </defs>

      {/* plot boundary drawing around the mark */}
      <motion.rect
        x="26"
        y="26"
        width="288"
        height="148"
        rx="6"
        fill="none"
        stroke="url(#plotStroke)"
        strokeWidth="1.3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 0.85, 0.4] }}
        transition={{
          duration: 2.4,
          ease: [0.45, 0, 0.2, 1],
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      />

      {/* corner survey markers */}
      {corners.map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3"
          fill="#c9a85f"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.7] }}
          transition={{
            duration: 1.1,
            delay: 0.5 + index * 0.18,
            ease: [0.22, 1, 0.36, 1],
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
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
            <PlotFrame />
            <Image
              src="/rkd-logo.png"
              alt="RKD Reality"
              width={592}
              height={240}
              priority
              className="relative z-10 h-28 w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:h-36"
            />
          </motion.div>

          {/* progress line */}
          <div className="mt-10 h-px w-40 overflow-hidden bg-white/10">
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
