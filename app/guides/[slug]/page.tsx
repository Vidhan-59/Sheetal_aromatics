import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section } from "@/components/layout-primitives"
import { ProductCard } from "@/components/product-card"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { articleSchema, pageMetadata } from "@/lib/seo"
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

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const path = `/guides/${guide.slug}`
  const products = guide.relatedProducts.map(getProductBySlug).filter(Boolean)
  const relatedIndustries = guide.relatedIndustries.map(getIndustry).filter(Boolean)
  const leadImage = products.map((p) => productImageFor(p!.slug)).find((img) => img?.kind === "photo" || img?.kind === "generated")

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: guide.title,
          description: guide.description,
          path,
          datePublished: guide.datePublished,
          dateModified: guide.dateModified,
          image: leadImage?.src,
        })}
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
                </section>
              ))}
            </div>

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
