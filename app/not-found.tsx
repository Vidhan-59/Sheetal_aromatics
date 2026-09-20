import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container, Section } from "@/components/layout-primitives"
import { productCategories } from "@/lib/products-data"

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Section tone="paper">
      <Container size="narrow" className="text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">This page does not exist</h1>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
          The page may have moved during our site rebuild. The product catalogue is the best place to start.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {productCategories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/products/${category.slug}`}
                className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-forest-300 hover:bg-secondary"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
