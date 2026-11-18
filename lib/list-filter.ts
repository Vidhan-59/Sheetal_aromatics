import { matchScore, searchTerms } from "@/lib/search"

/** Dispatched by the header search when used on /products, where the explorer is already mounted. */
export const CATALOGUE_QUERY_EVENT = "sa:catalogue-query"

/** Original catalogue position of each item, so clearing a query restores the server order. */
const originalIndex = new WeakMap<HTMLElement, number>()

/**
 * Shows, hides and reorders the items of a FilterableProductList in place.
 * Matches are ranked like the server-side search (best first); with no query
 * the catalogue order is kept. The DOM nodes themselves are moved (not CSS
 * `order`) so keyboard and screen-reader order match the visual order.
 * Returns how many items are shown.
 */
export function applyListFilter(
  root: HTMLElement,
  { query, attr, value }: { query: string; attr: "category" | "group"; value: string },
): number {
  const terms = query.trim() ? searchTerms(query) : null
  const items = Array.from(root.querySelectorAll<HTMLElement>("[data-filter-item]"))
  items.forEach((item, i) => {
    if (!originalIndex.has(item)) originalIndex.set(item, i)
  })

  let shown = 0
  const scores = new Map<HTMLElement, number>()
  for (const item of items) {
    const inFilter = !value || item.dataset[attr] === value
    const score = terms ? matchScore(item.dataset.name ?? "", item.dataset.search ?? "", terms) : 1
    const show = inFilter && score > 0
    item.hidden = !show
    scores.set(item, show ? score : 0)
    if (show) shown++
  }

  // Reorder within each parent (items may be split across grouped grids). Stable: ties keep catalogue order.
  const byParent = new Map<HTMLElement, HTMLElement[]>()
  for (const item of items) {
    const parent = item.parentElement
    if (!parent) continue
    const list = byParent.get(parent) ?? []
    list.push(item)
    byParent.set(parent, list)
  }
  for (const [parent, siblings] of byParent) {
    const sorted = [...siblings].sort(
      (a, b) =>
        (terms ? (scores.get(b) ?? 0) - (scores.get(a) ?? 0) : 0) ||
        (originalIndex.get(a) ?? 0) - (originalIndex.get(b) ?? 0),
    )
    // Only touch the DOM when the order actually changes.
    if (sorted.some((item, i) => item !== siblings[i])) {
      const anchor = siblings[siblings.length - 1].nextSibling
      for (const item of sorted) parent.insertBefore(item, anchor)
    }
  }
  return shown
}
