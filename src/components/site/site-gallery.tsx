"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Hand } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0.4 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0.4 }),
};

const swipeThreshold = 8000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

function wrap(length: number, value: number) {
  return ((value % length) + length) % length;
}

export function SiteGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const index = wrap(images.length, page);

  const paginate = (dir: number) => setPage([page + dir, dir]);
  const goTo = (i: number) => setPage([i, i > index ? 1 : -1]);

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeThreshold || info.offset.x < -80) paginate(1);
    else if (swipe > swipeThreshold || info.offset.x > 80) paginate(-1);
  };

  return (
    <div className="w-full min-w-0 max-w-full select-none overflow-hidden">
      <div className="group relative isolate flex aspect-[4/3] w-full min-w-0 max-w-full items-center justify-center overflow-hidden rounded-sm border border-border bg-secondary sm:aspect-auto sm:h-[56svh] sm:max-h-[56svh]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 32 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            className="absolute inset-0 max-w-full touch-pan-y cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[index]}
              alt={`${name} — photo ${index + 1} of ${images.length}`}
              fill
              draggable={false}
              priority={index === 0}
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="pointer-events-none object-cover sm:object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* legibility gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent" />

        {/* counter */}
        <div className="absolute right-4 top-4 rounded-sm bg-forest-deep/70 px-3 py-1 text-xs font-medium tracking-wide text-ivory backdrop-blur-sm">
          {index + 1} / {images.length}
        </div>

        {/* swipe hint */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-sm bg-forest-deep/60 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-ivory/85 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0 sm:hidden">
          <Hand className="size-3.5" /> Swipe to explore
        </div>

        {/* arrows */}
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => paginate(-1)}
          className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 bg-forest-deep/50 text-ivory backdrop-blur-sm transition-all duration-300 hover:bg-forest-deep/80 active:scale-95 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => paginate(1)}
          className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 bg-forest-deep/50 text-ivory backdrop-blur-sm transition-all duration-300 hover:bg-forest-deep/80 active:scale-95 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* thumbnails */}
      <div className="mt-3 w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch]">
        <div className="flex w-max gap-2 pr-1">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={cn(
              "relative aspect-[4/3] h-16 shrink-0 overflow-hidden rounded-sm border-2 transition-all duration-300",
              i === index
                ? "border-gold opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              draggable={false}
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}
