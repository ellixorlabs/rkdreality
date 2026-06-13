import Link from "next/link";
import { Logo } from "./logo";
import { Mail, MapPin, Phone } from "lucide-react";

const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Opportunities", href: "#properties" },
      { label: "Why RKD Reality", href: "#why" },
      { label: "Buying Process", href: "#process" },
      { label: "Success Stories", href: "#testimonials" },
    ],
  },
  {
    title: "Property Types",
    links: [
      { label: "Residential Plots", href: "#properties" },
      { label: "Commercial Land", href: "#properties" },
      { label: "Joint Ventures", href: "#properties" },
      { label: "Farm Land", href: "#properties" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Bangalore", href: "#properties" },
      { label: "Mysore", href: "#properties" },
      { label: "Nelamangala", href: "#properties" },
      { label: "Devanahalli", href: "#properties" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="grain relative bg-forest-deep text-ivory">
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo imgClassName="h-11" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/65">
              Helping first-time investors buy verified, legally secure land
              across Bangalore, Mysore and Nelamangala — with transparency at
              every step.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ivory/70">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-gold-soft" /> +91 97400 915582
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-gold-soft" /> contact@rkdreality.com
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 text-gold-soft" />
                MG Road, Bangalore &middot; Sayyaji Rao Rd, Mysore
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-gold-soft">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 border-t border-ivory/15 pt-8 text-xs leading-relaxed text-ivory/45">
          RERA registered layouts where applicable. All listings are subject to
          independent legal verification before purchase.
        </p>

        <div className="mt-6 flex flex-col gap-4 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>
              &copy; {new Date().getFullYear()} RKD Reality. All rights
              reserved.
            </p>
            <nav className="flex items-center gap-x-5">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-ivory"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <a
            href="https://ellixorlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5"
          >
            <span className="text-ivory/45 transition-colors group-hover:text-ivory/70">
              Designed by
            </span>
            <span className="text-gradient-flow font-serif text-sm font-semibold tracking-wide">
              Ellixor Labs
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
