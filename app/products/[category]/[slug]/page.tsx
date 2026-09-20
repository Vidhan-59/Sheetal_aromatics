import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Info, Mail, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, DataRow, Section } from "@/components/layout-primitives"
import { MolecularFormula, ProductVisual } from "@/components/product-visual"
import { ProductCard } from "@/components/product-card"
import { QuoteForm } from "@/components/quote-form"
import { JsonLd } from "@/components/json-ld"
import { BASE_URL, pageMetadata, productSchema } from "@/lib/seo"
import { mailtoLink, productEnquiryMessage, siteConfig, whatsappLink } from "@/lib/site-config"
import {
  categoryName,
  getCategory,
  getProduct,
  getRelatedProducts,
  productSeoDescription,
  productSeoTitle,
  productsDatabase,
} from "@/lib/products-data"

type Params = Promise<{ category: string; slug: string }>

export function generateStaticParams() {
  return productsDatabase.map((product) => ({ category: product.category, slug: product.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category, slug } = await params
  const product = getProduct(category, slug)
  if (!product) return {}

  return pageMetadata({
    title: productSeoTitle(product),
    description: productSeoDescription(product),
    path: `/products/${product.category}/${product.slug}`,
    ogImage: `${BASE_URL}/products/${product.category}/${product.slug}/opengraph-image`,
    keywords: [
      `${product.name} supplier`,
      `${product.name} exporter`,
      ...(product.casNumber ? [`CAS ${product.casNumber}`] : []),
      ...product.keywords.slice(0, 6),
    ],
  })
}

export default async function ProductPage({ params }: { params: Params }) {
  const { category: categorySlug, slug } = await params
  const product = getProduct(categorySlug, slug)
  if (!product) notFound()

  const category = getCategory(product.category)!
  const related = getRelatedProducts(product)
  const enquiry = productEnquiryMessage(product.name)

  const specs: { label: string; value: React.ReactNode }[] = [
    { label: "Product name", value: product.name },
    ...(product.casNumber ? [{ label: "CAS number", value: product.casNumber }] : []),
    ...(product.molecularFormula
      ? [{ label: "Molecular formula", value: <MolecularFormula formula={product.molecularFormula} /> }]
      : []),
    ...(product.molecularWeight ? [{ label: "Molecular weight", value: product.molecularWeight }] : []),
    ...(product.physicalForm ? [{ label: "Physical form", value: product.physicalForm }] : []),
    ...(product.appearance ? [{ label: "Appearance", value: product.appearance }] : []),
    ...(product.odor ? [{ label: "Odour", value: product.odor }] : []),
    ...(product.typicalGrade ? [{ label: "Typical grade offered", value: product.typicalGrade }] : []),
    ...(product.meltingPoint ? [{ label: "Melting point", value: product.meltingPoint }] : []),
    ...(product.boilingPoint ? [{ label: "Boiling point", value: product.boilingPoint }] : []),
    ...(product.density ? [{ label: "Density", value: product.density }] : []),
    ...(product.solubility ? [{ label: "Solubility", value: product.solubility }] : []),
  ]

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <Breadcrumbs
        trail={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
          { name: product.name, href: `/products/${category.slug}/${product.slug}` },
        ]}
      />

      {/* ------------------------------ Overview --------------------------- */}
      <Section tone="paper" spacing="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-lg border border-border bg-muted">
              <div className="relative aspect-[4/3]">
                <ProductVisual product={product} />
                {product.molecularFormula && (
                  <MolecularFormula
                    formula={product.molecularFormula}
                    className="absolute bottom-4 left-4 rounded-sm bg-background/90 px-2.5 py-1.5 text-sm font-semibold text-foreground shadow-sm"
                  />
                )}
                {product.casNumber && (
                  <span className="absolute bottom-4 right-4 rounded-sm bg-background/90 px-2.5 py-1.5 font-mono text-xs tabular-nums text-muted-foreground shadow-sm">
                    CAS {product.casNumber}
                  </span>
                )}
              </div>
              <p className="border-t border-border bg-card px-4 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
                Technical illustration generated from this product&apos;s own record — physical form
                {product.molecularFormula ? " and molecular formula" : ""}. Not a photograph of supplied material.
              </p>
            </div>

            <div>
              <Link
                href={`/products/${category.slug}`}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-accent hover:underline"
              >
                {category.name}
                {product.group ? ` · ${product.group}` : ""}
              </Link>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>

              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.summary}</p>

              {product.overview && (
                <p className="mt-4 leading-relaxed text-muted-foreground">{product.overview}</p>
              )}

              {(product.casNumber || product.molecularFormula) && (
                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-5">
                  {product.casNumber && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">CAS number</dt>
                      <dd className="mt-1 font-mono text-sm font-medium">{product.casNumber}</dd>
                    </div>
                  )}
                  {product.molecularFormula && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Formula</dt>
                      <dd className="mt-1 text-sm font-medium">
                        <MolecularFormula formula={product.molecularFormula} />
                      </dd>
                    </div>
                  )}
                  {product.physicalForm && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Form</dt>
                      <dd className="mt-1 text-sm font-medium">{product.physicalForm}</dd>
                    </div>
                  )}
                </dl>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#enquiry">Request Product Quote</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={whatsappLink(enquiry)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden="true" className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href={mailtoLink(`Enquiry: ${product.name}`, enquiry)}>
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    Email
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Price, minimum order quantity, packing and lead time are confirmed per enquiry.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------- Detail columns ------------------------- */}
      <Section tone="muted" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Product information</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Only identifiers and properties we hold for this product are listed. Anything not shown here is
                confirmed against your enquiry rather than assumed.
              </p>

              <dl className="mt-6 rounded-lg border border-border bg-card px-5">
                {specs.map((spec) => (
                  <DataRow key={spec.label} label={spec.label} value={spec.value} />
                ))}
                <DataRow label="Purity / assay" value="Confirmed against your specification on enquiry" />
                <DataRow label="Packing" value="Confirmed on enquiry" />
                <DataRow label="Origin" value="Confirmed on enquiry" />
                <DataRow label="Documentation" value="Available on request for a specific enquiry" />
              </dl>

              {product.storage && (
                <div className="mt-6 rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold">Storage &amp; handling</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.storage}</p>
                </div>
              )}

              {product.technicalNote && (
                <div className="mt-6 flex gap-3 rounded-lg border border-brass-500/35 bg-brass-100/45 p-5 dark:bg-secondary">
                  <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brass-700" />
                  <div>
                    <h3 className="text-sm font-semibold">General technical information</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.technicalNote}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Applications</h2>
                <ul className="mt-4 space-y-2">
                  {product.applications.map((application) => (
                    <li key={application} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span aria-hidden="true" className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {application}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Listed applications describe where this type of material is commonly used. Suitability for your
                  process should be confirmed against the specification agreed for your order.
                </p>
              </div>

              {product.synonyms && product.synonyms.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">Also known as</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {product.synonyms.map((synonym) => (
                      <li
                        key={synonym}
                        className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        {synonym}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------ Enquiry ---------------------------- */}
      <Section tone="paper" spacing="tight" id="enquiry">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Request a quote for {product.name}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The form is pre-filled with this product. Add your quantity, required specification and destination and
                we will respond with availability and a quotation.
              </p>
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p>
                  Prefer to write directly?{" "}
                  <a
                    href={mailtoLink(`Enquiry: ${product.name}`, enquiry)}
                    className="link-underline text-sm"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
                <p>
                  Or call{" "}
                  <a href={`tel:${siteConfig.contact.phonePrimary.e164}`} className="link-underline text-sm">
                    {siteConfig.contact.phonePrimary.display}
                  </a>
                </p>
              </div>
            </div>

            <QuoteForm defaultProduct={product.name} defaultMessage={enquiry} />
          </div>
        </Container>
      </Section>

      {/* ------------------------------ Related ---------------------------- */}
      {related.length > 0 && (
        <Section tone="muted" spacing="tight">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">Related products</h2>
              <Link href={`/products/${category.slug}`} className="link-underline text-sm">
                All {category.name.toLowerCase()}
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug} className="h-full">
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  )
}
