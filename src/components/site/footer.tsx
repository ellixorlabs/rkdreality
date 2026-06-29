import Link from "next/link";
import { Logo } from "./logo";
import { Mail, MapPin, Phone } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

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

type ContactInfo = {
  phone?: string;
  email?: string;
  address?: string;
  instagramUrl?: string;
};

const DEFAULTS = {
  phone: "+91 97400 91582",
  email: "contact@rkdreality.com",
  address: "#08, Hormavu Kalkare Main Road, Banglore - 560043",
  description:
    "Helping first-time investors buy verified, legally secure land across Bangalore, Mysore and Nelamangala, with transparency at every step.",
};

export function Footer({
  contact,
  description,
}: {
  contact?: ContactInfo;
  description?: string;
}) {
  const phone = contact?.phone || DEFAULTS.phone;
  const email = contact?.email || DEFAULTS.email;
  const address = contact?.address || DEFAULTS.address;
  const blurb = description || DEFAULTS.description;

  return (
    <footer className="grain relative isolate overflow-hidden bg-forest-deep text-ivory">
      <div className="aurora -z-10" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo imgClassName="h-11" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/65">
              {blurb}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ivory/70">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-gold-soft" /> {phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-gold-soft" /> {email}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 text-gold-soft" />
                {address}
              </li>
            </ul>
            {contact?.instagramUrl && (
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow RKD Reality on Instagram"
                className="mt-5 inline-flex items-center gap-2 rounded-sm border border-ivory/20 bg-ivory/5 px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:border-gold/50 hover:bg-gold/10 hover:text-gold-soft"
              >
                <InstagramIcon className="size-4" />
                Instagram
              </a>
            )}
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
              ELLIXOR LABS
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
