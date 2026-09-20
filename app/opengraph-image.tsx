import { ImageResponse } from "next/og"
import { siteConfig, yearsOfExperience } from "@/lib/site-config"
import { productCategories } from "@/lib/products-data"

export const runtime = "nodejs"
export const alt = `${siteConfig.name} — chemical and natural product supplier and exporter, Ahmedabad, India`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Social share card used for WhatsApp, LinkedIn, X, Facebook and email previews. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0A241A 0%, #12432F 62%, #0E3324 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 62,
                fontWeight: 900,
                fontStyle: "italic",
                color: "#FF5A2B",
                letterSpacing: -1,
                lineHeight: 1.02,
              }}
            >
              SHEETAL
            </div>
            <div
              style={{
                fontSize: 62,
                fontWeight: 900,
                fontStyle: "italic",
                color: "#FF5A2B",
                letterSpacing: -1,
                lineHeight: 1.02,
                paddingLeft: 22,
              }}
            >
              AROMATICS
            </div>
          </div>
          <svg width="150" height="134" viewBox="0 0 132 118">
            <polygon points="72,35 54.5,65.31 19.5,65.31 2,35 19.5,4.69 54.5,4.69" fill="#6C6CFF" />
            <polygon points="126,79 108.5,109.31 73.5,109.31 56,79 73.5,48.69 108.5,48.69" fill="#6C6CFF" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 44, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.18, maxWidth: 940 }}>
            Chemical, aromatic and natural product supply for global markets
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 24, color: "#C2DCCF" }}>
            {yearsOfExperience}+ years of experience · Ahmedabad, Gujarat, India · B2B &amp; export supply
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 26,
          }}
        >
          {productCategories.map((category) => (
            <div
              key={category.slug}
              style={{
                display: "flex",
                fontSize: 20,
                color: "#E4EFE9",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 6,
                padding: "8px 16px",
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
