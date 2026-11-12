import { ProductCard } from "@/components/product-card"
import { productSearchText, type Product } from "@/lib/products-data"

/**
 * Product grid rendered on the server, with the data the in-page filters need
 * on each item. The filters (ProductExplorer, CategoryGrid) only show, hide and
 * reorder these items, so the cards, their images and the catalogue never ship
 * as client JavaScript, and every card is in the initial HTML.
 */
export function FilterableProductList({ products, showCategory = false }: { products: Product[]; showCategory?: boolean }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li
          key={product.slug}
          data-filter-item=""
          data-category={product.category}
          data-group={product.group ?? ""}
          data-name={product.name.toLowerCase()}
          data-search={productSearchText(product)}
          className="h-full"
        >
          <ProductCard product={product} showCategory={showCategory} />
        </li>
      ))}
    </ul>
  )
}
