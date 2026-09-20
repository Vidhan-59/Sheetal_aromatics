import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout-primitives"

interface CtaBandProps {
  title: string
  description?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
}

/**
 * Closing call to action. One per page at most — the brief for this site is a
 * professional supplier, not a landing page, so CTAs stay sparse.
 */
export function CtaBand({
  title,
  description,
  primary = { label: "Request a Quote", href: "/request-a-quote" },
  secondary = { label: "Contact Our Team", href: "/contact" },
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-forest-900 text-white">
      <div aria-hidden="true" className="grid-texture absolute inset-0" />
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {description && <p className="mt-4 text-base leading-relaxed text-forest-100/80 sm:text-lg">{description}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="inverted">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline-inverted">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
