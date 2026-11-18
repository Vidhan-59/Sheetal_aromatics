import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, BookOpen } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { CategoryGrid } from "@/components/category-grid"
import { FilterableProductList } from "@/components/filterable-product-list"
import { SiteImage, type SiteImageName } from "@/components/site-media"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { collectionSchema, pageMetadata } from "@/lib/seo"
import { getCategory, getProductsByCategory, productCategories, productHref } from "@/lib/products-data"
import { pluralize } from "@/lib/utils"
import { guidesForCategory } from "@/lib/guides"

type Params = Promise<{ category: string }>

/** Header photography for categories that have a fitting image. */
const categoryBanners: Partial<Record<string, SiteImageName>> = {
  "essential-oils": "botanicals",
  "aromatic-chemicals": "botanicals",
  "pharma-intermediates": "qc-lab",
  "phase-transfer-catalysts": "plant",
}

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
  const banner = categoryBanners[category.slug]
  const others = productCategories.filter((c) => c.slug !== category.slug)
  const categoryGuides = guidesForCategory(category.slug)

  return (
    <>
      <JsonLd
        data={collectionSchema(category.name, category.description, `/products/${category.slug}`, products)}
      />
      <Breadcrumbs
        trail={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
        ]}
      />

      <Section tone="paper" spacing="tight" className="hex-drift">
        <Container>
          <div className={banner ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : undefined}>
            <SectionHeading
              as="h1"
              eyebrow={pluralize(products.length, "product")}
              title={category.name}
              description={category.intro}
            />
            {banner && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border shadow-md">
                <SiteImage name={banner} priority kenBurns representative sizes="(min-width: 1024px) 520px, 100vw" />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section tone="muted" spacing="tight">
        <Container>
          <h2 className="sr-only">{category.name} product list</h2>
          <CategoryGrid
            categorySlug={category.slug}
            groups={category.groups?.map((g) => ({ name: g, count: products.filter((p) => p.group === g).length }))}
            total={products.length}
          >
            <FilterableProductList products={products} />
          </CategoryGrid>
        </Container>
      </Section>

      {/* Quick-reference table: identifiers for every product in the category, server-rendered
          so search and answer engines can read the list (e.g. "phase transfer catalysts CAS list"). */}
      {products.some((p) => p.casNumber) && (
        <Section tone="paper" spacing="tight">
          <Container>
            <h2 className="text-lg font-semibold">{category.name}: CAS numbers at a glance</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Supplied from Ahmedabad, India for domestic delivery and export. Grade and packing are confirmed against
              your specification.
            </p>
            <div className="mt-5 overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <caption className="sr-only">{category.name} with CAS numbers, formulas and forms</caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    <th scope="col" className="px-4 py-2.5 font-medium">Product</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">CAS number</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Formula</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product) => (
                    <tr key={product.slug}>
                      <th scope="row" className="px-4 py-2.5 font-medium">
                        <Link href={productHref(product)} className="hover:text-primary hover:underline">
                          {product.name}
                        </Link>
                      </th>
                      <td className="px-4 py-2.5 font-mono text-xs tabular-nums">{product.casNumber ?? "—"}</td>
                      <td className="px-4 py-2.5">{product.molecularFormula ?? "—"}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{product.physicalForm ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>
      )}

      {/* Internal linking: buyer guides, then sibling categories */}
      <Section tone="paper" spacing="tight">
        <Container>
          {categoryGuides.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-semibold">Buyer guides for {category.name.toLowerCase()}</h2>
              <ul className="mt-5 grid gap-3 md:grid-cols-3">
                {categoryGuides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="group flex h-full gap-3 rounded-md border border-border bg-card p-4 transition-colors hover:border-forest-300 hover:bg-secondary"
                    >
                      <BookOpen aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm font-medium leading-snug group-hover:text-primary">{guide.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
                    {pluralize(getProductsByCategory(other.slug).length, "product")}
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
