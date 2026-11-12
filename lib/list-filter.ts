import { matchScore, searchTerms } from "@/lib/search"

/** Dispatched by the header search when used on /products, where the explorer is already mounted. */
export const CATALOGUE_QUERY_EVENT = "sa:catalogue-query"

/**
 * Shows, hides and reorders the items of a FilterableProductList in place.
 * Matches are ranked like the server-side search (best first, via CSS `order`);
 * with no query the catalogue order is kept. Returns how many items are shown.
 */
export function applyListFilter(
  root: HTMLElement,
  { query, attr, value }: { query: string; attr: "category" | "group"; value: string },
): number {
  const terms = query.trim() ? searchTerms(query) : null
  let shown = 0
  root.querySelectorAll<HTMLElement>("[data-filter-item]").forEach((item) => {
    const inFilter = !value || item.dataset[attr] === value
    const score = terms ? matchScore(item.dataset.name ?? "", item.dataset.search ?? "", terms) : 1
    const show = inFilter && score > 0
    item.hidden = !show
    item.style.order = terms && show ? String(-score) : ""
    if (show) shown++
  })
  return shown
}
