import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Mail, MessageCircle, Phone } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { QuoteForm } from "@/components/quote-form"
import { pageMetadata } from "@/lib/seo"
import { siteConfig, whatsappLink } from "@/lib/site-config"
import { productCategories } from "@/lib/products-data"

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote | Product Enquiry",
  description:
    "Request a quotation for aromatic chemicals, essential oils, Ayurvedic products, metals or pharma intermediates from Ahmedabad, India.",
  path: "/request-a-quote",
  keywords: ["request chemical quote India", "chemical RFQ supplier", "aromatic chemicals quotation"],
})

const helps = [
  ["Product", "The exact product name, or a synonym or CAS number you use."],
  ["Quantity", "Trial quantity or regular volume — both are useful."],
  ["Specification", "Grade, assay, marker or impurity limits you work to."],
  ["Packing", "Required pack size, material and labelling."],
  ["Destination", "Port or city, and incoterms if you have a preference."],
]

/** Reads ?product= so links from elsewhere can pre-fill the form. */
async function PrefilledForm({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams
  const name = typeof product === "string" ? product.slice(0, 200) : ""
  return (
    <QuoteForm
      defaultProduct={name}
      defaultMessage={
        name
          ? `Hello, I am interested in purchasing ${name}. Please share availability, specification, MOQ, packaging and quotation.`
          : ""
      }
    />
  )
}

export default function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>
}) {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Request a Quote", href: "/request-a-quote" }]} />

      <Section tone="paper" spacing="tight">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Quotation request"
            title="Request a quote"
            description="Tell us what you need and we will respond with availability, specification confirmation and pricing. Enquiries are answered by the partners directly."
          />
        </Container>
      </Section>

      <Section tone="muted" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-9">
              <Suspense fallback={<div className="h-96 animate-pulse rounded-md bg-muted" />}>
                <PrefilledForm searchParams={searchParams} />
              </Suspense>
            </div>

            <aside className="space-y-8">
              <div className="rounded-lg border border-border bg-card p-7">
                <h2 className="text-base font-semibold">What to include</h2>
                <dl className="mt-4 divide-y divide-border">
                  {helps.map(([term, detail]) => (
                    <div key={term} className="py-3 first:pt-0 last:pb-0">
                      <dt className="text-sm font-medium">{term}</dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-lg border border-border bg-card p-7">
                <h2 className="text-base font-semibold">Prefer another channel?</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                    <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-primary">
                      {siteConfig.contact.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                    <a href={`tel:${siteConfig.contact.phonePrimary.e164}`} className="hover:text-primary">
                      {siteConfig.contact.phonePrimary.display}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                    <a
                      href={whatsappLink("Hello, I would like to request a quotation from Sheetal Aromatics.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-card p-7">
                <h2 className="text-base font-semibold">Browse first</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {productCategories.map((category) => (
                    <li key={category.slug}>
                      <Link href={`/products/${category.slug}`} className="text-muted-foreground hover:text-primary">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
