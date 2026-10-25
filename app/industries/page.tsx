import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { collectionSchema, pageMetadata } from "@/lib/seo"
import { industries, industryHref, productsForIndustry } from "@/lib/industries"

export const metadata: Metadata = pageMetadata({
  title: "Industries Served | Chemical & Ingredient Supply",
  description:
    "Raw materials for pharmaceutical, food & beverage, fragrance, cosmetics, Ayurvedic, chemical synthesis and industrial manufacturers. Ahmedabad, India.",
  path: "/industries",
})

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "Industries served",
          "Raw materials supplied by Sheetal Aromatics, grouped by the industries that use them.",
          "/industries",
        )}
      />
      <Breadcrumbs trail={[{ name: "Industries", href: "/industries" }]} />

      <Section tone="paper" spacing="tight" className="hex-drift">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Industries served"
            title="Raw materials for the industries our buyers work in"
            description="Each industry has its own grades, documents and questions. Choose yours to see the materials it typically sources from us and the details worth including in an enquiry."
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <li key={industry.slug} className="h-full">
                <article className="tile group flex h-full flex-col p-6">
                  <h2 className="text-lg font-semibold">
                    <Link href={industryHref(industry)} className="after:absolute after:inset-0 hover:text-primary">
                      {industry.name}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{industry.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {productsForIndustry(industry).length} products
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="Sourcing for a specific application?"
        description="Tell us the product, grade, quantity and destination and we will confirm what can be supplied."
      />
    </>
  )
}
