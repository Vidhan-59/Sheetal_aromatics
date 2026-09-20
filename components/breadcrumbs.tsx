import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Container } from "@/components/layout-primitives"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/seo"
import { cn } from "@/lib/utils"

export interface Crumb {
  name: string
  href: string
}

/**
 * Breadcrumbs are passed explicitly rather than derived from the URL so the
 * labels read like the pages they point at ("Ayurvedic Products", not
 * "Ayurvedic-products") and so the emitted BreadcrumbList matches what is on
 * screen.
 */
export function Breadcrumbs({ trail, className }: { trail: Crumb[]; className?: string }) {
  const full: Crumb[] = [{ name: "Home", href: "/" }, ...trail]

  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} />
      <nav aria-label="Breadcrumb" className={cn("border-b border-border bg-muted/60", className)}>
        <Container>
          <ol className="flex flex-wrap items-center gap-y-1 py-3 text-xs sm:text-sm">
            {full.map((crumb, i) => {
              const last = i === full.length - 1
              return (
                <li key={crumb.href} className="flex items-center">
                  {i > 0 && (
                    <ChevronRight aria-hidden="true" className="mx-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                  )}
                  {last ? (
                    <span aria-current="page" className="font-medium text-foreground">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </Container>
      </nav>
    </>
  )
}
