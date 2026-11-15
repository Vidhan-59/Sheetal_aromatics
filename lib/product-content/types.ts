/**
 * Long-form product copy, kept out of lib/products-data.ts so the catalogue
 * module (which the header quick search loads in the browser) stays small.
 * Only server components read these files.
 *
 * Accuracy rules (same as the catalogue):
 *  - Facts about the substance only: identity, published chemistry, documented
 *    industrial uses, general handling guidance.
 *  - No price, MOQ, stock, origin, certification or specification is asserted
 *    beyond what lib/products-data.ts already states.
 *  - No health, medicinal or therapeutic claims, especially for Ayurvedic
 *    raw materials.
 */
export interface ProductContent {
  /** Product page overview paragraph. Only used when the catalogue entry has none. */
  overview?: string
  /** Buyer questions for the product page and its FAQPage schema. Only used when the catalogue entry has none. */
  faqs?: { question: string; answer: string }[]
}

export type ProductContentMap = Record<string, ProductContent>
