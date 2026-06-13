"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";

const href =
  "https://wa.me/919740091582?text=" +
  encodeURIComponent("Hello RKD Reality, I'd like to know more about your verified land opportunities.");

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 1200);
    const t2 = setTimeout(() => setHint(true), 3000);
    const t3 = setTimeout(() => setHint(false), 9000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3"
        >
          <AnimatePresence>
            {hint && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="hidden items-center gap-2 rounded-sm border border-border bg-card py-2.5 pl-4 pr-2 text-sm text-foreground shadow-lg sm:flex"
              >
                Chat with a land advisor
                <button
                  onClick={() => setHint(false)}
                  aria-label="Dismiss"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="relative grid size-14 place-items-center rounded-full bg-[#1f7a4d] text-white shadow-[0_12px_30px_-8px_rgba(31,122,77,0.7)] transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#1f7a4d]/40" />
            <MessageCircle className="relative size-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
