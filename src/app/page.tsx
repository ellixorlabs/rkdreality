import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Why } from "@/components/site/why";
import { Properties } from "@/components/site/properties";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { Founder } from "@/components/site/founder";
import { Faqs } from "@/components/site/faqs";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import {
  getProperties,
  getSiteSettings,
  getHero,
  getFounder,
  getTestimonials,
  getFaqs,
} from "@/sanity/data";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings?.defaultSeo?.metaTitle ||
    `${SITE_NAME} | Invest in Land with Confidence`;
  const description =
    settings?.defaultSeo?.metaDescription || settings?.description;

  return {
    title: { absolute: title },
    description,
    keywords: settings?.defaultSeo?.keywords,
    robots: settings?.defaultSeo?.noIndex
      ? { index: false, follow: false }
      : undefined,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      images: settings?.defaultSeo?.ogImage
        ? [{ url: settings.defaultSeo.ogImage }]
        : undefined,
    },
  };
}

export default async function Home() {
  const [properties, settings, hero, founder, testimonials, faqs] =
    await Promise.all([
      getProperties(),
      getSiteSettings(),
      getHero(),
      getFounder(),
      getTestimonials(),
      getFaqs(),
    ]);

  const contact = settings?.contact;

  // Filter options are derived from the live content, not hardcoded.
  const propertyTypes = Array.from(
    new Set(properties.map((p) => p.type).filter(Boolean))
  );
  const cities = Array.from(
    new Set(properties.map((p) => p.city).filter(Boolean))
  );

  return (
    <>
      <Navbar phone={contact?.phone} />
      <main className="flex-1">
        <Hero data={hero} />
        <Why />
        <Properties
          items={properties}
          propertyTypes={propertyTypes}
          cities={cities}
        />
        <Process />
        <Testimonials items={testimonials} />
        <Founder data={founder} />
        <Faqs items={faqs} />
        <Contact
          contact={contact}
          propertyTypes={propertyTypes}
          cities={cities}
        />
      </main>
      <Footer
        contact={contact}
        description={settings?.description}
        columns={settings?.footerColumns}
      />
      <WhatsAppFloat whatsappNumber={contact?.whatsappNumber} />
    </>
  );
}
