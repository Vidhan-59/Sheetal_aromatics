import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { MolecularFormula, ProductVisual } from "@/components/product-visual"
import { cn } from "@/lib/utils"
import { categoryName, productHref, type Product } from "@/lib/products-data"

export function ProductCard({
  product,
  showCategory = false,
  className,
}: {
  product: Product
  showCategory?: boolean
  className?: string
}) {
  return (
    <article className={cn("tile group flex h-full flex-col overflow-hidden", className)}>
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-muted">
        <ProductVisual
          product={product}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {product.casNumber && (
          <span className="absolute right-3 top-3 rounded-sm bg-background/90 px-2 py-1 font-mono text-[11px] tabular-nums text-muted-foreground shadow-sm">
            CAS {product.casNumber}
          </span>
        )}
        {product.molecularFormula && (
          <MolecularFormula
            formula={product.molecularFormula}
            className="absolute bottom-3 left-3 rounded-sm bg-background/90 px-2 py-1 text-[11px] font-medium text-foreground shadow-sm"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {showCategory && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
            {categoryName(product.category)}
          </p>
        )}

        <h3 className="text-base font-semibold leading-snug">
          <Link href={productHref(product)} className="after:absolute after:inset-0 hover:text-primary">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>

        {product.physicalForm && (
          <p className="mt-4 text-xs text-muted-foreground">{product.physicalForm}</p>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          View product
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}

/** Compact row used in search results and related-product lists. */
export function ProductRow({ product }: { product: Product }) {
  return (
    <article className="group relative flex items-center gap-4 border-b border-border py-4 last:border-0">
      <div className="hidden h-16 w-20 shrink-0 overflow-hidden rounded-md border border-border sm:block">
        <ProductVisual product={product} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold">
          <Link href={productHref(product)} className="after:absolute after:inset-0 hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.summary}</p>
      </div>
      <div className="hidden shrink-0 text-right text-xs text-muted-foreground sm:block">
        <p>{categoryName(product.category)}</p>
        {product.casNumber && <p className="mt-1 font-mono">CAS {product.casNumber}</p>}
      </div>
    </article>
  )
}
