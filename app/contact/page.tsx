import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { QuoteForm } from "@/components/quote-form"
import { CtaBand } from "@/components/cta-band"
import { pageMetadata } from "@/lib/seo"
import { addressLines, directionsLink, mapsEmbed, mapsLink, siteConfig, whatsappLink } from "@/lib/site-config"

export const metadata: Metadata = pageMetadata({
  title: "Contact Us | Ahmedabad, Gujarat, India",
  description: `Contact us in Ahmedabad, Gujarat — ${siteConfig.contact.email}, ${siteConfig.contact.phonePrimary.display}. Send a product enquiry or start an export discussion.`,
  path: "/contact",
  keywords: [
    "Sheetal Aromatics contact",
    "chemical supplier Ahmedabad contact",
    "chemical exporter Gujarat contact",
  ],
})

export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      title: "Phone",
      lines: [
        {
          label: `${siteConfig.contact.phonePrimary.display} · ${siteConfig.contact.phonePrimary.contactName}`,
          href: `tel:${siteConfig.contact.phonePrimary.e164}`,
        },
        {
          label: `${siteConfig.contact.phoneSecondary.display} · ${siteConfig.contact.phoneSecondary.contactName}`,
          href: `tel:${siteConfig.contact.phoneSecondary.e164}`,
        },
      ],
    },
    {
      icon: Mail,
      title: "Email",
      lines: [{ label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` }],
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      lines: [
        {
          label: siteConfig.contact.phonePrimary.display,
          href: whatsappLink("Hello, I would like to enquire about a product supplied by Sheetal Aromatics."),
        },
      ],
    },
  ]

  return (
    <>
      <Breadcrumbs trail={[{ name: "Contact", href: "/contact" }]} />

      <Section tone="paper" spacing="tight">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Get in touch"
            title="Contact Sheetal Aromatics"
            description="Enquiries are answered by the partners directly. For a quotation, the form below captures everything we need to reply properly the first time."
          />
        </Container>
      </Section>

      <Section tone="muted" spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Details */}
            <div className="space-y-8">
              <div className="rounded-lg border border-border bg-card p-7">
                <div className="flex gap-4">
                  <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h2 className="text-base font-semibold">Office address</h2>
                    <address className="mt-2 text-sm not-italic leading-relaxed text-muted-foreground">
                      {addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button asChild size="sm">
                        <a href={directionsLink} target="_blank" rel="noopener noreferrer">
                          <Navigation aria-hidden="true" className="h-4 w-4" />
                          Get directions
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                          Open in Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {channels.map((channel) => (
                <div key={channel.title} className="rounded-lg border border-border bg-card p-7">
                  <div className="flex gap-4">
                    <channel.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold">{channel.title}</h2>
                      <ul className="mt-2 space-y-1.5">
                        {channel.lines.map((line) => (
                          <li key={line.href}>
                            <a
                              href={line.href}
                              {...(line.href.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                              className="break-words text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {line.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-lg border border-border bg-card p-7">
                <div className="flex gap-4">
                  <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h2 className="text-base font-semibold">Business hours</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {siteConfig.businessHours.summary}
                      <span className="block">{siteConfig.businessHours.closed}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-7">
                <h2 className="text-base font-semibold">Registration</h2>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Constitution</dt>
                    <dd className="font-medium">{siteConfig.legalForm}</dd>
                  </div>
                  {siteConfig.registrations.map((reg) => (
                    <div key={reg.label} className="flex gap-2">
                      <dt className="text-muted-foreground">{reg.label}</dt>
                      <dd className="font-mono font-medium">{reg.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="rounded-lg border border-border bg-card p-6 sm:p-9">
                <h2 className="text-2xl font-semibold tracking-tight">Send an enquiry</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Fields marked with an asterisk are required. Everything else helps us answer more precisely.
                </p>
                <QuoteForm className="mt-8" kind="general" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <Section tone="paper" spacing="tight">
        <Container>
          <h2 className="text-lg font-semibold">Find us</h2>
          <div className="mt-5 overflow-hidden rounded-lg border border-border">
            <iframe
              title={`Map showing the location of ${siteConfig.name} in Ahmedabad, Gujarat`}
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Map loaded from Google Maps. Please confirm the exact approach and gate before visiting.
            </p>
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm"
            >
              <Navigation aria-hidden="true" className="h-3.5 w-3.5" />
              Get directions
            </a>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Need a quotation rather than a conversation?"
        description="The quotation form asks for the six details we need to price your requirement accurately."
        primary={{ label: "Request a Quote", href: "/request-a-quote" }}
        secondary={{ label: "Browse Products", href: "/products" }}
      />
    </>
  )
}
