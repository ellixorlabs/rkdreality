import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
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

export const revalidate = 0;

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
        <TrustStrip approvals={settings?.approvals} />
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
      <Footer contact={contact} description={settings?.description} />
      <WhatsAppFloat whatsappNumber={contact?.whatsappNumber} />
    </>
  );
}
