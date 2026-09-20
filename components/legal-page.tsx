import type React from "react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"

/**
 * Shared shell for policy pages. Content is intentionally plain and factual —
 * these are drafted for review by the company's own legal adviser before
 * publication, not as legal advice.
 */
export function LegalPage({
  title,
  intro,
  path,
  updated,
  children,
}: {
  title: string
  intro: string
  path: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <>
      <Breadcrumbs trail={[{ name: title, href: path }]} />

      <Section tone="paper" spacing="tight">
        <Container size="narrow">
          <SectionHeading as="h1" eyebrow={`Last updated ${updated}`} title={title} description={intro} />

          <div className="mt-12 space-y-10 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-muted-foreground [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>

          <p className="mt-14 rounded-md border border-border bg-muted p-5 text-xs leading-relaxed text-muted-foreground">
            This page is provided for information about how this website operates. It is not legal advice, and it does
            not replace the terms agreed in a specific purchase order, sales contract or proforma invoice. Where this
            page and an agreed contract differ, the contract governs.
          </p>
        </Container>
      </Section>
    </>
  )
}
