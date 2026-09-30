/* eslint-disable @next/next/no-img-element -- images are pre-sized WebP/SVG with a hand-written srcset; the
   Next image optimiser is disabled for this site (see next.config.mjs). */
import { cn } from "@/lib/utils"
import { productImageAlt, productImageFor } from "@/lib/product-images"
import type { Product } from "@/lib/products-data"
import { categoryPalette, ProductVisual } from "@/components/product-visual"

interface ProductImageProps {
  product: Product
  /** `sizes` for the photo srcset; defaults to a card in a responsive grid. */
  sizes?: string
  /** Loads eagerly with high fetch priority — use for the one above-the-fold hero image. */
  priority?: boolean
  className?: string
}

/**
 * Renders a product's photo or chemical structure, falling back to the drawn
 * <ProductVisual /> when no image is held. Always fills its container, which
 * sets the aspect ratio.
 */
export function ProductImage({
  product,
  sizes = "(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw",
  priority = false,
  className,
}: ProductImageProps) {
  const image = productImageFor(product.slug)
  if (!image) return <ProductVisual product={product} className={className} />

  const loading = priority ? "eager" : "lazy"

  if (image.kind === "photo") {
    return (
      <img
        src={image.srcSmall}
        srcSet={`${image.srcSmall} 600w, ${image.src} 1200w`}
        sizes={sizes}
        width={1200}
        height={900}
        alt={productImageAlt(product, image)}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={cn("h-full w-full object-cover", className)}
      />
    )
  }

  const palette = categoryPalette(product.category)
  const patternId = `pi-hex-${product.slug}`
  return (
    <div
      className={cn("relative h-full w-full", className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)` }}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id={patternId} width="42" height="48.5" patternUnits="userSpaceOnUse">
            <path
              d="M21 0 42 12.1 42 36.4 21 48.5 0 36.4 0 12.1z"
              fill="none"
              stroke={palette.ink}
              strokeWidth="0.7"
              opacity="0.09"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <img
        src={image.src}
        width={800}
        height={600}
        alt={productImageAlt(product, image)}
        loading={loading}
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain p-[6%]"
      />
    </div>
  )
}
