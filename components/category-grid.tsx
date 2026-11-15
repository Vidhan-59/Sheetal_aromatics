"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Search } from "lucide-react"

import { cn, pluralize } from "@/lib/utils"
import { applyListFilter } from "@/lib/list-filter"

/**
 * Within-category browsing: an optional sub-group filter plus a text filter over
 * the server-rendered product grid passed as children. Kept local to the page —
 * it does not rewrite the URL, so the category page stays canonical and never
 * generates crawlable filter permutations.
 */
export function CategoryGrid({
  categorySlug,
  groups,
  total,
  children,
}: {
  categorySlug: string
  groups?: { name: string; count: number }[]
  total: number
  children: ReactNode
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [group, setGroup] = useState("")
  const [query, setQuery] = useState("")
  const [shown, setShown] = useState(total)

  useEffect(() => {
    if (listRef.current) setShown(applyListFilter(listRef.current, { query, attr: "group", value: group }))
  }, [query, group])

  const showControls = (groups?.length ?? 0) > 0 || total > 8

  return (
    <div>
      {showControls && (
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          {groups && groups.length > 0 ? (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
              <Chip active={group === ""} onClick={() => setGroup("")}>
                All ({total})
              </Chip>
              {groups.map((g) => (
                <Chip key={g.name} active={group === g.name} onClick={() => setGroup(g.name)}>
                  {g.name} ({g.count})
                </Chip>
              ))}
            </div>
          ) : (
            <span />
          )}

          <div className="relative w-full md:max-w-xs">
            <label htmlFor={`filter-${categorySlug}`} className="sr-only">
              Filter products in this category
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id={`filter-${categorySlug}`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter this category"
              className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest-400 focus:ring-2 focus:ring-ring/25"
            />
          </div>
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {pluralize(shown, "product")} shown
      </p>

      <div ref={listRef} className="mt-8">
        {children}
      </div>

      {shown === 0 && (
        <p className="mt-10 rounded-md border border-dashed border-border bg-muted p-8 text-center text-sm text-muted-foreground">
          No products in this category match that filter.
        </p>
      )}
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:border-forest-300 hover:bg-secondary",
      )}
    >
      {children}
    </button>
  )
}
