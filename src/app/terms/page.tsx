import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Use | RKD Reality",
  description:
    "The terms that govern your use of the RKD Reality website and services.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Use"
      updated="June 2026"
      intro="These terms govern your use of the RKD Reality website and the information presented on it. By using this site, you agree to the terms below."
    >
      <LegalSection heading="About this website">
        <p>
          This website is provided by RKD Reality to share information about
          land and property investment opportunities across Bangalore, Mysore
          and Nelamangala, and to help you connect with our team.
        </p>
      </LegalSection>

      <LegalSection heading="Property information">
        <p>
          We strive to keep all listing details such as pricing, dimensions,
          approvals and legal status accurate and up to date. However,
          information may change and is provided for general guidance only. It
          does not constitute a binding offer.
        </p>
        <p>
          Every investment should be confirmed through independent legal
          verification before purchase. We actively encourage and support this
          due diligence.
        </p>
      </LegalSection>

      <LegalSection heading="No investment advice">
        <p>
          The content on this site is informational and does not constitute
          financial, legal or investment advice. Projected appreciation figures
          are indicative and not guaranteed. Please consult qualified advisors
          before making any investment decision.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          You agree to use this website lawfully and not to misuse it, attempt
          to disrupt it, or copy its content for commercial purposes without
          permission.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          All branding, text, imagery and design on this site belong to RKD
          Reality or its licensors and may not be reproduced without written
          consent.
        </p>
      </LegalSection>

      <LegalSection heading="Privacy">
        <p>
          Your use of this site is also governed by our{" "}
          <a
            href="/privacy"
            className="text-forest underline underline-offset-4"
          >
            Privacy Policy
          </a>
          , which explains how we handle your data, including our commitment to
          never sell it.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms from time to time. Continued use of the site
          after changes means you accept the revised terms.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
