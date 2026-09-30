/* eslint-disable @next/next/no-img-element -- small pre-sized WebP thumbnails */
import type { Metadata } from "next"
import Link from "next/link"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container, Section, SectionHeading } from "@/components/layout-primitives"
import { pageMetadata } from "@/lib/seo"
import { productImages, type ProductImage } from "@/lib/product-images"
import { getProductBySlug, productHref, type Product } from "@/lib/products-data"

export const metadata: Metadata = pageMetadata({
  title: "Image Credits",
  description: "Credits and licences for the photographs used on the Sheetal Aromatics website.",
  path: "/image-credits",
  index: false,
})

type Photo = Extract<ProductImage, { kind: "photo" }>

/** One row per photograph, listing every product that uses it. */
function photoRows(): { photo: Photo; products: Product[] }[] {
  const bySource = new Map<string, { photo: Photo; products: Product[] }>()
  for (const [slug, image] of Object.entries(productImages)) {
    if (image.kind !== "photo") continue
    const product = getProductBySlug(slug)
    if (!product) continue
    const row = bySource.get(image.src) ?? { photo: image, products: [] }
    row.products.push(product)
    bySource.set(image.src, row)
  }
  return [...bySource.values()].sort((a, b) => a.products[0].name.localeCompare(b.products[0].name))
}

export default function ImageCreditsPage() {
  const rows = photoRows()
  const link = "underline underline-offset-2 hover:text-foreground"

  return (
    <>
      <Breadcrumbs trail={[{ name: "Image Credits", href: "/image-credits" }]} />

      <Section tone="paper" spacing="tight">
        <Container>
          <SectionHeading
            as="h1"
            title="Image credits"
            description="Product photographs on this site are used under free licences from Wikimedia Commons, and we thank the photographers listed below. Photos show the product or its botanical source and are representative — they are not photographs of material supplied by Sheetal Aromatics. Chemical structure diagrams are drawn by us from public PubChem records."
          />

          <div className="mt-10 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-[0.1em] text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Photo
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Used for
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Author
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Licence
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ photo, products }) => (
                  <tr key={photo.src} className="border-t border-border align-top">
                    <td className="px-4 py-3">
                      <a href={photo.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="block w-24">
                        <img
                          src={photo.srcSmall}
                          alt={photo.alt}
                          width={96}
                          height={72}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-24 rounded-sm border border-border object-cover"
                        />
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <ul className="space-y-1">
                        {products.map((product) => (
                          <li key={product.slug}>
                            <Link href={productHref(product)} className="font-medium hover:text-primary">
                              {product.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-1 text-xs text-muted-foreground">{photo.alt}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{photo.credit.author}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {photo.credit.licenseUrl ? (
                        <a href={photo.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className={link}>
                          {photo.credit.license}
                        </a>
                      ) : (
                        photo.credit.license
                      )}
                      <br />
                      <a href={photo.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className={`${link} text-xs`}>
                        Source file
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Photographs have been cropped and resized for this site. Where a photo is licensed CC BY-SA, the adapted
            version is available under the same licence.
          </p>
        </Container>
      </Section>
    </>
  )
}
