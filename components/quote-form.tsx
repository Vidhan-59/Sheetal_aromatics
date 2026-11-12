import { QuoteFormClient, type QuoteFormProps } from "@/components/quote-form-client"
import { categoryName, productsDatabase } from "@/lib/products-data"

const productOptions = productsDatabase.map((p) => ({ name: p.name, group: categoryName(p.category) }))

/**
 * Server wrapper for the enquiry form. It hands the client form only the product
 * names it suggests, so the full catalogue never ships in the page's JavaScript.
 */
export function QuoteForm(props: QuoteFormProps) {
  return <QuoteFormClient {...props} productOptions={productOptions} />
}
