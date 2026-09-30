import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { categoryName, getProduct, productsDatabase } from "@/lib/products-data"
import { productImageFor } from "@/lib/product-images"
import { categoryPalette } from "@/components/product-visual"
import { siteConfig } from "@/lib/site-config"

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Product details — Sheetal Aromatics"

export function generateStaticParams() {
  return productsDatabase.map((product) => ({ category: product.category, slug: product.slug }))
}

/** Inlines the product's share-card image as a data URL (the OG renderer cannot read WebP). */
async function imageDataUrl(slug: string): Promise<{ src: string; kind: "photo" | "structure" } | null> {
  const image = productImageFor(slug)
  if (!image) return null
  const file = image.kind === "photo" ? image.og : image.src
  try {
    const data = await readFile(path.join(process.cwd(), "public", file))
    const mime = image.kind === "photo" ? "image/jpeg" : "image/svg+xml"
    return { src: `data:${mime};base64,${data.toString("base64")}`, kind: image.kind }
  } catch {
    return null
  }
}

/** Per-product share card, so a link pasted into WhatsApp or LinkedIn names — and shows — the product. */
export default async function ProductOgImage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const product = getProduct(category, slug)

  const title = product?.name ?? siteConfig.name
  const kicker = product ? categoryName(product.category) : "Products"
  const summary = product?.summary ?? siteConfig.shortDescription
  const picture = product ? await imageDataUrl(product.slug) : null
  const palette = product ? categoryPalette(product.category) : null

  const facts = [
    product?.casNumber && `CAS ${product.casNumber}`,
    product?.molecularFormula,
    !picture && product?.physicalForm,
  ].filter(Boolean) as string[]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0A241A 0%, #12432F 65%, #0E3324 100%)",
          padding: "60px 68px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#CBA467", textTransform: "uppercase" }}>
            {kicker}
          </div>
          <svg width="80" height="72" viewBox="0 0 132 118">
            <polygon points="72,35 54.5,65.31 19.5,65.31 2,35 19.5,4.69 54.5,4.69" fill="#6C6CFF" />
            <polygon points="126,79 108.5,109.31 73.5,109.31 56,79 73.5,48.69 108.5,48.69" fill="#6C6CFF" />
          </svg>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: picture ? 54 : 66,
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.12,
                maxWidth: picture ? 620 : 1000,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontSize: picture ? 23 : 26,
                color: "#C2DCCF",
                maxWidth: picture ? 620 : 940,
                lineHeight: 1.4,
              }}
            >
              {summary}
            </div>
            {facts.length > 0 && (
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                {facts.map((fact) => (
                  <div
                    key={fact}
                    style={{
                      display: "flex",
                      fontSize: 20,
                      color: "#E4EFE9",
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: 6,
                      padding: "8px 16px",
                    }}
                  >
                    {fact}
                  </div>
                ))}
              </div>
            )}
          </div>

          {picture && (
            <div
              style={{
                display: "flex",
                width: 400,
                height: 300,
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.22)",
                background:
                  picture.kind === "structure" && palette
                    ? `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`
                    : "#0E3324",
              }}
            >
              <img
                src={picture.src}
                width={400}
                height={300}
                alt=""
                style={{
                  width: 400,
                  height: 300,
                  objectFit: picture.kind === "photo" ? "cover" : "contain",
                  padding: picture.kind === "structure" ? 4 : 0,
                }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 22,
            fontSize: 22,
            color: "#9FBFAF",
          }}
        >
          <div style={{ display: "flex", fontWeight: 900, fontStyle: "italic", color: "#FF5A2B", fontSize: 26 }}>
            SHEETAL AROMATICS
          </div>
          <div style={{ display: "flex" }}>Ahmedabad, India · {siteConfig.domain}</div>
        </div>
      </div>
    ),
    size,
  )
}
