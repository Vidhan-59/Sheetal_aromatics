import type { Product } from "@/lib/products-data"
import type { ProductContentMap } from "./types"
import { aromaticChemicalsContent } from "./aromatic-chemicals"
import { essentialOilsContent } from "./essential-oils"
import { ayurvedicHerbsContent } from "./ayurvedic-herbs"
import { ayurvedicPowdersContent } from "./ayurvedic-powders"
import { industrialContent } from "./industrial"

/**
 * Long-form copy by product slug. Read by server components only (product
 * pages, structured data, llms.txt), so it never reaches the browser bundle.
 */
const productContent: ProductContentMap = {
  ...aromaticChemicalsContent,
  ...essentialOilsContent,
  ...ayurvedicHerbsContent,
  ...ayurvedicPowdersContent,
  ...industrialContent,
}

/** Overview paragraph: the catalogue entry's own, else the long-form copy. */
export function productOverview(product: Product): string | undefined {
  return product.overview ?? productContent[product.slug]?.overview
}

/** Buyer FAQs: the catalogue entry's own, else the long-form copy. */
export function productFaqs(product: Product): { question: string; answer: string }[] {
  if (product.faqs?.length) return product.faqs
  return productContent[product.slug]?.faqs ?? []
}
