import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `Terms governing use of the ${siteConfig.name} website, the status of product information published on it, and how quotations and orders are agreed.`,
  path: "/terms-and-conditions",
})

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms-and-conditions"
      updated="September 2026"
      intro={`These terms cover use of this website and the status of the information published on it. Terms of sale are agreed separately for each order.`}
    >
      <section>
        <h2>Using this website</h2>
        <p>
          This website is published by {siteConfig.legalName} for business customers. You may browse it, and use the
          enquiry forms to contact us about products. Please do not use the forms to send unsolicited marketing,
          automated submissions or anything unlawful.
        </p>
      </section>

      <section>
        <h2>Product information</h2>
        <p>
          Product pages list the identifiers and properties we hold for each product — such as CAS number, molecular
          formula and physical form. These are general identifiers for the substance and are published for
          identification purposes.
        </p>
        <p>
          Nothing on this website is a specification, a certificate of analysis or a warranty of any particular purity,
          assay, grade, origin, packing or availability. The specification that applies to your material is the one
          confirmed in writing for your specific order.
        </p>
        <p>
          Listed applications describe where a type of material is commonly used. They are not a recommendation for
          your process. Suitability, safe handling and regulatory compliance for your intended use remain your
          responsibility.
        </p>
      </section>

      <section>
        <h2>Quotations and orders</h2>
        <ul>
          <li>Nothing on this website is an offer to sell. It is an invitation to enquire.</li>
          <li>Prices, minimum quantities, packing and lead times are quoted per enquiry and are valid only as stated in that quotation.</li>
          <li>An order exists only once we have accepted it in writing.</li>
          <li>Terms of sale, delivery terms and payment terms are those agreed for the specific order.</li>
        </ul>
      </section>

      <section>
        <h2>Restricted and hazardous products</h2>
        <p>
          Some products in our range are reactive or classified as dangerous goods for transport. Supply of these
          products is subject to handling, packing and transport arrangements being agreed in advance, and to any
          applicable legal or regulatory requirements in the origin and destination countries. We may decline an
          enquiry where those requirements cannot be met.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The {siteConfig.name} name, logo and the content of this website belong to {siteConfig.legalName}. Please do
          not reproduce them without permission.
        </p>
      </section>

      <section>
        <h2>Availability and changes</h2>
        <p>
          We may change, correct or withdraw content on this website at any time, including product listings. We do not
          guarantee uninterrupted availability of the site.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
        </p>
      </section>
    </LegalPage>
  )
}
