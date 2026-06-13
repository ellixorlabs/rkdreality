import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./logo";
import { Footer } from "./footer";

export function LegalShell({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-ivory/10 bg-forest-deep">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="RKD Reality home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-ivory">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <span className="kicker text-gold">
            <span className="h-px w-8 bg-gold" />
            Legal
          </span>
          <h1 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Last updated · {updated}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80">
            {intro}
          </p>

          <div className="legal-prose mt-12 space-y-10">{children}</div>

          <div className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
            Questions about this policy? Email{" "}
            <a
              href="mailto:contact@rkdreality.com"
              className="text-forest underline underline-offset-4"
            >
              contact@rkdreality.com
            </a>
            .
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground sm:text-[1.7rem]">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
