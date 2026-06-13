import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { Why } from "@/components/site/why";
import { Properties } from "@/components/site/properties";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { Founder } from "@/components/site/founder";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Why />
        <Properties />
        <Process />
        <Testimonials />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
