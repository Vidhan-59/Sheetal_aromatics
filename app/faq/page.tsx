import type { Metadata } from "next"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { FaqList } from "@/components/faq-list"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { faqSchema, pageMetadata } from "@/lib/seo"
import { faqs } from "@/lib/faqs"

export const metadata: Metadata = pageMetadata({
  title: "Buyer FAQs | Enquiries, Specs & Export",
  description:
    "What we supply, how to request a quotation, what to include in an enquiry and how export orders are handled.",
  path: "/faq",
  keywords: ["chemical supplier FAQ", "chemical RFQ questions", "export enquiry India FAQ"],
})

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs trail={[{ name: "Buyer FAQs", href: "/faq" }]} />

      <Section tone="paper" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <SectionHeading
              as="h1"
              eyebrow="Buyer FAQs"
              title="Questions we are asked most"
              description="If your question is not answered here, ask us directly — we would rather give you a specific answer than a generic one."
            />
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Still have a question?"
        description="Send it with your requirement and we will answer both together."
      />
    </>
  )
}
