import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = pageMetadata({
  title: "Website Security",
  description: `How ${siteConfig.name} protects this website and the enquiries you send, how to report a security issue, and how to spot payment fraud.`,
  path: "/website-security",
})

export default function WebsiteSecurityPage() {
  const email = <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>

  return (
    <LegalPage
      title="Website Security"
      path="/website-security"
      updated="November 2026"
      intro={`How we protect this website and the information you send us, and what to do if something looks wrong.`}
    >
      <section>
        <h2>Encrypted connections</h2>
        <p>
          Every page is served over HTTPS, so what you type into our forms is encrypted between your browser and the
          site. The site also tells browsers to connect only over HTTPS in future, and sets standard browser
          protections against content sniffing, clickjacking and unnecessary access to device features.
        </p>
      </section>

      <section>
        <h2>How enquiries are handled</h2>
        <ul>
          <li>Every form submission is checked on the server before it is accepted.</li>
          <li>Automated spam is filtered with hidden checks and limits on repeated submissions.</li>
          <li>Enquiries are delivered over encrypted connections to our business mailbox.</li>
          <li>They are never published on the website and are read only by the people handling them.</li>
        </ul>
        <p>
          We never ask for payment details, identity documents or passwords through this website. See our{" "}
          <a href="/privacy-policy">privacy policy</a> for what we collect and why.
        </p>
      </section>

      <section>
        <h2>Access and maintenance</h2>
        <p>
          Access to the website&apos;s hosting, code and business email is limited to authorised people. We review
          security advisories for the software the site is built on and apply updates, and we keep the site free of
          third-party advertising scripts.
        </p>
      </section>

      <section>
        <h2>Protect yourself from payment fraud</h2>
        <p>
          Criminals sometimes impersonate suppliers by email to redirect payments. Our bank details are confirmed on our
          proforma invoice. If you receive a message saying our bank details have changed, do not pay until you have
          called us on{" "}
          <a href={`tel:${siteConfig.contact.phonePrimary.e164}`}>{siteConfig.contact.phonePrimary.display}</a> to
          confirm. Genuine email from us comes from {email} or our own domain.
        </p>
      </section>

      <section>
        <h2>Reporting a security issue</h2>
        <p>
          If you find a vulnerability in this website, please email {email} with &quot;Security&quot; in the subject
          and enough detail for us to reproduce it. Please do not access or change data that is not yours, or disrupt
          the site while testing. We will acknowledge your report and keep you informed as we fix it.
        </p>
      </section>

      <section>
        <h2>If an incident happens</h2>
        <p>
          If a security incident affects information you have sent us, we will investigate it, contain it, and inform
          you and any authority as the law requires, with what happened and what we are doing about it.
        </p>
      </section>
    </LegalPage>
  )
}
