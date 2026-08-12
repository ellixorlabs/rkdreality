import { Analytics } from "@vercel/analytics/next";
import { Loader } from "@/components/site/loader";
import { JsonLd } from "@/components/site/json-ld";
import { ELLIXOR_LABS, SITE_NAME, SITE_URL } from "@/lib/site";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
