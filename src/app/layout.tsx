import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Loader } from "@/components/site/loader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
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
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Loader />
        {children}
      </body>
    </html>
  );
}
