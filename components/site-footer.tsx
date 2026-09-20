import Link from "next/link"
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { Container } from "@/components/layout-primitives"
import { addressLines, directionsLink, siteConfig, yearsOfExperience } from "@/lib/site-config"
import { productCategories } from "@/lib/products-data"

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/export", label: "Global Supply & Export" },
  { href: "/faq", label: "Buyer FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/request-a-quote", label: "Request a Quote" },
]

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/cookie-policy", label: "Cookie Policy" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-forest-950 text-forest-100">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo size="md" inverted showTagline={false} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest-100/75">
            A {siteConfig.legalForm.toLowerCase()} based in Ahmedabad, Gujarat, supplying aromatic chemicals, essential
            oils, Ayurvedic products, metals and pharma intermediates to B2B and export customers since{" "}
            {siteConfig.establishedYear}.
          </p>

          <dl className="mt-6 space-y-1.5 text-xs text-forest-100/60">
            <div className="flex gap-2">
              <dt className="font-medium">Constitution:</dt>
              <dd>{siteConfig.legalForm}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Partners:</dt>
              <dd>{siteConfig.partners.map((p) => p.name).join(" · ")}</dd>
            </div>
            {siteConfig.registrations.map((reg) => (
              <div key={reg.label} className="flex gap-2">
                <dt className="font-medium">{reg.label}</dt>
                <dd className="font-mono">{reg.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Product categories" className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brass-400">Products</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {productCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/${category.slug}`}
                  className="text-forest-100/80 transition-colors hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="text-forest-100/80 transition-colors hover:text-white">
                All Products
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brass-400">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-forest-100/80 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brass-400">Contact</h3>
          <address className="mt-4 space-y-4 text-sm not-italic">
            <div className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
              <span>
                <span className="block leading-relaxed text-forest-100/80">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-forest-100/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  <Navigation aria-hidden="true" className="h-3.5 w-3.5 text-brass-400" />
                  Get directions
                </a>
              </span>
            </div>
            <div className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
              <span className="space-y-1">
                <a
                  href={`tel:${siteConfig.contact.phonePrimary.e164}`}
                  className="block text-forest-100/80 transition-colors hover:text-white"
                >
                  {siteConfig.contact.phonePrimary.display}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneSecondary.e164}`}
                  className="block text-forest-100/80 transition-colors hover:text-white"
                >
                  {siteConfig.contact.phoneSecondary.display}
                </a>
              </span>
            </div>
            <div className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="break-all text-forest-100/80 transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex gap-3">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
              <span className="text-forest-100/80">
                {siteConfig.businessHours.summary}
                <span className="block text-forest-100/55">{siteConfig.businessHours.closed}</span>
              </span>
            </div>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-forest-100/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. · {yearsOfExperience}+ years in the
            industry
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}
