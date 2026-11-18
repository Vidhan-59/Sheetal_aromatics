import type { Product } from "@/lib/products-data"
import { siteConfig } from "@/lib/site-config"
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

/**
 * One answer-first passage tying the product to the company, India and export,
 * built only from confirmed facts (location, IEC, export reach, documents, terms).
 * Answer engines quote passages, so this is the chunk that answers
 * "who supplies {product} (CAS …) from India?".
 */
export function productSupplyAnswer(product: Product): { question: string; answer: string } {
  const iec = siteConfig.registrations.find((r) => r.label.startsWith("Importer"))?.value
  const id = product.casNumber ? ` (CAS ${product.casNumber})` : ""
  const hazardous = product.unNumber
    ? ` As a dangerous good (${product.unNumber}), its packing, labelling and route are agreed before despatch.`
    : ""
  return {
    question: `Can ${siteConfig.name} export ${product.name} from India?`,
    answer: `Yes. ${siteConfig.name} supplies ${product.name}${id} from Ahmedabad, Gujarat to buyers in India and in ${siteConfig.exportCountries} export countries${iec ? ` (Importer Exporter Code ${iec})` : ""}. Quotations are made against your specification on EXW, FOB or CIF terms, with a certificate of analysis and safety data sheet on request.${hazardous}`,
  }
}

/** Buyer FAQs: the catalogue entry's own, else the long-form copy, plus the supply answer. */
export function productFaqs(product: Product): { question: string; answer: string }[] {
  const own = product.faqs?.length ? product.faqs : (productContent[product.slug]?.faqs ?? [])
  // Skip the generic answer where the product's own FAQs already cover sourcing from India.
  const coversSupply = own.some((f) => /source|supplier|export/i.test(f.question) && /india/i.test(f.question))
  return coversSupply ? own : [...own, productSupplyAnswer(product)]
}
