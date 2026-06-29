import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { LoaderClient } from "@/components/site/loader-client";

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

export const metadata: Metadata = {
  title: "RKD Reality — Invest in Land with Confidence",
  description:
    "RKD Reality helps first-time investors buy verified, legally secure land across Bangalore, Mysore & Nelamangala — with transparent processes and guidance from inquiry to ownership.",
  keywords: [
    "land investment Bangalore",
    "verified land plots",
    "RKD Reality",
    "commercial land Mysore",
    "Nelamangala plots",
    "real estate joint ventures",
  ],
  openGraph: {
    title: "RKD Reality — Invest in Land with Confidence",
    description:
      "Verified documentation, transparent processes, and guided support from inquiry to ownership.",
    type: "website",
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
        <LoaderClient />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
