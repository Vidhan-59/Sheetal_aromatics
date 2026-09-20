"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { categoryName, productHref, searchProducts } from "@/lib/products-data"

/**
 * Header search with inline suggestions. The catalogue is small enough to
 * filter on the client, so results appear as the buyer types without a network
 * round trip. Enter always falls through to the full results page.
 */
export function ProductQuickSearch({ className }: { className?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const wrapRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 6) : []), [query])

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [])

  function goToResults() {
    if (!query.trim()) return
    setOpen(false)
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
      if (chosen) {
        setOpen(false)
        router.push(productHref(chosen))
      } else {
        goToResults()
      }
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
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
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest-400 focus:ring-2 focus:ring-ring/25"
        />
      </form>

      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Product suggestions"
          className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-50 overflow-hidden rounded-md border border-border bg-popover shadow-lg"
        >
          {results.map((product, i) => (
            <li key={product.slug} role="option" aria-selected={i === active}>
              <a
                href={productHref(product)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex items-baseline justify-between gap-3 px-3 py-2.5 text-sm transition-colors",
                  i === active ? "bg-secondary" : "hover:bg-secondary",
                )}
              >
                <span className="font-medium text-foreground">{product.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {product.casNumber ?? categoryName(product.category)}
                </span>
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={goToResults}
              className="w-full border-t border-border px-3 py-2.5 text-left text-xs font-medium text-primary hover:bg-secondary"
            >
              See all results for “{query.trim()}”
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
