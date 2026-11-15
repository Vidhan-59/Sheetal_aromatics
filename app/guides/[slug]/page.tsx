import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section } from "@/components/layout-primitives"
import { ProductCard } from "@/components/product-card"
import { CtaBand } from "@/components/cta-band"
import { FaqList } from "@/components/faq-list"
import { JsonLd } from "@/components/json-ld"
import { articleSchema, faqSchema, pageMetadata } from "@/lib/seo"
import { getGuide, guides } from "@/lib/guides"
import { getIndustry, industryHref } from "@/lib/industries"
import { getProductBySlug } from "@/lib/products-data"
import { productImageFor } from "@/lib/product-images"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return pageMetadata({
    title: guide.seoTitle,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    article: { publishedTime: guide.datePublished, modifiedTime: guide.dateModified },
  })
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" })

/** Share and Article images for guides whose subject has a matching site photo. */
const guideImages: Record<string, string> = {
  "importing-chemicals-from-india": "/images/site/warehouse.webp",
  "chemical-quotation-checklist": "/images/site/qc-lab.webp",
  "phase-transfer-catalysts-selection-guide": "/images/site/plant.webp",
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const path = `/guides/${guide.slug}`
  const products = guide.relatedProducts.map(getProductBySlug).filter(Boolean)
  const relatedIndustries = guide.relatedIndustries.map(getIndustry).filter(Boolean)
  // A site photo that matches the subject, else the first product photo the guide mentions.
  const leadImage =
    guideImages[guide.slug] ??
    products.map((p) => productImageFor(p!.slug)).find((img) => img?.kind === "photo" || img?.kind === "generated")?.src

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: guide.title,
            description: guide.description,
            path,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            image: leadImage,
            citations: guide.sources?.map((s) => s.href),
          }),
          ...(guide.faqs?.length ? [faqSchema(guide.faqs)] : []),
        ]}
      />
      <Breadcrumbs
        trail={[
          { name: "Buyer Guides", href: "/guides" },
          { name: guide.title, href: path },
        ]}
      />

      <Section tone="paper" spacing="tight">
        <Container size="narrow">
          <article>
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Buyer guide</p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{guide.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{guide.description}</p>
              {guide.audience && (
                <p className="mt-4 rounded-md border-l-2 border-accent bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
                  <span className="font-semibold">Who this guide is for: </span>
                  {guide.audience}
                </p>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                By Sheetal Aromatics · Updated{" "}
                <time dateTime={guide.dateModified}>{dateFormat.format(new Date(guide.dateModified))}</time> ·{" "}
                {guide.readingMinutes} min read
              </p>
            </header>

            <div className="mt-10 space-y-10">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.table && (
                    <div className="mt-5 overflow-x-auto rounded-md border border-border">
                      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                        <caption className="border-b border-border bg-muted px-4 py-2.5 text-left text-xs font-semibold text-foreground">
                          {section.table.caption}
                        </caption>
                        <thead>
                          <tr>
                            {section.table.columns.map((column) => (
                              <th key={column} scope="col" className="border-b border-border px-4 py-2.5 font-semibold">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, r) => (
                            <tr key={r} className="even:bg-muted/50">
                              {row.map((cell, c) =>
                                c === 0 ? (
                                  <th key={c} scope="row" className="border-t border-border px-4 py-2.5 align-top font-medium">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={c} className="border-t border-border px-4 py-2.5 align-top text-muted-foreground">
                                    {cell}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {guide.faqs && guide.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-semibold tracking-tight">Common questions</h2>
                <div className="mt-4">
                  <FaqList items={guide.faqs} />
                </div>
              </section>
            )}

            {guide.sources && guide.sources.length > 0 && (
              <section className="mt-10">
                <h2 className="text-base font-semibold">Sources and further reading</h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {guide.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer" className="link-underline text-sm">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="mt-12 rounded-md border border-border bg-muted p-5 text-xs leading-relaxed text-muted-foreground">
              This guide gives general information about common trade and chemistry practice. It is not regulatory or
              technical advice for a specific product or market — confirm requirements for your application and
              destination before ordering.
            </p>

            {relatedIndustries.length > 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                Related industries:{" "}
                {relatedIndustries.map((industry, i) => (
                  <span key={industry!.slug}>
                    {i > 0 && " · "}
                    <Link href={industryHref(industry!)} className="link-underline text-sm">
                      {industry!.name}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </article>
        </Container>
      </Section>

      {products.length > 0 && (
        <Section tone="muted" spacing="tight">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight">Products mentioned in this guide</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <li key={product!.slug} className="h-full">
                  <ProductCard product={product!} showCategory />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CtaBand
        title="Request a quotation"
        description="Send the product, grade, quantity and destination and we will respond with availability and pricing."
      />
    </>
  )
}
