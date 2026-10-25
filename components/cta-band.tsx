import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MolecularField } from "@/components/molecular-field"
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
      <div aria-hidden="true" className="grid-texture absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="glow-drift absolute -right-24 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-forest-700/40 blur-3xl"
      />
      <MolecularField density={0.7} className="[mask-image:linear-gradient(90deg,transparent_25%,black_75%)]" />
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
