"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { CATALOGUE_QUERY_EVENT } from "@/lib/list-filter"
import type * as Catalogue from "@/lib/products-data"

/**
 * Header search with inline suggestions. The catalogue is small enough to
 * filter on the client, so results appear as the buyer types without a network
 * round trip. Enter always falls through to the full results page.
 *
 * The catalogue module is loaded on first hover or focus rather than with the
 * page: the header is on every page, and importing it statically put the whole
 * product database into every page's initial JavaScript.
 */
export function ProductQuickSearch({ className }: { className?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [catalogue, setCatalogue] = useState<typeof Catalogue | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  function loadCatalogue() {
    if (!catalogue) import("@/lib/products-data").then((mod) => setCatalogue(mod))
  }

  const results = useMemo(
    () => (catalogue && query.trim() ? catalogue.searchProducts(query).slice(0, 6) : []),
    [catalogue, query],
  )

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [])

  const expanded = open && Boolean(catalogue) && results.length > 0

  function goToResults() {
    if (!query.trim()) return
    setOpen(false)
    // Already on /products: the mounted explorer picks the query up from this event.
    if (window.location.pathname === "/products") {
      window.dispatchEvent(new CustomEvent(CATALOGUE_QUERY_EVENT, { detail: query.trim() }))
    }
    router.push(`/products?q=${encodeURIComponent(query.trim())}`)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActive((i) => Math.max(i - 1, -1))
    } else if (event.key === "Enter") {
      event.preventDefault()
      const chosen = results[active]
      if (chosen && catalogue) {
        setOpen(false)
        router.push(catalogue.productHref(chosen))
      } else {
        goToResults()
      }
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div ref={wrapRef} className={cn("relative", className)} onPointerEnter={loadCatalogue}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          goToResults()
        }}
      >
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search products
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id={`${listId}-input`}
          type="search"
          value={query}
          placeholder="Search products or CAS number"
          autoComplete="off"
          role="combobox"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={expanded && active >= 0 ? `${listId}-opt-${active}` : undefined}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => {
            loadCatalogue()
            setOpen(true)
          }}
          onKeyDown={onKeyDown}
          className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest-400 focus-visible:ring-2 focus-visible:ring-ring"
        />
      </form>

      {expanded && catalogue && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-50 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
          {/* Only the product options live in the listbox; the "see all" button sits outside it. Focus stays
              on the input (aria-activedescendant), so the links are kept out of the tab order. */}
          <ul id={listId} role="listbox" aria-label="Product suggestions">
            {results.map((product, i) => (
              <li key={product.slug} id={`${listId}-opt-${i}`} role="option" aria-selected={i === active}>
                <a
                  href={catalogue.productHref(product)}
                  tabIndex={-1}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex items-baseline justify-between gap-3 px-3 py-2.5 text-sm transition-colors",
                    i === active ? "bg-secondary" : "hover:bg-secondary",
                  )}
                >
                  <span className="font-medium text-foreground">{product.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {product.casNumber ?? catalogue.categoryName(product.category)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={goToResults}
            className="w-full border-t border-border px-3 py-2.5 text-left text-xs font-medium text-primary hover:bg-secondary"
          >
            See all results for “{query.trim()}”
          </button>
        </div>
      )}
    </div>
  )
}
