import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Loader } from "@/components/site/loader";
import { JsonLd } from "@/components/site/json-ld";
import { ELLIXOR_LABS, SITE_NAME, SITE_URL } from "@/lib/site";

const mulish = Mulish({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const title = `${SITE_NAME} | Invest in Land with Confidence`;
const description =
  "RKD Reality helps first-time investors buy verified, legally secure land across Bangalore, Mysore & Nelamangala, with transparent processes and guidance from inquiry to ownership.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "land investment Bangalore",
    "verified land plots",
    "RKD Reality",
    "commercial land Mysore",
    "Nelamangala plots",
    "real estate joint ventures",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: ELLIXOR_LABS.name,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description:
      "Verified documentation, transparent processes, and guided support from inquiry to ownership.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mulish.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "RealEstateAgent",
                "@id": `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: SITE_URL,
                email: "contact@rkdreality.com",
                telephone: "+91 97400 91582",
                areaServed: ["Bengaluru", "Mysuru", "Nelamangala"],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "#08, Hormavu Kalkare Main Road",
                  addressLocality: "Bengaluru",
                  postalCode: "560043",
                  addressCountry: "IN",
                },
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                publisher: { "@id": `${SITE_URL}/#organization` },
                creator: {
                  "@type": "Organization",
                  name: ELLIXOR_LABS.name,
                  alternateName: "ELLIXOR LABS",
                  url: ELLIXOR_LABS.url,
                  sameAs: [ELLIXOR_LABS.url],
                },
              },
            ],
          }}
        />
        <Loader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
