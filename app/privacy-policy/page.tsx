import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMetadata } from "@/lib/seo"
import { addressSingleLine, siteConfig } from "@/lib/site-config"
import { analyticsEnabled } from "@/lib/analytics"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, shares and protects the information you submit through this website, and how to exercise your rights.`,
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  const email = <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>

  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="November 2026"
      intro={`This policy explains what information ${siteConfig.name} collects through this website, why, who processes it on our behalf, and the choices you have.`}
    >
      <section>
        <h2>Who we are</h2>
        <p>
          {siteConfig.legalName} is a {siteConfig.legalForm.toLowerCase()} with its office at {addressSingleLine}. We
          decide how the information described here is used. For any question about this policy or your information,
          write to {email}.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Enquiry forms.</strong> When you send a quote request, a general enquiry or a private-label enquiry,
            we receive what you type: your name, company, email address, phone or WhatsApp number, country, the product,
            quantity, specification, packaging or branding requirements, and your message, together with the page you
            sent it from.
          </li>
          <li>
            <strong>Direct messages.</strong> If you email, call or WhatsApp us, we receive the details you share in
            that conversation.
          </li>
          <li>
            <strong>Technical data.</strong> Like any website, our hosting provider records standard server logs (IP
            address, browser type, pages requested and the time of the request) to deliver the site and protect it
            from abuse.
          </li>
          {analyticsEnabled && (
            <li>
              <strong>Analytics, only with your consent.</strong> If you accept analytics cookies, Google Analytics
              records how the site is used, such as pages viewed and which contact options are clicked.
            </li>
          )}
        </ul>
        <p>
          We do not ask for or store payment details, identity documents or account passwords on this website, and we
          do not use advertising cookies.
        </p>
      </section>

      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>To answer your enquiry, prepare a quotation and take the steps you ask for before an order.</li>
          <li>To follow up on that enquiry and, where an order results, to fulfil it.</li>
          <li>To keep records of business correspondence, as any supplier must.</li>
          <li>To keep the website secure and working.</li>
          {analyticsEnabled && <li>With your consent, to understand how the site is used and improve it.</li>}
        </ul>
        <p>
          We do not sell your information, and we do not add you to a marketing list because you sent an enquiry.
        </p>
      </section>

      <section>
        <h2>Who processes it for us</h2>
        <p>
          We use a small number of service providers, each of which handles your information only to provide its
          service:
        </p>
        <ul>
          <li>
            <strong>Website hosting</strong> (Vercel) serves the site and keeps its server logs.
          </li>
          <li>
            <strong>Email delivery</strong> (Resend) delivers form submissions to our business mailbox (Google Gmail) and
            may send you an acknowledgement of your enquiry.
          </li>
          {analyticsEnabled && (
            <li>
              <strong>Google Analytics</strong> measures site use, only after you accept analytics cookies.
            </li>
          )}
          <li>
            <strong>WhatsApp</strong> (Meta) processes your messages if you choose to contact us through it.
          </li>
          <li>
            <strong>Google Maps</strong> loads the map on our contact page.
          </li>
        </ul>
        <p>
          Where an order proceeds, the details needed to complete it may be shared with the parties involved in that
          order, such as a freight forwarder, a bank or a customs broker. We may also disclose information where the law
          requires it.
        </p>
      </section>

      <section>
        <h2>International transfers</h2>
        <p>
          Some of these providers process information on servers outside India, for example in the United States. They
          do so under their own published privacy and security commitments. By using these services we aim to ensure
          your information is protected to a comparable standard.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          Enquiries and business correspondence are kept for as long as they are commercially or legally relevant.
          Server logs are kept for the hosting provider&apos;s standard period.
          {analyticsEnabled && " Analytics data is kept for the retention period set in our Google Analytics account."}{" "}
          If you would like your enquiry deleted, ask us at {email} and we will remove it, except where we must keep a
          record by law.
        </p>
      </section>

      <section>
        <h2>How we protect it</h2>
        <p>
          The site is served only over HTTPS. Enquiry forms are validated and protected against automated spam, and
          enquiries are read only by the partners and staff who handle them. See{" "}
          <a href="/website-security">website security</a> for more.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Depending on the law that applies to you, including India&apos;s Digital Personal Data Protection Act, 2023,
          you may ask us what information we hold about you, ask for it to be corrected or deleted, withdraw consent you
          have given, and raise a complaint with us.
          {analyticsEnabled && " You can change your analytics choice at any time using \"Cookie settings\" in the footer."}{" "}
          Write to {email} and we will respond within a reasonable time.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          This website is for business buyers. It is not directed at children, and we do not knowingly collect
          information from anyone under 18.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          If we change how we handle information, we will update this page and the date at the top. Significant changes
          will be made clear on this page.
        </p>
      </section>
    </LegalPage>
  )
}
