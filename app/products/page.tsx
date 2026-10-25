import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { ProductExplorer } from "@/components/product-explorer"
import { ProductImage } from "@/components/product-image"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { collectionSchema, pageMetadata } from "@/lib/seo"
import {
  categoryCover,
  countByCategory,
  getProductsByCategory,
  productCategories,
  productHref,
  productsDatabase,
} from "@/lib/products-data"

export const metadata: Metadata = pageMetadata({
  title: "Chemical Products List | Trader & Supplier in Gujarat",
  description: `Browse ${productsDatabase.length} products across ${productCategories.length} categories. Search by name or CAS number, filter by category and request a quotation.`,
  path: "/products",
  keywords: [
    "aromatic chemicals list",
    "essential oils supplier",
    "Ayurvedic products exporter",
    "pharma intermediates India",
    "phase transfer catalysts India",
    "chemical product catalogue India",
  ],
})

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "Products — Sheetal Aromatics",
          `Catalogue of ${productsDatabase.length} products supplied by Sheetal Aromatics.`,
          "/products",
        )}
      />
      <Breadcrumbs trail={[{ name: "Products", href: "/products" }]} />

      <Section tone="paper" spacing="tight" className="hex-drift">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Catalogue"
            title="Products"
            description={`${productsDatabase.length} products across ${productCategories.length} categories. Search by product name, CAS number or application, or filter by category. Specifications, packing and documentation are confirmed against each enquiry.`}
          />
        </Container>
      </Section>

      {/* Category overview */}
      <Section tone="muted" spacing="tight">
        <Container>
          <h2 className="sr-only">Product categories</h2>
          <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
            {productCategories.map((category) => {
              const sample = categoryCover(category.slug)
              return (
                <li key={category.slug} className="h-full">
                  <article className="tile group flex h-full flex-col overflow-hidden">
                    <div className="aspect-[3/2] overflow-hidden border-b border-border">
                      {sample && (
                        <ProductImage
                          product={sample}
                          sizes="(min-width: 1280px) 200px, (min-width: 640px) 33vw, 50vw"
                          className="transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-sm font-semibold leading-snug">
                        <Link
                          href={`/products/${category.slug}`}
                          className="after:absolute after:inset-0 hover:text-primary"
                        >
                          {category.name}
                        </Link>
                      </h3>
                      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{category.tagline}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                        {countByCategory(category.slug)} products
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* Explorer */}
      <Section tone="paper" spacing="tight" id="catalogue">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Search the catalogue</h2>
          <div className="mt-8">
            <Suspense fallback={<div className="h-12 animate-pulse rounded-md bg-muted" />}>
              <ProductExplorer />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Server-rendered index: every product link is in the initial HTML for crawlers and no-JS visitors. */}
      <Section tone="muted" spacing="tight" id="all-products">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Full product list</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            All {productsDatabase.length} catalogued products by category, with CAS numbers where held. Many more are
            available on request — send us the name or CAS number.
          </p>
          <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category) => (
              <section key={category.slug} aria-labelledby={`list-${category.slug}`}>
                <h3 id={`list-${category.slug}`} className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                  <Link href={`/products/${category.slug}`} className="hover:underline">
                    {category.name}
                  </Link>
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {getProductsByCategory(category.slug).map((product) => (
                    <li key={product.slug} className="flex items-baseline justify-between gap-3 text-sm">
                      <Link href={productHref(product)} className="text-foreground hover:text-primary hover:underline">
                        {product.name}
                      </Link>
                      {product.casNumber && (
                        <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                          {product.casNumber}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Not finding what you need?"
        description="Send us the product name and specification. If we can source it, we will tell you — and if we cannot, we will say so."
      />
    </>
  )
}
