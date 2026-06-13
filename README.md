# RKD Reality

A premium, trust-first marketing website for **RKD Reality** — a real estate company helping first-time investors buy verified, legally secure land across **Bangalore, Mysore & Nelamangala**.

The site is positioned as a *trusted investment & property guidance platform* rather than a generic listing site. Design direction: premium, editorial, earth-toned (deep forest green + brass gold on warm ivory) — inspired by heritage luxury brands, deliberately avoiding neon, flashy or startup-style visuals.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components
- **Motion** (Framer Motion) for restrained scroll/parallax animation
- **lucide-react** icons
- Fonts: **Fraunces** (display serif) + **Inter** (body)

## Sections

1. **Hero** — trust-focused messaging, parallax aerial imagery, dual CTA, credibility metrics
2. **Trust strip** — approval authorities (RERA, BMRDA, BDA, DTCP, KIADB…)
3. **Why RKD Reality** — transparency promise, verified docs, guidance, local expertise
4. **Featured Opportunities** — curated listings with live search + type/city filters
5. **Buying Process** — Explore · Verify · Visit · Decide · Register
6. **Stories of Confidence** — testimonials / success stories
7. **Contact & Consultation** — site-visit booking form + WhatsApp / phone / email
8. **Footer** + floating **WhatsApp** assistant

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Customising content

- **Property listings** live in [`src/lib/properties.ts`](src/lib/properties.ts) — edit titles, prices, locations, RERA numbers and images there.
- **Imagery** currently uses Unsplash placeholders. Replace with the client's real property / drone photography and update the allowed image host in [`next.config.ts`](next.config.ts) if needed.
- **Contact details / WhatsApp number** — search for `918000000000`, `invest@rkdreality.in` and `+91 80000 00000` and replace with live details.
- The booking form is currently front-end only (shows a confirmation state). Wire `handleSubmit` in [`src/components/site/contact.tsx`](src/components/site/contact.tsx) to your CRM / lead API or an email service to capture leads.

## Future phases (per brand discovery)

3D property visualisation, virtual walkthroughs, and AR/VR property experiences, plus an admin dashboard and lead-management system.
