import type { Metadata } from "next"
import Link from "next/link"
import {
  Boxes,
  ClipboardList,
  FileCheck2,
  Globe2,
  MessageCircle,
  Package,
  PackageCheck,
  Search,
  Ship,
  Tag,
  Tags,
  Truck,
} from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { SiteImage } from "@/components/site-media"
import { Parallax } from "@/components/motion"
import { Reveal } from "@/components/reveal"
import { CtaBand } from "@/components/cta-band"
import { FaqList } from "@/components/faq-list"
import { JsonLd } from "@/components/json-ld"
import { QuoteForm } from "@/components/quote-form"
import { BASE_URL, faqSchema, pageMetadata } from "@/lib/seo"
import { siteConfig, whatsappLink } from "@/lib/site-config"
import { countByCategory, productCategories } from "@/lib/products-data"

export const metadata: Metadata = pageMetadata({
  title: "Private Label Chemical Supplier in India",
  description:
    "Source chemicals under your own brand: product sourcing, custom pack sizes, customer-specific labels and export packing from Ahmedabad, India, since 2005.",
  path: "/private-label",
  keywords: [
    "private label chemical supplier",
    "chemical private labelling India",
    "custom chemical packaging",
    "own brand chemical products",
    "chemical product branding",
    "private label chemical exporter",
    "bulk chemical packaging supplier",
  ],
})

const services = [
  { icon: Tag, title: "Private labelling", body: "Products packed under your brand name instead of ours." },
  { icon: Tags, title: "Custom product branding", body: "Your logo, product names and brand colours on the pack." },
  { icon: FileCheck2, title: "Customer-specific labels", body: "Label content to your artwork, languages and market rules." },
  { icon: Package, title: "Custom pack sizes", body: "Pack sizes agreed per product, from small packs to drums." },
  { icon: Search, title: "Product sourcing", body: "We find and supply the material against your specification." },
  { icon: Boxes, title: "Bulk chemical packaging", body: "Bulk quantities packed for your own filling or resale." },
  { icon: Ship, title: "Export-oriented packing", body: "Packing and marking for international shipment, where available." },
  { icon: PackageCheck, title: "Packaging to your requirements", body: "Pack material and format agreed with you before packing." },
]

const steps = [
  {
    icon: ClipboardList,
    title: "Share your product requirements",
    body: "Tell us the product, grade or specification, estimated quantity, target market and how you want it branded.",
  },
  {
    icon: Search,
    title: "Confirm sourcing and specifications",
    body: "We confirm what can be supplied against your specification, and the documents available for it.",
  },
  {
    icon: Tags,
    title: "Finalise packaging and branding",
    body: "Pack sizes, pack material, label content and artwork are agreed. You approve the final label before packing.",
  },
  {
    icon: FileCheck2,
    title: "Review samples and approvals",
    body: "Where available, samples and any approvals your market needs are reviewed before the first order.",
  },
  {
    icon: Truck,
    title: "Proceed with the agreed supply",
    body: "Orders are packed, labelled and despatched as agreed, for repeat supply under your brand.",
  },
]

const labelOptions = [
  ["Brand", "Your brand name, logo and colours"],
  ["Product details", "Product name, description, grade and net quantity"],
  ["Traceability", "Batch number, manufacturing and expiry or retest dates"],
  ["Safety & regulatory text", "Hazard, handling and labelling text your market requires"],
  ["Languages", "Label text in the languages your market needs"],
  ["Codes", "Barcodes or your own product codes"],
]

const faqs = [
  {
    question: "What is private labelling for chemicals?",
    answer:
      "Private labelling means a chemical product is sourced and packed for you, then sold under your brand name instead of the supplier's. Sheetal Aromatics handles the sourcing and packing to your requirements; you sell the product as your own.",
  },
  {
    question: "Who is private labelling suitable for?",
    answer:
      "It suits distributors, wholesalers and importers who want their own branded range, and new chemical brands that do not want to set up sourcing and packing themselves.",
  },
  {
    question: "Which products can be private-labelled?",
    answer:
      "Many products in our catalogue, across aromatic chemicals, specialty chemicals, food and pharma ingredients, essential oils and more. Availability for private labelling is confirmed per product, and hazardous materials carry extra packing and labelling requirements.",
  },
  {
    question: "What pack sizes are available?",
    answer:
      "Pack sizes are agreed per product and order. For example, denatonium benzoate powder is packed in 1 kg, 5 kg, 10 kg and 25 kg sizes, and its solutions in 25 L to 200 L. Tell us the sizes you need and we will confirm what is possible.",
  },
  {
    question: "Can you put our logo and label on the product?",
    answer:
      "Yes. Labels are prepared to your brand, artwork and content requirements, and you approve the final label before anything is packed. Regulatory text must meet the rules of the market where you sell.",
  },
  {
    question: "Is there a minimum order quantity for private label?",
    answer:
      "Minimum quantities depend on the product, the pack size and the label format, so they are confirmed with each quotation rather than fixed in advance.",
  },
  {
    question: "Can I see samples before the first order?",
    answer:
      "Samples and any approvals your market needs are discussed before the first order, where available for the product. Ask for them in your enquiry.",
  },
  {
    question: "Do you export private-label products?",
    answer: `Yes. We supply buyers across India and export to ${siteConfig.exportCountries} countries. Packing, marking and documents are agreed for your destination.`,
  },
  {
    question: "Is Sheetal Aromatics the manufacturer of private-label products?",
    answer:
      "Sheetal Aromatics is a chemical trading and custom-manufacturing firm. For most private-label products we source the material and pack it to your requirements; the documents available for each product are confirmed with the quotation.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/private-label#service`,
  name: "Private labelling and custom chemical packaging",
  serviceType: "Private label chemical supply",
  description:
    "Chemical product sourcing, custom pack sizes, customer-specific labels and private labelling under the buyer's brand, from Ahmedabad, India.",
  url: `${BASE_URL}/private-label`,
  provider: { "@id": `${BASE_URL}/#organization` },
}

export default function PrivateLabelPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs trail={[{ name: "Private Labelling", href: "/private-label" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-900 text-white">
        <Parallax speed={0.14}>
          <SiteImage name="plant" priority />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-900/85 to-forest-900/40"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-brass-400">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              Private labelling &amp; custom branding
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Build your own chemical brand with {siteConfig.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-forest-100/85">
              From product sourcing to custom packaging and private labelling, we help distributors, wholesalers,
              importers and new chemical brands sell products under their own name.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="accent">
                <a href="#private-label-enquiry">Start a private-label enquiry</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <a
                  href={whatsappLink("Hello, I'd like to discuss private labelling with Sheetal Aromatics.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  WhatsApp us
                </a>
              </Button>
            </div>
          </div>

          <dl className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-forest-100/60">Established</dt>
              <dd className="mt-1.5 text-lg font-medium">{siteConfig.establishedYear}, Ahmedabad</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-forest-100/60">Product portfolio</dt>
              <dd className="mt-1.5 text-lg font-medium">{siteConfig.productPortfolio} products</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-forest-100/60">Supply reach</dt>
              <dd className="mt-1.5 text-lg font-medium">India &amp; {siteConfig.exportCountries} countries</dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* Positioning */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="Your brand. Our chemical supply expertise."
              title="Your name on the pack, our sourcing behind it"
              description="Private labelling lets you build a branded range without setting up your own sourcing, filling and packing."
            />
            <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Whether you are an established distributor, a wholesaler, an importer or an emerging chemical brand, we
                work from your requirements: the product and specification, the pack sizes you sell, and how the label
                should look.
              </p>
              <p>
                We source the material, agree packaging and branding with you, and supply it ready for your customers.
                Everything specific to your order, including documents, minimum quantities and lead times, is confirmed
                with the quotation.
              </p>
              <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                {["Distributors & wholesalers", "Importers", "Private-label chemical brands", "Procurement & sourcing teams"].map(
                  (who) => (
                    <li key={who} className="flex items-center gap-2.5 text-sm text-foreground">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {who}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="What we arrange"
            title="Private-label services"
            description="Each service is agreed per product and order, so you get only what your range needs."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal as="li" key={service.title} delay={i * 40} className="bg-card p-6">
                <service.icon aria-hidden="true" className="h-5 w-5 text-accent" />
                <h3 className="mt-4 text-base font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="paper">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Five steps from requirement to repeat supply"
            description="The same route for every private-label project, so nothing is assumed along the way."
          />
          <ol className="mt-14 space-y-px overflow-hidden rounded-lg border border-border bg-border">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 60}>
                <div className="flex flex-col gap-4 bg-card p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
                  <div className="flex items-center gap-4 sm:w-72 sm:shrink-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-sm text-accent">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:flex-1">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Categories + packaging + labels */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Product categories supported</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Private labelling is available across our range. Availability for a specific product is confirmed with
                your enquiry.
              </p>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {productCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/products/${category.slug}`}
                      className="flex items-center justify-between gap-4 py-3.5 text-sm transition-colors hover:text-primary"
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground">{countByCategory(category.slug)} products</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Packaging options</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Pack sizes and materials are agreed per product. As an example, denatonium benzoate is packed as:
                </p>
                <dl className="mt-4 rounded-lg border border-border bg-card px-5 text-sm">
                  <div className="flex justify-between gap-4 border-b border-border py-3">
                    <dt className="text-muted-foreground">Powder</dt>
                    <dd className="font-medium">1 kg · 5 kg · 10 kg · 25 kg</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border py-3">
                    <dt className="text-muted-foreground">Liquid solution</dt>
                    <dd className="font-medium">25 L · 35 L · 50 L · 200 L</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-muted-foreground">Other sizes</dt>
                    <dd className="font-medium">On request</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Label &amp; branding options</h2>
                <dl className="mt-4 divide-y divide-border border-y border-border">
                  {labelOptions.map(([term, detail]) => (
                    <div key={term} className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6">
                      <dt className="text-sm font-semibold">{term}</dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">{detail}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  You approve the final artwork. Regulatory text must meet the rules of the market where the product is
                  sold.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Enquiry */}
      <Section tone="paper" id="private-label-enquiry">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-accent">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                Private-label enquiry
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Tell us about your brand</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Share the product, estimated quantity, packaging and branding you have in mind. We will come back with
                what can be supplied, the options for packing and labelling, and a quotation.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
                <Globe2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p>
                  Selling abroad? Include your destination country so packing, marking and documents can be planned for
                  it.
                </p>
              </div>
            </div>
            <QuoteForm kind="private-label" />
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Questions"
              title="Private labelling: common questions"
              description="Straight answers on how private-label supply works with us."
            />
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Start your private-label range"
        description="Product, quantity, packaging and branding: send what you have and we will help with the rest."
        primary={{ label: "Send a private-label enquiry", href: "#private-label-enquiry" }}
      />
    </>
  )
}
