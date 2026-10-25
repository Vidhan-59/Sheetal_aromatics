import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { collectionSchema, pageMetadata } from "@/lib/seo"
import { guides } from "@/lib/guides"

export const metadata: Metadata = pageMetadata({
  title: "Buyer Guides | Chemical Sourcing & Specifications",
  description:
    "Practical guides for chemical and ingredient buyers: quotation checklists, phase transfer catalyst selection, food preservatives and importing from India.",
  path: "/guides",
})

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "Buyer guides",
          "Practical guides for chemical and ingredient buyers from Sheetal Aromatics.",
          "/guides",
        )}
      />
      <Breadcrumbs trail={[{ name: "Buyer Guides", href: "/guides" }]} />

      <Section tone="paper" spacing="tight" className="hex-drift">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Buyer guides"
            title="Practical guides for chemical and ingredient buyers"
            description="Short, practical reading for procurement and technical teams — what to specify, how materials differ, and how export shipments are put together."
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug} className="h-full">
                <article className="tile group flex h-full flex-col p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {guide.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 text-lg font-semibold leading-snug">
                    <Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0 hover:text-primary">
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read guide
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
        title="Have a specification ready?"
        description="Send it with your quantity and destination and we will come back with availability and a quotation."
      />
    </>
  )
}
