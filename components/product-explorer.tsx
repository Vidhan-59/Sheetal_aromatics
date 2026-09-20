"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"
import { countByCategory, productCategories, productsDatabase, searchProducts } from "@/lib/products-data"

/**
 * Catalogue browser: free-text search plus a category filter. The whole
 * catalogue ships with the page, so filtering is instant and works offline
 * after first load. The query is mirrored into the URL (replace, not push) so
 * a result set can be shared or bookmarked without flooding history.
 */
export function ProductExplorer({ initialCategory = "" }: { initialCategory?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [category, setCategory] = useState(initialCategory || searchParams.get("category") || "")

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (category) params.set("category", category)
    const qs = params.toString()
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false })
  }, [query, category, router])

  const results = useMemo(() => searchProducts(query, category || undefined), [query, category])
  const filtering = Boolean(query.trim() || category)

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <label htmlFor="catalogue-search" className="sr-only">
            Search products
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, CAS number, application…"
            className="h-12 w-full rounded-md border border-border bg-card pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest-400 focus:ring-2 focus:ring-ring/25"
          />
        </div>

        <p aria-live="polite" className="text-sm text-muted-foreground">
          {results.length} of {productsDatabase.length} products
          {filtering && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setCategory("")
              }}
              className="ml-3 inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
            >
              <X aria-hidden="true" className="h-3 w-3" />
              Clear
            </button>
          )}
        </p>
      </div>

      {/* Category filter */}
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <FilterChip active={category === ""} onClick={() => setCategory("")}>
          All categories
          <Count>{productsDatabase.length}</Count>
        </FilterChip>
        {productCategories.map((c) => (
          <FilterChip key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
            {c.name}
            <Count>{countByCategory(c.slug)}</Count>
          </FilterChip>
        ))}
      </div>

      {results.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <li key={product.slug} className="h-full">
              <ProductCard product={product} showCategory={!category} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 rounded-lg border border-dashed border-border bg-muted p-10 text-center">
          <h3 className="text-lg font-semibold">No products match “{query.trim()}”</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Our catalogue lists what we supply most often. If you need a product that is not listed, send us the
            specification and we will tell you what can be arranged.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/request-a-quote">Send a specification</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setQuery("")
                setCategory("")
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-forest-300 hover:bg-secondary",
      )}
    >
      {children}
    </button>
  )
}

function Count({ children }: { children: React.ReactNode }) {
  return <span className="text-xs tabular-nums opacity-65">{children}</span>
}
