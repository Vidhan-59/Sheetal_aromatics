"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { applyListFilter, CATALOGUE_QUERY_EVENT } from "@/lib/list-filter"

/**
 * Catalogue browser: free-text search plus a category filter over a
 * server-rendered product grid (passed as children). Filtering shows and hides
 * those cards in place, so the page ships no catalogue JavaScript and the full
 * grid is in the initial HTML. The query is mirrored into the URL with
 * replaceState, so a result set can be shared without a navigation per keystroke.
 */
export function ProductExplorer({
  categories,
  total,
  children,
}: {
  categories: { slug: string; name: string; count: number }[]
  total: number
  children: ReactNode
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [shown, setShown] = useState(total)
  const [ready, setReady] = useState(false)

  // Read ?q= and ?category= after mount instead of via useSearchParams, which would
  // render this whole section on the client and drop the grid from the static HTML.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setQuery(params.get("q") ?? "")
    setCategory(params.get("category") ?? "")
    setReady(true)
    const onQuery = (event: Event) => {
      setQuery((event as CustomEvent<string>).detail)
      setCategory("")
    }
    window.addEventListener(CATALOGUE_QUERY_EVENT, onQuery)
    return () => window.removeEventListener(CATALOGUE_QUERY_EVENT, onQuery)
  }, [])

  useEffect(() => {
    if (!ready || !listRef.current) return
    setShown(applyListFilter(listRef.current, { query, attr: "category", value: category }))
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (category) params.set("category", category)
    const qs = params.toString()
    window.history.replaceState(window.history.state, "", qs ? `/products?${qs}` : "/products")
  }, [query, category, ready])

  const filtering = Boolean(query.trim() || category)
  const clear = () => {
    setQuery("")
    setCategory("")
  }

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
          {shown} of {total} products
          {filtering && (
            <button
              type="button"
              onClick={clear}
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
          <Count>{total}</Count>
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
            {c.name}
            <Count>{c.count}</Count>
          </FilterChip>
        ))}
      </div>

      <div ref={listRef} className="mt-10">
        {children}
      </div>

      {shown === 0 && (
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
            <Button variant="outline" onClick={clear}>
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
