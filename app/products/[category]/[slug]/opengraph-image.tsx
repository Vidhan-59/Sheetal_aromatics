import { ImageResponse } from "next/og"
import { categoryName, getProduct, productsDatabase } from "@/lib/products-data"
import { siteConfig } from "@/lib/site-config"

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Product details — Sheetal Aromatics"

export function generateStaticParams() {
  return productsDatabase.map((product) => ({ category: product.category, slug: product.slug }))
}

/** Per-product share card, so a link pasted into WhatsApp or LinkedIn names the product. */
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

  const facts = [
    product?.casNumber && `CAS ${product.casNumber}`,
    product?.molecularFormula,
    product?.physicalForm,
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
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#CBA467", textTransform: "uppercase" }}>
            {kicker}
          </div>
          <svg width="92" height="82" viewBox="0 0 132 118">
            <polygon points="72,35 54.5,65.31 19.5,65.31 2,35 19.5,4.69 54.5,4.69" fill="#6C6CFF" />
            <polygon points="126,79 108.5,109.31 73.5,109.31 56,79 73.5,48.69 108.5,48.69" fill="#6C6CFF" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.12, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 26, color: "#C2DCCF", maxWidth: 940, lineHeight: 1.4 }}>
            {summary}
          </div>
          {facts.length > 0 && (
            <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 24,
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
