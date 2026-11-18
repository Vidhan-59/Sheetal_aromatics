import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Boxes, ClipboardList, FileCheck2, MessageSquare, Ship, TriangleAlert } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { SiteImage } from "@/components/site-media"
import { Parallax } from "@/components/motion"
import { Reveal } from "@/components/reveal"
import { CtaBand } from "@/components/cta-band"
import { JsonLd } from "@/components/json-ld"
import { exportServiceSchema, faqSchema, pageMetadata } from "@/lib/seo"
import { siteConfig, yearsOfExperience } from "@/lib/site-config"

export const metadata: Metadata = pageMetadata({
  title: "Chemical Exporter from India",
  description:
    "Exporting to buyers in 5+ countries from Ahmedabad: specification, packing, documentation and shipment coordination for B2B importers. IEC 0805014608.",
  path: "/export",
  keywords: [
    "chemical exporter India",
    "chemical exporter Ahmedabad",
    "export aromatic chemicals",
    "essential oil exporter India",
    "Ayurvedic products exporter India",
    "B2B chemical export supplier",
  ],
})

const stages = [
  {
    icon: ClipboardList,
    title: "Enquiry & specification",
    body: "You send the product, quantity, the specification or grade you work to, your required packing and the destination. We confirm what can be supplied against those requirements before quoting.",
  },
  {
    icon: MessageSquare,
    title: "Commercial discussion",
    body: "Pricing, incoterms, payment terms and lead time are discussed openly. If something in your requirement is going to be a problem, you hear it at this stage rather than later.",
  },
  {
    icon: Boxes,
    title: "Packing & labelling",
    body: "Packing is agreed for the product, the quantity and the transport mode. Tell us if your side or your destination requires a particular pack size, marking or labelling standard.",
  },
  {
    icon: FileCheck2,
    title: "Documentation",
    body: "Documentation is prepared according to the product, the destination and the agreed terms. Confirm what your importer, bank or customs broker needs and we will work to that list.",
  },
  {
    icon: Ship,
    title: "Shipment coordination",
    body: "Despatch is coordinated with your forwarder or ours, and tracked through to delivery. Communication continues after despatch, not just up to it.",
  },
]

const iec = siteConfig.registrations.find((r) => r.label.startsWith("Importer"))?.value ?? ""

/** One answer-first sentence: who we are, what we export, from where, on which terms. */
const exportSummary = `Sheetal Aromatics supplies aromatic chemicals, phase transfer catalysts, pharma intermediates, essential oils, Ayurvedic raw materials and food & pharma ingredients from Ahmedabad, India to B2B buyers in ${siteConfig.exportCountries} countries, shipping from Mundra, Kandla, Hazira or Nhava Sheva on EXW, FOB, CFR or CIF terms.`

/** Shipping terms, as set out in the company's own export process (BUSINESS-README §9). */
const shippingTerms = [
  ["EXW Ahmedabad", "You or your forwarder collect from our premises in Ahmedabad, Gujarat."],
  ["FOB Indian port", "We deliver the goods, cleared for export, on board at the Indian port of loading."],
  ["CFR / CIF your port", "We arrange sea freight to your named port; CIF adds cargo insurance."],
]

const ports = ["Mundra", "Kandla (Deendayal)", "Hazira", "Nhava Sheva (JNPT)"]

const exportDocuments = [
  ["Certificate of analysis (COA)", "Batch test results against the agreed specification."],
  ["Safety data sheet (SDS / MSDS)", "16-section GHS format, for handling, storage and transport."],
  ["Method of analysis", "On request, where your QC team needs to reproduce a test."],
  ["Certificate of origin", "For customs and any preferential-duty claim at destination."],
  ["Commercial invoice & packing list", "Prepared to the agreed Incoterm, with weights per package."],
  ["Bill of lading / air waybill", "The transport document for sea or air shipments."],
  ["Dangerous-goods declaration", "For hazardous items such as sodium metal, with UN-certified packaging."],
]

/** Buyer questions answered from the company's published process. Also emitted as FAQPage. */
const exportFaqs = [
  {
    question: "Does Sheetal Aromatics export chemicals from India?",
    answer: `Yes. Sheetal Aromatics is a B2B supplier in Ahmedabad, Gujarat, holding Importer Exporter Code ${iec}, and supplies buyers in ${siteConfig.exportCountries} countries. The range covers aromatic chemicals, phase transfer catalysts, pharma intermediates, essential oils, Ayurvedic raw materials, metals and food & pharma ingredients, quoted against the buyer's own specification.`,
  },
  {
    question: "Which Indian ports do you ship from?",
    answer:
      "Export shipments leave from Mundra, Kandla (Deendayal), Hazira or Nhava Sheva (JNPT) on India's west coast. The port is chosen for each order to suit the destination, the cargo and the agreed terms, and you can name a preferred port of loading with your enquiry.",
  },
  {
    question: "Which Incoterms do you quote?",
    answer:
      "We quote EXW Ahmedabad, FOB Indian port, or CFR / CIF to your named port. State the Incoterm and destination port in your enquiry so the quotation includes the right freight, insurance and documents. If you use your own forwarder, EXW or FOB is usually simplest.",
  },
  {
    question: "What documents come with an export shipment?",
    answer:
      "A certificate of analysis, a safety data sheet (GHS, 16 sections), the commercial invoice, packing list, certificate of origin and the bill of lading or air waybill. A method of analysis is available on request, and hazardous goods also carry a dangerous-goods declaration. Tell us any extra document your importer, bank or broker needs.",
  },
  {
    question: "Can I order a sample before a full shipment?",
    answer:
      "Yes. New buyers usually move from a sample to a trial lot and then to regular orders. Sample terms are confirmed against a specific enquiry, so include the product, the specification you are testing against and the delivery address when you ask for one.",
  },
  {
    question: "How are export shipments packed?",
    answer:
      "Packing is confirmed per order. Typical export packs are HDPE or MS drums or IBCs for liquids, and lined bags or fibre drums for powders, palletised and stretch-wrapped. Dangerous goods travel in UN-certified packaging. Custom pack sizes, labelling and private labelling are available on request.",
  },
  {
    question: "Can you export dangerous goods such as sodium metal?",
    answer:
      "Sodium metal (UN 1428, Class 4.3) and other hazardous items are handled one enquiry at a time. Packing, labelling, the dangerous-goods declaration and the route are agreed before despatch, and some destinations or transport modes may not be possible. We say so plainly at enquiry stage.",
  },
  {
    question: "Who handles my export enquiry, and when?",
    answer: `Enquiries are answered directly by the two partners, ${siteConfig.partners.map((p) => p.name).join(" and ")}, by email, phone or WhatsApp, Monday to Saturday, 9:00 to 18:00 India Standard Time (UTC+5:30). The same people stay on your account from quotation to delivery.`,
  },
]

const checklist = [
  ["Product name", "The exact product, and any synonym or CAS number you use internally."],
  ["Quantity", "Trial quantity or regular volume — both are useful to know."],
  ["Specification", "The grade, assay or marker you work to, plus any impurity limits."],
  ["Packing", "Required pack size, material and any labelling standard on your side."],
  ["Destination", "Port or city, plus your preferred incoterms if you have them."],
  ["End use", "Helps us confirm suitability and any handling or regulatory constraints."],
]

export default function ExportPage() {
  return (
    <>
      <JsonLd data={[exportServiceSchema(exportSummary), faqSchema(exportFaqs)]} />
      <Breadcrumbs trail={[{ name: "Export", href: "/export" }]} />

      <section className="relative overflow-hidden bg-forest-900 text-white">
        <Parallax speed={0.14}>
          <SiteImage name="warehouse" priority sizes="(max-width: 767px) 480px, 100vw" />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-900/85 to-forest-900/40"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-brass-400">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              Global supply &amp; export
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Supplying international buyers, on their terms
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-forest-100/85">
              Export business is procurement, not retail. Buyers abroad need the specification confirmed, the packing
              agreed, the paperwork lined up and a supplier who replies. After {yearsOfExperience}+ years, and with buyers in{" "}
              {siteConfig.exportCountries} countries, that is the part of the job we have built the business around.
            </p>
            <p className="mt-4 text-base leading-relaxed text-forest-100/80">{exportSummary}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/products" className="inline-flex items-center gap-1.5 text-white underline-offset-4 hover:underline">
                Browse the export catalogue
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/guides/importing-chemicals-from-india"
                className="inline-flex items-center gap-1.5 text-white underline-offset-4 hover:underline"
              >
                Importer&apos;s checklist
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <dl className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-forest-100/60">Importer Exporter Code</dt>
              <dd className="mt-1.5 font-mono text-lg font-medium">{siteConfig.registrations[1].value}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-forest-100/60">GST</dt>
              <dd className="mt-1.5 font-mono text-lg font-medium">{siteConfig.registrations[0].value}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-forest-100/60">Export reach</dt>
              <dd className="mt-1.5 text-lg font-medium">
                {siteConfig.exportCountries} countries, from Ahmedabad
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* Process */}
      <Section tone="paper">
        <Container>
          <SectionHeading
            eyebrow="How an export enquiry runs"
            title="Five stages, no surprises"
            description="Every enquiry follows the same route. It is not complicated, but doing each step properly is what keeps shipments from going wrong."
          />

          <ol className="mt-14 space-y-px overflow-hidden rounded-lg border border-border bg-border">
            {stages.map((stage, i) => (
              <Reveal as="li" key={stage.title} delay={i * 60}>
                <div className="flex flex-col gap-4 bg-card p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
                  <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
                    <stage.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                    <h3 className="text-base font-semibold">{stage.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:flex-1">{stage.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Terms, ports and documents */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Shipping terms & paperwork"
            title="Incoterms, ports and export documents"
            description="What a quotation from us can be based on, where shipments leave India, and the paperwork that travels with them."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold">Incoterms we quote</h3>
              <table className="mt-4 w-full text-left text-sm">
                <caption className="sr-only">Incoterms quoted by Sheetal Aromatics</caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    <th scope="col" className="py-2 pr-4 font-medium">Term</th>
                    <th scope="col" className="py-2 font-medium">What it covers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {shippingTerms.map(([term, detail]) => (
                    <tr key={term}>
                      <th scope="row" className="py-3 pr-4 align-top font-semibold whitespace-nowrap">
                        {term}
                      </th>
                      <td className="py-3 leading-relaxed text-muted-foreground">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="mt-10 text-base font-semibold">Ports of loading</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Shipments leave from India&apos;s west coast, from the port that suits each order:
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ports.map((port) => (
                  <li key={port} className="rounded-full border border-border bg-card px-3 py-1 text-sm">
                    {port}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold">Export documents</h3>
              <table className="mt-4 w-full text-left text-sm">
                <caption className="sr-only">Documents supplied with export shipments</caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    <th scope="col" className="py-2 pr-4 font-medium">Document</th>
                    <th scope="col" className="py-2 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {exportDocuments.map(([doc, purpose]) => (
                    <tr key={doc}>
                      <th scope="row" className="py-3 pr-4 align-top font-semibold">
                        {doc}
                      </th>
                      <td className="py-3 leading-relaxed text-muted-foreground">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                New buyers usually move from a <strong className="font-semibold text-foreground">sample</strong> to a{" "}
                <strong className="font-semibold text-foreground">trial lot</strong> and then to regular orders. The{" "}
                <Link href="/guides/importing-chemicals-from-india" className="link-underline">
                  importer&apos;s checklist
                </Link>{" "}
                explains how these documents are used at customs.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Checklist */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="Before you write"
              title="Six details that get you a real quotation"
              description="Send these with your first message and you will get availability and pricing back, rather than a round of clarifying questions."
            />
            <dl className="divide-y divide-border border-y border-border">
              {checklist.map(([term, detail]) => (
                <div key={term} className="grid gap-1 py-5 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                  <dt className="text-sm font-semibold">{term}</dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Honest limits */}
      <Section tone="paper" spacing="tight">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="flex gap-4 rounded-lg border border-border bg-card p-7">
              <TriangleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <h2 className="text-base font-semibold">Restricted and hazardous materials</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Some products in our range — sodium metal in particular — are reactive or classified as dangerous
                  goods for transport. These enquiries are handled individually, and handling, packing and transport
                  arrangements are confirmed before any despatch. Certain destinations and end uses may not be
                  possible; we will tell you plainly if that is the case.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-7">
              <h2 className="text-base font-semibold">Ask about your destination</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We currently supply buyers in {siteConfig.exportCountries} countries. Whether we can supply your
                product to your destination depends on the material, its regulatory status there and the terms you
                need. Tell us where you are and what you need, and you will get a direct answer.
              </p>
              <Link href="/request-a-quote" className="link-underline mt-5 inline-flex text-sm">
                Send an export enquiry
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Export FAQ: answer-first passages for buyers and answer engines */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Export questions"
            title="Buying from India: questions overseas buyers ask"
            description="Short, direct answers about shipping, documents and samples. Anything not covered here is answered at enquiry stage."
          />
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {exportFaqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Start an export enquiry"
        description="Product, quantity, specification, packing and destination — that is all we need to come back with something useful."
      />
    </>
  )
}
