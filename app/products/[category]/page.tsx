import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { CategoryGrid } from "@/components/category-grid"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { collectionSchema, pageMetadata } from "@/lib/seo"
import { getCategory, getProductsByCategory, productCategories } from "@/lib/products-data"

type Params = Promise<{ category: string }>

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) return {}

  return pageMetadata({
    title: category.seo.title,
    description: category.seo.description,
    path: `/products/${category.slug}`,
    keywords: [
      `${category.name.toLowerCase()} supplier`,
      `${category.name.toLowerCase()} exporter India`,
      `${category.name.toLowerCase()} Ahmedabad`,
      "B2B chemical supply",
    ],
  })
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const products = getProductsByCategory(category.slug)
  const others = productCategories.filter((c) => c.slug !== category.slug)

  return (
    <>
      <JsonLd
        data={collectionSchema(category.name, category.description, `/products/${category.slug}`)}
      />
      <Breadcrumbs
        trail={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
        ]}
      />

      <Section tone="paper" spacing="tight">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={`${products.length} products`}
            title={category.name}
            description={category.intro}
          />
        </Container>
      </Section>

      <Section tone="muted" spacing="tight">
        <Container>
          <h2 className="sr-only">{category.name} product list</h2>
          <CategoryGrid products={products} categorySlug={category.slug} groups={category.groups} />
        </Container>
      </Section>

      {/* Internal linking to sibling categories */}
      <Section tone="paper" spacing="tight">
        <Container>
          <h2 className="text-lg font-semibold">Other product categories</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/products/${other.slug}`}
                  className="group flex h-full flex-col justify-between rounded-md border border-border bg-card p-4 transition-colors hover:border-forest-300 hover:bg-secondary"
                >
                  <span className="text-sm font-semibold group-hover:text-primary">{other.name}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    {getProductsByCategory(other.slug).length} products
                    <ArrowRight aria-hidden="true" className="h-3 w-3" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={`Request a quotation for ${category.name.toLowerCase()}`}
        description="Share the product, quantity, specification and destination, and we will respond with availability and pricing."
      />
    </>
  )
}
