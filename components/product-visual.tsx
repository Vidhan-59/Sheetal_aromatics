import { cn } from "@/lib/utils"
import { categoryName, visualFormFor, type CategorySlug, type Product, type VisualForm } from "@/lib/products-data"

/**
 * Product imagery.
 *
 * Rather than attaching generic stock laboratory photography to chemicals it
 * does not actually depict, every product renders a drawn, technical visual
 * chosen from its own data: the physical form it is supplied in, its category,
 * and — where we hold a verified one — its molecular formula.
 *
 * The result is accurate, visually distinct between categories, weighs a
 * couple of kB, needs no licence attribution and never misrepresents the
 * material. If real product photography is commissioned later, add a `photo`
 * field to the product record and render it in place of this component.
 */

const palettes: Record<CategorySlug, { from: string; to: string; ink: string; accent: string }> = {
  "aromatic-chemicals": { from: "#F2F8F4", to: "#E0EDE6", ink: "#12432F", accent: "#A67A2E" },
  "essential-oils": { from: "#F1F7F0", to: "#DEEBDC", ink: "#1B5A3F", accent: "#7E9A3C" },
  "ayurvedic-products": { from: "#F8F5EC", to: "#EEE7D6", ink: "#3F4A22", accent: "#A67A2E" },
  metals: { from: "#F2F4F5", to: "#E1E7E9", ink: "#26363B", accent: "#7A8A90" },
  "pharma-intermediates": { from: "#F0F6F6", to: "#DDEAEA", ink: "#14403E", accent: "#2C6E6A" },
}

/** Stable pseudo-random integer from a slug, so a product always looks the same. */
function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

/**
 * Renders C9H10O2 with correctly typeset subscripts. Rendered as HTML rather
 * than inside the SVG so it is never clipped: the visual uses
 * preserveAspectRatio="slice", which crops the edges of the viewBox whenever
 * the container is not 4:3.
 */
export function MolecularFormula({ formula, className }: { formula: string; className?: string }) {
  const parts = formula.match(/[A-Za-z()]+|\d+/g) ?? [formula]
  return (
    <span className={cn("font-mono tabular-nums", className)}>
      <span className="sr-only">{formula}</span>
      <span aria-hidden="true">
        {parts.map((part, i) =>
          /^\d+$/.test(part) ? (
            <sub key={i} className="text-[0.72em]">
              {part}
            </sub>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    </span>
  )
}

/* ------------------------------ Form motifs ------------------------------ */

/** Fixed layout for the three-seed cluster motif. */
const SEED_POSITIONS: [number, number, number][] = [
  [-44, 12, -18],
  [14, -22, 14],
  [30, 34, -8],
]

function Motif({ form, ink, accent, seed }: { form: VisualForm; ink: string; accent: string; seed: number }) {
  const stroke = { stroke: ink, fill: "none", strokeWidth: 2, strokeLinejoin: "round" as const }
  /** 0–1 variation channels, stable per product. */
  const v1 = (seed % 97) / 97
  const v2 = ((seed >> 5) % 89) / 89

  switch (form) {
    /* Reagent bottle with a filled body — liquids and esters. Proportions and
       fill level shift per product so a grid of clear liquids still has rhythm. */
    case "liquid":
      return (
        <g transform={`translate(200 158) scale(${0.88 + v2 * 0.2} ${0.92 + v1 * 0.16})`}>
          <path {...stroke} d="M-18 -74h36v20l22 34a30 30 0 0 1 5 16v54a12 12 0 0 1-12 12h-66a12 12 0 0 1-12-12v-54a30 30 0 0 1 5-16l22-34z" />
          <path fill={ink} opacity="0.12" d={`M-45 ${8 - v1 * 22}h90v${42 + v1 * 22}a12 12 0 0 1-12 12h-66a12 12 0 0 1-12-12z`} />
          <path stroke={accent} fill="none" strokeWidth="2.5" d={`M-45 ${8 - v1 * 22}h90`} />
          <rect x="-22" y="-86" width="44" height="14" rx="4" fill={accent} opacity="0.85" />
          <circle cx="-16" cy="34" r="4" fill={ink} opacity="0.25" />
          <circle cx="8" cy="46" r="2.5" fill={ink} opacity="0.2" />
        </g>
      )

    /* Amber dropper bottle with a leaf — distilled oils. */
    case "oil":
      return (
        <g transform="translate(200 158)">
          <path {...stroke} d="M-34 -46h68v14a34 34 0 0 1-8 22 34 34 0 0 0-8 22v52a12 12 0 0 1-12 12h-12a12 12 0 0 1-12-12v-52a34 34 0 0 0-8-22 34 34 0 0 1-8-22z" />
          <path fill={accent} opacity="0.2" d={`M-26 ${22 - v2 * 18}h52v${42 + v2 * 18}a12 12 0 0 1-12 12h-28a12 12 0 0 1-12-12z`} />
          <rect x="-16" y="-72" width="32" height="26" rx="5" {...stroke} />
          <path stroke={accent} fill="none" strokeWidth="2.5" d={`M-26 ${22 - v2 * 18}h52`} />
          <path
            fill={accent}
            opacity="0.6"
            d="M44 -58c-26 4-40 22-40 42 22 2 40-14 44-40z"
            transform={`rotate(${2 + v1 * 26} 44 -38)`}
          />
          <path stroke={ink} fill="none" strokeWidth="1.6" opacity="0.5" d="M46 -56c-16 10-26 22-30 40" />
        </g>
      )

    /* Faceted crystal cluster — menthol, indole, resublimed solids. */
    case "crystal":
      return (
        <g transform={`translate(200 160) rotate(${(v1 - 0.5) * 8})`}>
          <polygon {...stroke} points="0,-84 44,-40 30,44 -30,44 -44,-40" />
          <path stroke={ink} strokeWidth="1.4" fill="none" opacity="0.45" d="M0-84 0 44M-44-40 44-40M0-84-30 44M0-84 30 44" />
          <polygon fill={accent} opacity="0.18" points="0,-84 44,-40 0,-40" />
          <g transform={`translate(${-6 - v1 * 12} ${v2 * 10}) scale(${0.8 + v1 * 0.34})`}>
            <polygon {...stroke} points="-62,4 -34,26 -44,70 -78,70 -86,26" opacity="0.85" />
          </g>
          <g transform={`translate(${4 + v2 * 12} ${v1 * 8}) scale(${0.78 + v2 * 0.36})`}>
            <polygon {...stroke} points="62,16 84,34 76,70 44,70 38,34" opacity="0.85" />
          </g>
        </g>
      )

    /* Milled powder in an assay dish. */
    case "powder":
      return (
        <g transform="translate(200 164)">
          <path {...stroke} d="M-92 6h184a92 46 0 0 1-184 0z" />
          <path fill={accent} opacity="0.35" d="M-70 6c14-42 40-62 70-62s56 20 70 62z" />
          <path {...stroke} d="M-70 6c14-42 40-62 70-62s56 20 70 62" />
          <path stroke={accent} fill="none" strokeWidth="2" opacity="0.7" d="M-40 -8c12-20 26-30 40-30s28 10 40 30" />
          {[...Array(7)].map((_, i) => {
            const a = ((seed + i * 37) % 100) / 100
            return <circle key={i} cx={-64 + i * 21 + a * 8} cy={-4 - a * 26} r={1.6 + a * 1.6} fill={ink} opacity="0.4" />
          })}
        </g>
      )


    /* Taproot with fibrous rootlets — Ashwagandha, Shatavari. */
    case "root":
      return (
        <g transform="translate(200 150)">
          <path stroke={ink} fill="none" strokeWidth="2" strokeLinecap="round" d="M0-96v22M-12-92c4 8 6 14 6 20M12-92c-4 8-6 14-6 20" />
          <path
            fill={accent}
            opacity="0.3"
            stroke={ink}
            strokeWidth="2"
            strokeLinejoin="round"
            d="M-20-74h40c0 24-4 52-9 78-3 16-5 28-11 38-6-10-8-22-11-38-5-26-9-54-9-78z"
          />
          {[...Array(6)].map((_, i) => {
            const a = ((seed + i * 41) % 100) / 100
            const side = i % 2 === 0 ? -1 : 1
            const y = -46 + i * 17
            return (
              <path
                key={i}
                stroke={ink}
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.7"
                d={"M" + side * 12 + " " + y + "c" + side * (16 + a * 14) + " " + (4 + a * 6) + " " + side * (24 + a * 16) + " " + (14 + a * 10) + " " + side * (30 + a * 18) + " " + (26 + a * 12)}
              />
            )
          })}
        </g>
      )

    /* Fruit on the branch — Amla, Harad, Baheda, Garcinia. */
    case "fruit":
      return (
        <g transform="translate(200 156)">
          <path stroke={ink} fill="none" strokeWidth="2" strokeLinecap="round" d="M0-94c-2 18-2 30 0 40" />
          <path fill={accent} opacity="0.3" stroke={ink} strokeWidth="2" d="M-4-84c-26-6-42-22-44-44 26-2 42 16 44 44z" />
          <circle cx={-2 + ((seed % 7) - 3)} cy="10" r="54" fill={accent} opacity="0.32" stroke={ink} strokeWidth="2" />
          <path stroke={ink} fill="none" strokeWidth="1.5" opacity="0.5" d="M-2-44v108M-38-24c14 14 14 54 0 68M34-24c-14 14-14 54 0 68" />
          <circle cx={-24 + ((seed >> 3) % 10)} cy="-12" r="8" fill="#FFFFFF" opacity="0.32" />
        </g>
      )

    /* Burr-like spiny fruit — Gokhru. */
    case "spiky-fruit":
      return (
        <g transform="translate(200 158)">
          <circle cx="0" cy="0" r="44" fill={accent} opacity="0.32" stroke={ink} strokeWidth="2" />
          {[...Array(12)].map((_, i) => {
            const a = ((seed + i * 29) % 100) / 100
            const angle = (i * 30 + a * 10) * (Math.PI / 180)
            const len = 20 + a * 14
            return (
              <line
                key={i}
                x1={Math.cos(angle) * 42}
                y1={Math.sin(angle) * 42}
                x2={Math.cos(angle) * (42 + len)}
                y2={Math.sin(angle) * (42 + len)}
                stroke={ink}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
            )
          })}
          <path stroke={ink} fill="none" strokeWidth="1.5" opacity="0.5" d="M-30-14c18 10 42 10 60 0M-26 16c18-10 42-10 58 0" />
        </g>
      )

    /* Seed cluster — Jamun, Vavding, Nimboda and Danti seeds. */
    case "seed":
      return (
        <g transform="translate(200 158)">
          {SEED_POSITIONS.map(([x, y, rot], i) => {
            const a = ((seed + i * 47) % 100) / 100
            return (
              <g key={i} transform={"translate(" + x + " " + y + ") rotate(" + (rot + a * 20) + ")"}>
                <ellipse cx="0" cy="0" rx={26 + a * 8} ry={38 + a * 10} fill={accent} opacity="0.32" stroke={ink} strokeWidth="2" />
                <path stroke={ink} fill="none" strokeWidth="1.5" opacity="0.55" d={"M0 " + (-30 - a * 8) + "V" + (30 + a * 8)} />
                <path stroke={ink} fill="none" strokeWidth="1.2" opacity="0.4" d="M-12-10c8 8 16 8 24 0" />
              </g>
            )
          })}
        </g>
      )

    /* Leafy sprig — Neem, Tulsi, Moringa. */
    case "leaf":
      return (
        <g transform="translate(200 158)">
          <path stroke={ink} fill="none" strokeWidth="2.4" strokeLinecap="round" d="M-58 80C-20 40 10-10 34-86" />
          {[...Array(7)].map((_, i) => {
            const a = ((seed + i * 53) % 100) / 100
            const t = i / 6
            const x = -58 + t * 92
            const y = 80 - t * 166 + t * t * 20
            const side = i % 2 === 0 ? -1 : 1
            const len = 40 + a * 12
            const lift = 20 + a * 6
            return (
              <path
                key={i}
                fill={accent}
                opacity="0.32"
                stroke={ink}
                strokeWidth="1.8"
                transform={"translate(" + x + " " + y + ") rotate(" + (side * (28 + a * 26) - 30) + ")"}
                d={
                  "M0 0c" + side * 6 + " " + -(16 + a * 8) + " " + side * 26 + " " + -(24 + a * 10) + " " + side * len + " " + -lift +
                  "c" + -(side * 4) + " " + (16 + a * 6) + " " + -(side * 22) + " " + (26 + a * 8) + " " + -(side * len) + " " + lift + "z"
                }
              />
            )
          })}
        </g>
      )

    /* Knobbly rhizome — dry ginger, turmeric, nut grass. */
    case "rhizome":
      return (
        <g transform="translate(200 158)">
          <path
            fill={accent}
            opacity="0.32"
            stroke={ink}
            strokeWidth="2"
            strokeLinejoin="round"
            d="M-78 6c0-22 18-34 38-30 14 3 20 14 34 14 16 0 24-14 42-10 20 4 28 22 22 40-6 17-24 24-42 20-14-3-22-12-36-12-16 0-26 12-42 6-10-4-16-16-16-28z"
          />
          {[...Array(4)].map((_, i) => {
            const a = ((seed + i * 61) % 100) / 100
            return (
              <path
                key={i}
                stroke={ink}
                fill="none"
                strokeWidth="1.6"
                opacity="0.5"
                d={"M" + (-52 + i * 32) + " " + (-18 - a * 6) + "c" + (4 + a * 6) + " 14 2 26 " + -(2 + a * 4) + " " + (34 + a * 8)}
              />
            )
          })}
          <path stroke={ink} fill="none" strokeWidth="2" strokeLinecap="round" opacity="0.8" d="M52-26c8-14 6-26-4-36" />
        </g>
      )

    /* Elongated pod or catkin — bitter gourd, long pepper. */
    case "pod":
      return (
        <g transform="translate(200 158) rotate(-14)">
          <path
            fill={accent}
            opacity="0.32"
            stroke={ink}
            strokeWidth="2"
            d="M0-84c18 0 30 18 30 46v30c0 28-12 46-30 46s-30-18-30-46v-30c0-28 12-46 30-46z"
          />
          {[...Array(5)].map((_, i) => {
            const a = ((seed + i * 43) % 100) / 100
            return (
              <path
                key={i}
                stroke={ink}
                fill="none"
                strokeWidth="1.5"
                opacity="0.55"
                d={"M" + (-22 + i * 11) + " " + -(60 + a * 10) + "c" + (-3 + a * 6) + " 40 " + (-3 + a * 6) + " 80 0 " + (118 + a * 8)}
              />
            )
          })}
          <path stroke={ink} fill="none" strokeWidth="2.2" strokeLinecap="round" d="M0-84c0-14-6-22-16-28" />
        </g>
      )

    /* Resin in an assay dish — Shilajit. */
    case "resin":
      return (
        <g transform="translate(200 162)">
          <path {...stroke} d="M-86 10h172a86 42 0 0 1-172 0z" />
          <path
            fill={accent}
            opacity="0.72"
            stroke={ink}
            strokeWidth="2"
            d="M-52 10c-6-26 12-46 40-48 32-2 52 16 50 38-1 12-14 20-44 20-28 0-44-2-46-10z"
          />
          <path fill="#FFFFFF" opacity="0.28" d="M-24-24c8-10 24-14 36-8-10 2-22 8-28 16-5 6-12 2-8-8z" />
          <path stroke={accent} fill="none" strokeWidth="2" opacity="0.7" d="M-86 10h172" />
        </g>
      )

    /* Generic whole-plant line drawing — fallback for uncategorised botanicals. */
    case "botanical":
      return (
        <g transform="translate(200 160)">
          <path stroke={ink} fill="none" strokeWidth="2.5" strokeLinecap="round" d="M0 86V-42" />
          <path stroke={ink} fill="none" strokeWidth="2" strokeLinecap="round" d="M0 40c-14-6-24-18-28-32M0 8c14-6 24-18 28-32" />
          <g transform={`rotate(${-8 + v1 * 16} 0 -42)`}>
            <path fill={accent} opacity="0.25" stroke={ink} strokeWidth="2" d="M0-42c-30-6-52-26-56-56 32-4 54 18 56 56z" />
          </g>
          <g transform={`rotate(${8 - v2 * 16} 0 -42)`}>
            <path fill={accent} opacity="0.25" stroke={ink} strokeWidth="2" d="M0-42c30-6 52-26 56-56-32-4-54 18-56 56z" />
          </g>
          <path fill={accent} opacity="0.35" stroke={ink} strokeWidth="2" d="M0-46c-18-18-22-46-8-70 20 14 24 44 8 70z" />
          <path stroke={ink} strokeWidth="1.4" fill="none" opacity="0.45" d="M-6-58c-14-6-26-16-34-28M6-58c14-6 26-16 34-28" />
          <ellipse cx={-42 + v1 * 16} cy="62" rx={15 + v2 * 6} ry={9 + v1 * 4} {...stroke} opacity="0.8" />
          <ellipse cx={24 + v2 * 14} cy="72" rx={12 + v1 * 5} ry={8 + v2 * 3} {...stroke} opacity="0.8" />
        </g>
      )

    /* Stacked ingots with granules — elemental materials. */
    case "metal":
      return (
        <g transform="translate(200 162)">
          <path {...stroke} d="M-84 22h100l22-26h-100z" fill={ink} fillOpacity="0.1" />
          <path {...stroke} d="M-84 22v26h100V22" fill={ink} fillOpacity="0.16" />
          <path {...stroke} d="M16 48V22l22-26v26z" fill={ink} fillOpacity="0.06" />
          <path {...stroke} d="M-60 -24h100l22-26h-100z" fill={ink} fillOpacity="0.1" />
          <path {...stroke} d="M-60 -24v26h100v-26" fill={ink} fillOpacity="0.16" />
          <path {...stroke} d="M40 2v-26l22-26v26z" fill={ink} fillOpacity="0.06" />
          <path stroke={accent} strokeWidth="2.5" fill="none" d="M-56 -18h92" />
          {[...Array(5)].map((_, i) => {
            const a = ((seed + i * 53) % 100) / 100
            return <circle key={i} cx={-80 + i * 22 + a * 10} cy={66 + a * 8} r={4 + a * 3} {...stroke} strokeWidth="1.8" />
          })}
        </g>
      )

    /* Sealed fibre drum — solids supplied in bulk packing. */
    default:
      return (
        <g transform="translate(200 158)">
          <ellipse cx="0" cy="-58" rx="56" ry="18" {...stroke} fill={ink} fillOpacity="0.1" />
          <path {...stroke} d="M-56 -58v104a56 18 0 0 0 112 0V-58" fill={ink} fillOpacity="0.08" />
          <path
            stroke={accent}
            strokeWidth="2.5"
            fill="none"
            d={`M-55 ${-24 + v1 * 12}a56 18 0 0 0 110 0M-55 ${12 + v2 * 12}a56 18 0 0 0 110 0`}
          />
          <ellipse cx="0" cy="-58" rx="26" ry="8" {...stroke} strokeWidth="1.6" opacity="0.6" />
        </g>
      )
  }
}

/* ------------------------------ Component -------------------------------- */

interface ProductVisualProps {
  product: Product
  className?: string
}

export function ProductVisual({ product, className }: ProductVisualProps) {
  const palette = palettes[product.category]
  const form = visualFormFor(product)
  const seed = hash(product.slug)
  const uid = `pv-${product.slug}`

  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`${product.name} — ${categoryName(product.category).toLowerCase()} supplied by Sheetal Aromatics, illustrated as ${
        product.physicalForm ? product.physicalForm.toLowerCase() : form
      }`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
        <pattern id={`${uid}-hex`} width="42" height="48.5" patternUnits="userSpaceOnUse" patternTransform="translate(6 4)">
          <path
            d="M21 0 42 12.1 42 36.4 21 48.5 0 36.4 0 12.1z"
            fill="none"
            stroke={palette.ink}
            strokeWidth="0.7"
            opacity="0.13"
          />
        </pattern>
      </defs>

      <rect width="400" height="300" fill={`url(#${uid}-bg)`} />
      <rect width="400" height="300" fill={`url(#${uid}-hex)`} />

      <Motif form={form} ink={palette.ink} accent={product.tone ?? palette.accent} seed={seed} />

    </svg>
  )
}

/** Category tiles reuse the same visual language via a representative product. */
export function CategoryVisual({
  category,
  sample,
  className,
}: {
  category: CategorySlug
  sample: Product | undefined
  className?: string
}) {
  if (!sample) return <div className={cn("bg-muted", className)} aria-hidden="true" />
  return <ProductVisual product={sample} className={className} />
}
