import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMetadata } from "@/lib/seo"
import { addressSingleLine, siteConfig } from "@/lib/site-config"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles the information you submit through this website, what it is used for and how to ask for it to be removed.`,
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="September 2026"
      intro={`This policy explains what ${siteConfig.name} does with the information you submit through this website.`}
    >
      <section>
        <h2>Who we are</h2>
        <p>
          {siteConfig.legalName} is a {siteConfig.legalForm.toLowerCase()} with its office at {addressSingleLine}. For
          any question about this policy, write to{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <p>
          We collect only what you type into an enquiry form: your name, company name, email address, phone or WhatsApp
          number, country, the product and quantity you are asking about, your required specification and your message.
        </p>
        <p>
          We do not run advertising trackers or analytics profiling on this site, and we do not ask for or store
          payment details, identity documents or account credentials anywhere on it.
        </p>
      </section>

      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>To answer your enquiry and prepare a quotation.</li>
          <li>To follow up on that enquiry and, where an order results, to fulfil it.</li>
          <li>To keep a record of business correspondence, as any supplier would.</li>
        </ul>
        <p>
          We do not sell your details, and we do not add you to a marketing list on the strength of an enquiry.
        </p>
      </section>

      <section>
        <h2>Who sees it</h2>
        <p>
          Enquiries are delivered to our own business email address and are read by the partners and staff handling
          your enquiry. Where an order proceeds, the information necessary to complete it may be shared with the
          parties involved in that order — for example a freight forwarder, a bank or a customs broker.
        </p>
        <p>
          The enquiry form is delivered by email, so the email provider used to receive it processes the message in the
          ordinary course of delivering it.
        </p>
      </section>

      <section>
        <h2>Cookies and site data</h2>
        <p>
          This site sets no advertising or analytics cookies. Your browser may store a small preference recording
          whether you chose the light or dark appearance. See our <a href="/cookie-policy">cookie policy</a> for
          detail.
        </p>
        <p>
          The contact page embeds a Google Maps frame so you can find our office. When that frame loads, Google
          receives the request in the same way it would if you opened Google Maps directly. If you would rather not
          load it, use the address text instead of the map.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          Business correspondence is retained for as long as it is commercially or legally relevant. If you would like
          your enquiry deleted, ask us at{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> and we will remove it, except
          where we are required to retain a record.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You may ask us what enquiry information we hold about you, ask for it to be corrected, or ask for it to be
          deleted. Write to <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> and we will
          respond.
        </p>
      </section>
    </LegalPage>
  )
}
