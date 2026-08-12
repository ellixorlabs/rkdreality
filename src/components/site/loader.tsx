"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const MIN_DURATION = 700;
const SESSION_KEY = "rkd-intro-seen";

function PlotSpinner({ reduceMotion }: { reduceMotion: boolean }) {
  const once = reduceMotion
    ? { duration: 0.2 }
    : { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 360 210"
      className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[30rem] -translate-x-1/2 -translate-y-1/2 sm:h-[22rem] sm:w-[40rem]"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={once}
    >
      <defs>
        <linearGradient id="plotStroke" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#a89160" />
          <stop offset="1" stopColor="#8a734a" />
        </linearGradient>
      </defs>
      <motion.path
        d="M40 146 L110 95 L177 116 L245 74 L320 122 L285 171 L195 158 L127 181 Z"
        fill="rgba(138,115,74,0.05)"
        stroke="url(#plotStroke)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={reduceMotion ? { duration: 0.2 } : { duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.svg>
  );
}

export function Loader() {
  const reduceMotion = useReducedMotion() ?? false;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setLoading(false);
      return;
    }
    const start = Date.now();
    let timeout = 0;

    const finish = () => {
      const remaining = Math.max(MIN_DURATION - (Date.now() - start), 0);
      timeout = window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setLoading(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      timeout = window.setTimeout(finish, 1800);
    }

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!loading) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 35%, #ffffff 0%, #f5f5f7 55%, #ececef 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid place-items-center"
          >
            <PlotSpinner reduceMotion={reduceMotion} />
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
          <p className="mt-9 text-[0.62rem] uppercase tracking-[0.5em] text-[#8a734a]">
            Trust · Transparency · Value
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
