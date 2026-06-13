"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const links = [
  { href: "#why", label: "Why RKD" },
  { href: "#properties", label: "Opportunities" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Stories" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-border/70 bg-ivory/90 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-forest-deep/60 via-forest-deep/20 to-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="RKD Reality home" className="shrink-0">
          <Logo dark={scrolled} priority />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "group relative text-sm tracking-wide transition-colors",
                  scrolled ? "text-foreground/75 hover:text-foreground" : "text-ivory/80 hover:text-ivory"
                )}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="tel:+9197400915582"
            className={cn(
              "hidden items-center gap-2 text-sm md:flex",
              scrolled ? "text-foreground/70" : "text-ivory/80"
            )}
          >
            <Phone className="size-3.5" />
            +91 97400 915582
          </a>
          <a
            href="#contact"
            className="hidden items-center justify-center rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-forest-deep transition-colors hover:bg-gold-soft sm:inline-flex"
          >
            Book a Site Visit
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-sm border lg:hidden",
                scrolled ? "border-border text-foreground" : "border-ivory/30 text-ivory"
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-border bg-ivory text-foreground">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-1 px-6 pt-12">
                <Logo dark className="mb-8" />
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 py-4 font-serif text-2xl text-foreground/90 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex items-center justify-center rounded-sm bg-forest px-5 py-3.5 text-sm font-medium text-ivory"
                >
                  Book a Site Visit
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
