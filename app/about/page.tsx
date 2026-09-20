import type { Metadata } from "next"
import Link from "next/link"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { Reveal } from "@/components/reveal"
import { CtaBand } from "@/components/cta-band"
import { pageMetadata } from "@/lib/seo"
import { addressLines, directionsLink, siteConfig, yearsOfExperience } from "@/lib/site-config"
import { productCategories, productsDatabase } from "@/lib/products-data"

export const metadata: Metadata = pageMetadata({
  title: "About Us | Chemical Supplier & Exporter Since 2005",
  description: `A partnership firm established in ${siteConfig.establishedYear} in Ahmedabad, Gujarat, supplying chemical and natural products to B2B and export customers.`,
  path: "/about",
  keywords: [
    "Sheetal Aromatics about",
    "chemical supplier Ahmedabad",
    "chemical exporter Gujarat",
    "partnership firm chemical supplier India",
  ],
})

/*
  The timeline is deliberately written in phases rather than dated milestones.
  Only two dates are on record — the year the firm was established and today —
  so inventing a year for each step would be fabrication.
*/
const timeline = [
  {
    phase: "Established",
    period: String(siteConfig.establishedYear),
    body: "Sheetal Aromatics is founded in Ahmedabad, Gujarat, as a partnership firm trading in aromatic chemicals and related products.",
  },
  {
    phase: "Industry experience",
    period: "Early years",
    body: "Steady work with fragrance compounders, flavour houses and formulators builds the product knowledge and supplier relationships the firm still runs on.",
  },
  {
    phase: "Product expansion",
    period: "Growth phase",
    body: "The range widens beyond aromatic chemicals into essential oils, Ayurvedic herbs and powders, high-purity metals and pharma intermediates.",
  },
  {
    phase: "Export focus",
    period: "Ongoing",
    body: `An Importer Exporter Code (${siteConfig.registrations[1].value}) supports enquiries from buyers outside India alongside continued domestic supply.`,
  },
  {
    phase: "Today",
    period: `${yearsOfExperience}+ years on`,
    body: `${productsDatabase.length} products across ${productCategories.length} categories, handled directly by the partners for B2B and export customers.`,
  },
]

const principles = [
  {
    title: "Say what we can actually supply",
    body: "If a grade or quantity is not something we can deliver reliably, we say so at enquiry stage rather than after an order is placed.",
  },
  {
    title: "Work from the buyer's specification",
    body: "Procurement teams have their own standards. We quote against those rather than pushing whatever is closest to hand.",
  },
  {
    title: "Keep the same people on the account",
    body: "The partners handle enquiries themselves, so the person you speak to knows the product and the history of your orders.",
  },
  {
    title: "Treat documentation as part of the product",
    body: "For export business, the paperwork matters as much as the material. It is agreed up front, not improvised at despatch.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "About Us", href: "/about" }]} />

      <Section tone="paper" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <SectionHeading
                as="h1"
                eyebrow={`Established ${siteConfig.establishedYear}`}
                title="Two decades supplying chemical and natural products"
                description={
                  <>
                    <p>
                      Sheetal Aromatics is a {siteConfig.legalForm.toLowerCase()} based in Ahmedabad, Gujarat. Since{" "}
                      {siteConfig.establishedYear} we have supplied aromatic chemicals, essential oils, Ayurvedic
                      products, metals and pharma intermediates to manufacturers, formulators, distributors and
                      importers.
                    </p>
                    <p className="mt-4">
                      The firm is run by its partners, {siteConfig.partners.map((p) => p.name).join(" and ")}. That
                      matters more than it sounds: the people who source the material are the people who answer your
                      enquiry, which is why specifications get confirmed properly and awkward questions get straight
                      answers.
                    </p>
                    <p className="mt-4">
                      We are a supplier and exporter, not a marketplace. The catalogue on this site reflects what we
                      handle regularly — and where we cannot help, we would rather tell you than take the order.
                    </p>
                  </>
                }
              />
            </div>

            <div className="lg:pt-24">
              <div className="rounded-lg border border-border bg-card p-7">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Company details</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Legal name</dt>
                    <dd className="mt-0.5 font-medium">{siteConfig.legalName}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Constitution</dt>
                    <dd className="mt-0.5 font-medium">{siteConfig.legalForm}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Established</dt>
                    <dd className="mt-0.5 font-medium">{siteConfig.establishedYear}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Partners</dt>
                    <dd className="mt-0.5 font-medium">
                      {siteConfig.partners.map((p) => (
                        <span key={p.name} className="block">
                          {p.name}
                        </span>
                      ))}
                    </dd>
                  </div>
                  {siteConfig.registrations.map((reg) => (
                    <div key={reg.label}>
                      <dt className="text-muted-foreground">{reg.label}</dt>
                      <dd className="mt-0.5 font-mono font-medium">{reg.value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-muted-foreground">Office</dt>
                    <dd className="mt-0.5 font-medium not-italic">
                      {addressLines.map((line) => (
                        <span key={line} className="block font-normal">
                          {line}
                        </span>
                      ))}
                      <a
                        href={directionsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline mt-2 text-sm"
                      >
                        Get directions
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="How the business developed"
            title={`From ${siteConfig.establishedYear} to today`}
            description="A straightforward progression: build product knowledge, widen the range as customers asked for more, then support the buyers who needed material shipped abroad."
          />

          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.phase} delay={i * 70} className="flex flex-col bg-card p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{item.period}</span>
                <h3 className="mt-3 text-base font-semibold">{item.phase}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Principles */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="How we operate"
              title="Four things we do not compromise on"
              description="None of this is unusual. It is simply what a buyer is entitled to expect from a supplier that has been trading for two decades."
            />
            <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {principles.map((principle, i) => (
                <Reveal as="li" key={principle.title} delay={i * 70}>
                  <span
                    aria-hidden="true"
                    className="inline-block font-mono text-xs font-semibold tabular-nums text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Partners */}
      <Section tone="muted" spacing="tight">
        <Container>
          <SectionHeading eyebrow="Leadership" title="The partners" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {siteConfig.partners.map((partner) => (
              <li key={partner.name} className="rounded-lg border border-border bg-card p-7">
                <h3 className="text-lg font-semibold">{partner.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{partner.role}</p>
                <a
                  href={`tel:${partner.phone.replace(/\s/g, "")}`}
                  className="mt-4 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {partner.phone}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Both partners are directly reachable. For product enquiries, the{" "}
            <Link href="/request-a-quote" className="link-underline text-sm">
              quotation form
            </Link>{" "}
            is usually fastest, since it captures the details needed to reply properly the first time.
          </p>
        </Container>
      </Section>

      <CtaBand
        title="Work with a supplier that has been at this since 2005"
        description="Send your product requirement and specification. We will tell you what we can supply, and what we cannot."
      />
    </>
  )
}
