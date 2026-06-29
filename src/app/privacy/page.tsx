import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | RKD Reality",
  description:
    "How RKD Reality collects, uses and protects your data. We never sell your information; we use it only to improve our services and guide your investment.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated="June 2026"
      intro="Your trust is the foundation of our business. This policy explains, in plain language, what information we collect, why we collect it, and the one promise that anchors everything: we never sell your data."
    >
      <LegalSection heading="Our promise in one line">
        <p>
          <strong className="text-foreground">
            We never sell, rent or trade your personal data
          </strong>{" "}
          to anyone. We collect only what helps us serve you better, and we use
          it solely to improve our services and guide you through your property
          investment.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>We may collect the following, only when you choose to share it:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="text-foreground">Contact details</span>: your
            name, phone number and email when you submit an enquiry, request a
            site visit, or message us on WhatsApp.
          </li>
          <li>
            <span className="text-foreground">Your preferences</span>: the
            property types, locations and budget range you tell us about, so we
            can recommend the right opportunities.
          </li>
          <li>
            <span className="text-foreground">Usage information</span>: basic,
            anonymised analytics about how our website is used (such as pages
            viewed), which helps us understand what is useful and what to
            improve.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How we use it">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to your enquiries and arrange site visits.</li>
          <li>
            Share verified documentation and recommend properties that match
            your goals.
          </li>
          <li>
            Improve our website, our guidance and the overall quality of our
            services.
          </li>
          <li>
            Keep you informed about relevant opportunities, only if you have
            asked us to.
          </li>
        </ul>
        <p>
          We do not use your data for any purpose beyond serving you and
          improving what we offer.
        </p>
      </LegalSection>

      <LegalSection heading="We do not sell your data">
        <p>
          To be absolutely clear: your personal information is never sold,
          rented or shared with third parties for their marketing. We may share
          limited details only with trusted partners who help us deliver a
          service you have requested (for example, legal verification or
          registration support), and only to the extent strictly necessary.
        </p>
      </LegalSection>

      <LegalSection heading="How we protect it">
        <p>
          We apply reasonable technical and organisational safeguards to keep
          your information secure, and we retain it only for as long as needed
          to serve you or to meet legal obligations.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can ask us at any time to access, correct or delete the personal
          information we hold about you, or to stop contacting you. Simply email{" "}
          <a
            href="mailto:contact@rkdreality.com"
            className="text-forest underline underline-offset-4"
          >
            contact@rkdreality.com
          </a>{" "}
          and we will act on your request promptly.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
