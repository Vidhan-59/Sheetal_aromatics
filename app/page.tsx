import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, Globe2, PackageSearch, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container, Eyebrow, Section, SectionHeading } from "@/components/layout-primitives"
import { Reveal } from "@/components/reveal"
import { ProductVisual } from "@/components/product-visual"
import { CtaBand } from "@/components/cta-band"
import { FaqList } from "@/components/faq-list"
import { JsonLd } from "@/components/json-ld"
import { pageMetadata, faqSchema } from "@/lib/seo"
import { siteConfig, yearsOfExperience } from "@/lib/site-config"
import { featuredFaqs } from "@/lib/faqs"
import {
  countByCategory,
  getProductBySlug,
  productCategories,
  productsDatabase,
} from "@/lib/products-data"

export const metadata: Metadata = pageMetadata({
  title: "Sheetal Aromatics | Chemical & Natural Product Supplier and Exporter, India",
  description:
    "Aromatic chemicals, essential oils, Ayurvedic products, metals and pharma intermediates for B2B and export buyers. Ahmedabad, India — established 2005.",
  path: "/",
  keywords: [
    "chemical supplier India",
    "chemical exporter India",
    "aromatic chemicals supplier",
    "essential oil supplier India",
    "Ayurvedic products supplier India",
    "pharma intermediates supplier",
    "chemical supplier Ahmedabad",
    "Sheetal Aromatics",
  ],
})

/* Representative products used for the hero mosaic — one per category so the
   range is visible at a glance rather than described. */
const heroSamples = [
  "benzyl-acetate",
  "lemongrass-oil",
  "ashwagandha",
  "sodium-metal",
  "2-mercapto-5-methoxybenzimidazole",
  "menthol",
]
  .map((slug) => getProductBySlug(slug))
  .filter(Boolean)

const capabilities = [
  {
    icon: PackageSearch,
    title: "Specification-led sourcing",
    body: "Enquiries are handled against the grade, assay and packing you actually work to — not a fixed catalogue item that nearly fits.",
  },
  {
    icon: Globe2,
    title: "Export-oriented supply",
    body: `We hold an Importer Exporter Code (${siteConfig.registrations[1].value}) and handle enquiries from buyers outside India alongside domestic supply.`,
  },
  {
    icon: FileText,
    title: "Documentation on request",
    body: "Product specifications and the documentation your side requires are confirmed against each enquiry before an order is placed.",
  },
  {
    icon: ShieldCheck,
    title: "Consistent, direct contact",
    body: "The firm is run by its partners. Enquiries are answered by the people who source the material, not routed through a queue.",
  },
]

export default function HomePage() {
  const stats = [
    { value: `${yearsOfExperience}+`, label: "Years in the industry" },
    { value: String(productCategories.length), label: "Product categories" },
    { value: `${productsDatabase.length}`, label: "Products listed" },
    { value: String(siteConfig.establishedYear), label: "Established" },
  ]

  return (
    <>
      <JsonLd data={faqSchema(featuredFaqs)} />

      {/* ------------------------------- Hero ------------------------------ */}
      <section className="relative overflow-hidden bg-forest-900 text-white">
        <div aria-hidden="true" className="grid-texture absolute inset-0 opacity-70" />
        <div
          aria-hidden="true"
          className="absolute -right-40 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-forest-700/40 blur-3xl"
        />

        <Container className="relative grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-28">
          <div>
            <Eyebrow className="text-brass-400">
              Established {siteConfig.establishedYear} · Ahmedabad, India
            </Eyebrow>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Chemical, aromatic and natural product supply for global markets
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-100/85">
              {yearsOfExperience}+ years supplying aromatic chemicals, essential oils, Ayurvedic products, metals and
              pharma intermediates to manufacturers, distributors, importers and procurement teams.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="inverted">
                <Link href="/request-a-quote">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline-inverted">
                <Link href="/products">
                  Explore Products
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-semibold tabular-nums text-white">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-forest-100/65">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Product mosaic */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-3 gap-3">
              {heroSamples.map((product, i) => (
                <div
                  key={product!.slug}
                  className={`overflow-hidden rounded-lg border border-white/15 shadow-2xl ${
                    i % 2 === 0 ? "translate-y-5" : ""
                  }`}
                >
                  <div className="aspect-square">
                    <ProductVisual product={product!} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------- Trust strip --------------------------- */}
      <div className="border-b border-border bg-muted">
        <Container>
          <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {[
              { k: "Constitution", v: `${siteConfig.legalForm}, Gujarat` },
              { k: "GST", v: siteConfig.registrations[0].value },
              { k: "IEC", v: siteConfig.registrations[1].value },
              { k: "Enquiries", v: "Export & domestic, B2B only" },
            ].map((item) => (
              <li key={item.k} className="px-0 py-4 lg:px-6 lg:first:pl-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.k}</p>
                <p className="mt-1 font-medium">{item.v}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* ---------------------------- Categories --------------------------- */}
      <Section tone="paper">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Product range"
              title="Five product groups, one point of contact"
              description="Browse the catalogue by category, or search for a product name or CAS number. Every product page carries the identifiers we hold and a direct route to an enquiry."
            />
            <Link href="/products" className="link-underline pb-2">
              View all products
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, i) => {
              const sample = productsDatabase.find((p) => p.category === category.slug)
              return (
                <Reveal as="li" key={category.slug} delay={i * 60} className="h-full">
                  <article className="tile group flex h-full flex-col overflow-hidden">
                    <div className="aspect-[16/9] overflow-hidden border-b border-border">
                      {sample && (
                        <ProductVisual
                          product={sample}
                          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-lg font-semibold">
                          <Link href={`/products/${category.slug}`} className="after:absolute after:inset-0 hover:text-primary">
                            {category.name}
                          </Link>
                        </h3>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                          {countByCategory(category.slug)} products
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {category.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        View products
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </article>
                </Reveal>
              )
            })}

            <Reveal as="li" delay={productCategories.length * 60} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-lg border border-dashed border-forest-300 bg-forest-50 p-6 dark:bg-secondary">
                <div>
                  <h3 className="text-lg font-semibold">Looking for something not listed?</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Our catalogue reflects what we supply most often. If you need a related product or a different
                    grade, send the specification and we will tell you what can be arranged.
                  </p>
                </div>
                <Button asChild variant="outline" className="mt-6 self-start">
                  <Link href="/request-a-quote">Send a specification</Link>
                </Button>
              </div>
            </Reveal>
          </ul>
        </Container>
      </Section>

      {/* --------------------------- Capabilities -------------------------- */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading
              eyebrow={`${yearsOfExperience}+ years of trusted product & export experience`}
              title="How we work with buyers"
              description={
                <>
                  <p>
                    Sheetal Aromatics has been supplying chemical and natural products since{" "}
                    {siteConfig.establishedYear}. Two decades in the same trade means we know the material, the
                    paperwork and the questions a serious buyer needs answered before placing an order.
                  </p>
                  <p className="mt-4">
                    We are a {siteConfig.legalForm.toLowerCase()} run by its partners, {" "}
                    {siteConfig.partners.map((p) => p.name).join(" and ")}.
                  </p>
                </>
              }
            />

            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {capabilities.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 70}>
                  <item.icon aria-hidden="true" className="h-6 w-6 text-accent" />
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ------------------------------ Export ----------------------------- */}
      <Section tone="paper">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Global supply & export"
                title="Built around how international buyers actually procure"
                description="Overseas enquiries need more than a price. They need the specification confirmed, the packing agreed, the paperwork lined up and someone who replies. That is the part we have spent two decades getting right."
              />
              <Button asChild variant="outline" className="mt-8">
                <Link href="/export">
                  How we handle export enquiries
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <ol className="relative space-y-8 border-l border-border pl-8">
              {[
                ["Enquiry", "You send the product, quantity, specification and destination."],
                ["Confirmation", "We confirm what can be supplied and against which specification."],
                ["Quotation", "Pricing, packing and terms are quoted for your requirement."],
                ["Documentation", "Paperwork is prepared for the agreed terms and destination."],
                ["Despatch", "Shipment is coordinated and tracked through to delivery."],
              ].map(([title, body], i) => (
                <Reveal as="li" key={title} delay={i * 60} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.3rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[11px] font-semibold tabular-nums text-accent"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* -------------------------------- FAQ ------------------------------ */}
      <Section tone="muted" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <SectionHeading eyebrow="Before you enquire" title="Questions buyers ask us first" />
            <div>
              <FaqList items={featuredFaqs} />
              <Link href="/faq" className="link-underline mt-6 inline-flex">
                All buyer FAQs
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Send us your specification"
        description="Tell us the product, quantity, grade and destination. We will come back with availability and a quotation."
      />
    </>
  )
}
