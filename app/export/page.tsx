import type { Metadata } from "next"
import Link from "next/link"
import { Boxes, ClipboardList, FileCheck2, MessageSquare, Ship, TriangleAlert } from "lucide-react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { Reveal } from "@/components/reveal"
import { CtaBand } from "@/components/cta-band"
import { pageMetadata } from "@/lib/seo"
import { siteConfig, yearsOfExperience } from "@/lib/site-config"

export const metadata: Metadata = pageMetadata({
  title: "Global Supply & Export from Ahmedabad, India",
  description:
    "How we handle export enquiries: specification, packing, documentation and shipment coordination for international B2B buyers. IEC 0805014608.",
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
      <Breadcrumbs trail={[{ name: "Export", href: "/export" }]} />

      <section className="relative overflow-hidden bg-forest-900 text-white">
        <div aria-hidden="true" className="grid-texture absolute inset-0 opacity-70" />
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
              agreed, the paperwork lined up and a supplier who replies. After {yearsOfExperience}+ years, that is the
              part of the job we have built the business around.
            </p>
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
              <dt className="text-xs uppercase tracking-[0.14em] text-forest-100/60">Despatch origin</dt>
              <dd className="mt-1.5 text-lg font-medium">Ahmedabad, Gujarat, India</dd>
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

      {/* Checklist */}
      <Section tone="muted">
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
                We do not publish a map of countries served, because what actually matters is whether we can supply
                your specific product to your specific destination under your terms — and that is a question worth
                answering properly rather than with a graphic. Tell us where you are and what you need, and you will
                get a direct answer.
              </p>
              <Link href="/request-a-quote" className="link-underline mt-5 inline-flex text-sm">
                Send an export enquiry
              </Link>
            </div>
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
