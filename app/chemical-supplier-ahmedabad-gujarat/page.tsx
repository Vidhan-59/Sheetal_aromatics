import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { FaqList } from "@/components/faq-list"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { faqSchema, localBusinessSchema, pageMetadata } from "@/lib/seo"
import {
  addressLines,
  addressSingleLine,
  directionsLink,
  mapsEmbed,
  siteConfig,
  whatsappLink,
  yearsOfExperience,
} from "@/lib/site-config"
import { countByCategory, productCategories, productsDatabase } from "@/lib/products-data"
import { pluralize } from "@/lib/utils"

/*
  Local landing page for Ahmedabad and Gujarat buyers. Every statement comes from
  lib/site-config.ts (address, hours, registrations, export reach) or the
  catalogue; nothing about delivery times, stock or prices is claimed.
*/

const path = "/chemical-supplier-ahmedabad-gujarat"

export const metadata: Metadata = pageMetadata({
  title: "Chemical Supplier in Ahmedabad & Gujarat | Sheetal Aromatics",
  description: `Chemical supplier in Ahmedabad since ${siteConfig.establishedYear}: ${productsDatabase.length} catalogued products, GST invoicing, custom packing and despatch across Gujarat and India.`,
  path,
  keywords: [
    "chemical supplier Ahmedabad",
    "chemical supplier in Gujarat",
    "chemical trader Ahmedabad",
    "chemical dealer Ahmedabad",
    "aromatic chemicals Ahmedabad",
    "phase transfer catalyst supplier Gujarat",
  ],
})

const gstin = siteConfig.registrations.find((r) => r.label.startsWith("GST"))?.value

const reasons = [
  {
    title: "Partners answer the enquiry",
    body: `The firm is run by ${siteConfig.partners.map((p) => p.name).join(" and ")}. The people who source the material are the people you speak to.`,
  },
  {
    title: "Specification first, then the quote",
    body: "Grade, assay, packing and documents are confirmed against your requirement before a price is given, so the material matches what your process needs.",
  },
  {
    title: "GST-registered local supplier",
    body: `Domestic supplies are invoiced under our GSTIN${gstin ? ` ${gstin}` : ""}, and the IEC lets the same order route serve export buyers.`,
  },
  {
    title: "Custom packing and private label",
    body: "Pack sizes are agreed per product, and products can be supplied under your own brand.",
  },
]

const steps = [
  ["Send the requirement", "Product name or CAS number, quantity, grade and the city or plant it is going to."],
  ["Specification confirmed", "We confirm what can be supplied against your specification, with documents on request."],
  ["Quotation", "Price, packing, despatch arrangement and lead time are quoted for that order."],
  ["Despatch", "Material is packed as agreed and despatched from Ahmedabad, or collection is arranged by discussion."],
]

const faqs = [
  {
    question: "Where is Sheetal Aromatics located in Ahmedabad?",
    answer: `Our office is at ${addressSingleLine}, near Kamod Circle on the Old Ahmedabad–Bhavnagar Highway. It is open ${siteConfig.businessHours.summary}; Sunday is closed. Call ahead before visiting so the right partner is available.`,
  },
  {
    question: "Which chemicals do you supply in Ahmedabad and Gujarat?",
    answer: `The online catalogue lists ${productsDatabase.length} products across ${productCategories.length} categories: aromatic chemicals, essential oils, Ayurvedic raw materials, metals, pharma intermediates, phase transfer catalysts, food and pharma ingredients and specialty chemicals. ${siteConfig.productPortfolio} products can be sourced on request.`,
  },
  {
    question: "Do you supply outside Gujarat?",
    answer: `Yes. We supply manufacturers and distributors across India from Ahmedabad and export to buyers in ${siteConfig.exportCountries} countries. Packing and documents are agreed for each destination with the quotation.`,
  },
  {
    question: "Do you issue GST invoices?",
    answer: `Yes. Sheetal Aromatics is GST-registered${gstin ? ` (GSTIN ${gstin})` : ""}, so domestic supplies are invoiced with GST. Share your GST details with the enquiry so the quotation and invoice are made out correctly.`,
  },
  {
    question: "How quickly do you reply to an enquiry?",
    answer: "Enquiries are answered by the partners directly during business hours. For an urgent requirement, call or WhatsApp with the product, quantity and specification so we can check availability straight away.",
  },
]

export default function LocalSupplierPage() {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), faqSchema(faqs)]} />
      <Breadcrumbs trail={[{ name: "Chemical supplier in Ahmedabad", href: path }]} />

      <Section tone="paper" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <SectionHeading
              as="h1"
              eyebrow={`Ahmedabad, Gujarat · since ${siteConfig.establishedYear}`}
              title="Chemical supplier in Ahmedabad, serving Gujarat and India"
              description={
                <>
                  <p>
                    {siteConfig.name} is a {siteConfig.legalForm.toLowerCase()} on the Old Ahmedabad–Bhavnagar Highway at
                    Paldi Kankaj, Tal. Daskroi. For {yearsOfExperience}+ years we have supplied aromatic chemicals,
                    essential oils, Ayurvedic raw materials, metals, pharma intermediates, phase transfer catalysts, food &amp;
                    pharma ingredients and specialty chemicals to
                    manufacturers, formulators and distributors in Ahmedabad, across Gujarat and throughout India.
                  </p>
                  <p className="mt-4">
                    Every order starts from your specification. Tell us the product, grade, quantity and where it needs to
                    go, and we confirm what can be supplied before quoting.
                  </p>
                </>
              }
            />

            <aside className="rounded-lg border border-border bg-card p-7">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Office</h2>
              <address className="mt-4 flex gap-3 text-sm not-italic leading-relaxed">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  <span className="block font-medium">{siteConfig.name}</span>
                  {addressLines.map((line) => (
                    <span key={line} className="block text-muted-foreground">
                      {line}
                    </span>
                  ))}
                </span>
              </address>
              <p className="mt-4 flex gap-3 text-sm text-muted-foreground">
                <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {siteConfig.businessHours.summary}
                  <span className="block">{siteConfig.businessHours.closed}</span>
                </span>
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {[siteConfig.contact.phonePrimary, siteConfig.contact.phoneSecondary].map((phone) => (
                  <li key={phone.e164} className="flex gap-3">
                    <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <a href={`tel:${phone.e164}`} className="hover:text-primary">
                      {phone.display} <span className="text-muted-foreground">({phone.contactName})</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/request-a-quote">Request a quote</Link>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={whatsappLink("Hello, I am looking for a chemical supplier in Ahmedabad. My requirement is:")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden="true" className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="muted" spacing="tight">
        <Container>
          <SectionHeading
            eyebrow="Product range"
            title="What we supply from Ahmedabad"
            description={`${productsDatabase.length} products are listed online; ${siteConfig.productPortfolio} can be sourced on request. Each category page lists the products with CAS numbers and typical grades.`}
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/${category.slug}`}
                  className="group flex h-full flex-col rounded-md border border-border bg-card p-5 transition-colors hover:border-forest-300 hover:bg-secondary"
                >
                  <span className="text-sm font-semibold group-hover:text-primary">{category.name}</span>
                  <span className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{category.tagline}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                    {pluralize(countByCategory(category.slug), "product")}
                    <ArrowRight aria-hidden="true" className="h-3 w-3" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Why Gujarat buyers work with us</h2>
              <ul className="mt-6 space-y-6">
                {reasons.map((reason) => (
                  <li key={reason.title}>
                    <h3 className="text-base font-semibold">{reason.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <Link href="/private-label" className="link-underline text-sm">
                  Private labelling
                </Link>
                <span className="mx-2 text-muted-foreground">·</span>
                <Link href="/export" className="link-underline text-sm">
                  Export from Gujarat
                </Link>
                <span className="mx-2 text-muted-foreground">·</span>
                <Link href="/industries" className="link-underline text-sm">
                  Industries we supply
                </Link>
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">How a local order works</h2>
              <ol className="mt-6 space-y-px overflow-hidden rounded-lg border border-border bg-border">
                {steps.map(([title, body], i) => (
                  <li key={title} className="flex gap-4 bg-card p-5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-xs text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted" spacing="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Questions from local buyers</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Anything specific to your order is confirmed with the quotation.
              </p>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>

      <Section tone="paper" spacing="tight">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight">Find us</h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <iframe
              title={`Map showing the location of ${siteConfig.name} in Ahmedabad, Gujarat`}
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full border-0"
            />
          </div>
          <a
            href={directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-3 text-sm"
          >
            <Navigation aria-hidden="true" className="h-3.5 w-3.5" />
            Get directions
          </a>
        </Container>
      </Section>

      <CtaBand
        title="Send your requirement"
        description="Product, quantity, specification and delivery location are all we need to start."
      />
    </>
  )
}
