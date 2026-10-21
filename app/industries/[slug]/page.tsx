import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { ProductCard } from "@/components/product-card"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { collectionSchema, pageMetadata } from "@/lib/seo"
import { getIndustry, industries, industryHref, productsForIndustry } from "@/lib/industries"
import { getGuide } from "@/lib/guides"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}
  return pageMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: industryHref(industry),
  })
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  const products = productsForIndustry(industry)
  const guides = (industry.guides ?? []).map(getGuide).filter(Boolean)
  const others = industries.filter((i) => i.slug !== industry.slug)
  const path = industryHref(industry)

  return (
    <>
      <JsonLd data={collectionSchema(industry.title, industry.seo.description, path, products)} />
      <Breadcrumbs
        trail={[
          { name: "Industries", href: "/industries" },
          { name: industry.name, href: path },
        ]}
      />

      <Section tone="paper" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading
                as="h1"
                eyebrow={`${industry.name} · ${products.length} products`}
                title={industry.title}
                description={
                  <>
                    {industry.intro.map((paragraph, i) => (
                      <p key={i} className={i > 0 ? "mt-4" : undefined}>
                        {paragraph}
                      </p>
                    ))}
                  </>
                }
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/request-a-quote">Discuss Your Requirement</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Contact Our Sales Team</Link>
                </Button>
              </div>
            </div>

            <aside className="rounded-lg border border-border bg-card p-6 self-start">
              <h2 className="text-base font-semibold">What to include in your enquiry</h2>
              <ul className="mt-4 space-y-3">
                {industry.specify.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              {guides.length > 0 && (
                <div className="mt-6 border-t border-border pt-5">
                  <h3 className="text-sm font-semibold">Buyer guides</h3>
                  <ul className="mt-3 space-y-2">
                    {guides.map((guide) => (
                      <li key={guide!.slug}>
                        <Link href={`/guides/${guide!.slug}`} className="link-underline text-sm">
                          {guide!.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="muted" spacing="tight">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight">
            Products for {industry.name.toLowerCase()} manufacturers
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Listed applications describe where these materials are commonly used. Grade and suitability are confirmed
            against the specification agreed for your order.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <li key={product.slug} className="h-full">
                <ProductCard product={product} showCategory />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" spacing="tight">
        <Container>
          <h2 className="text-lg font-semibold">Other industries</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={industryHref(other)}
                  className="group flex h-full items-center justify-between gap-3 rounded-md border border-border bg-card p-4 transition-colors hover:border-forest-300 hover:bg-secondary"
                >
                  <span className="text-sm font-semibold group-hover:text-primary">{other.name}</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={`Request a quotation for ${industry.name.toLowerCase()} raw materials`}
        description="Share the product, grade, quantity and destination, and we will respond with availability and pricing."
      />
    </>
  )
}
