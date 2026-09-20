import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { ProductExplorer } from "@/components/product-explorer"
import { ProductVisual } from "@/components/product-visual"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { collectionSchema, pageMetadata } from "@/lib/seo"
import { countByCategory, productCategories, productsDatabase } from "@/lib/products-data"

export const metadata: Metadata = pageMetadata({
  title: "Products | Chemicals, Oils, Herbs & Intermediates",
  description: `Browse ${productsDatabase.length} products across ${productCategories.length} categories. Search by name or CAS number, filter by category and request a quotation.`,
  path: "/products",
  keywords: [
    "aromatic chemicals list",
    "essential oils supplier",
    "Ayurvedic products exporter",
    "pharma intermediates India",
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

      <Section tone="paper" spacing="tight">
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
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {productCategories.map((category) => {
              const sample = productsDatabase.find((p) => p.category === category.slug)
              return (
                <li key={category.slug} className="h-full">
                  <article className="tile group flex h-full flex-col overflow-hidden">
                    <div className="aspect-[3/2] overflow-hidden border-b border-border">
                      {sample && (
                        <ProductVisual
                          product={sample}
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

      <CtaBand
        title="Not finding what you need?"
        description="Send us the product name and specification. If we can source it, we will tell you — and if we cannot, we will say so."
      />
    </>
  )
}
