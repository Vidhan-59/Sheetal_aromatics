/**
 * Industries served.
 *
 * Each industry page pairs a short, hand-written brief for that buyer with the
 * products from the catalogue that the industry actually uses — selected from
 * categories, explicit slugs and application keywords in lib/products-data.ts.
 * Copy describes how the materials are generally used and what buyers should
 * specify; it makes no claims about certifications, customers or volumes.
 */

import { productsDatabase, type CategorySlug, type Product } from "@/lib/products-data"

export interface Industry {
  slug: string
  name: string
  /** H1 on the industry page. */
  title: string
  /** One line for cards and the index page. */
  summary: string
  intro: string[]
  /** What buyers in this industry should state with an enquiry. */
  specify: string[]
  categories?: CategorySlug[]
  slugs?: string[]
  /** Matched against each product's applications. */
  applicationMatch?: RegExp
  /** Guide slugs worth reading for this industry. */
  guides?: string[]
  seo: { title: string; description: string }
}

export const industries: Industry[] = [
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    title: "Pharmaceutical raw materials and intermediates",
    summary: "Intermediates, excipients, catalysts and reagents for API and formulation manufacturers.",
    intro: [
      "Pharmaceutical manufacturers source two kinds of material from us: building blocks for synthesis — benzimidazole and diphenyl intermediates, phase transfer catalysts and reagents such as sodium metal and iodine — and formulation ingredients such as sorbitol 70% solution, sodium benzoate, benzyl alcohol and menthol.",
      "Every pharmaceutical enquiry is handled against the buyer's own specification. Tell us the assay, impurity limits, pharmacopoeia reference (IP, BP, USP or EP) and documents your quality team needs, and we will confirm what can be supplied before quoting.",
    ],
    specify: [
      "Assay and individual / total impurity limits",
      "Pharmacopoeia or in-house specification reference",
      "Documents required (COA, MSDS/SDS, method of analysis)",
      "Pack size and whether a pre-shipment sample is needed",
    ],
    categories: ["pharma-intermediates", "phase-transfer-catalysts"],
    slugs: ["sorbitol-70-solution", "sodium-benzoate", "benzyl-alcohol", "menthol", "iodine", "sodium-metal", "methyl-salicylate"],
    guides: ["phase-transfer-catalysts-selection-guide", "chemical-quotation-checklist"],
    seo: {
      title: "Pharmaceutical Raw Material Supplier, Ahmedabad",
      description:
        "Pharma intermediates, phase transfer catalysts, excipients and reagents for API and formulation manufacturers. Supplier in Ahmedabad, India — request a quote.",
    },
  },
  {
    slug: "food-and-beverage",
    name: "Food & Beverage",
    title: "Food and beverage ingredients",
    summary: "Preservatives, humectants, flavour esters, cooling agents and essential oils.",
    intro: [
      "Food, beverage and bakery manufacturers use our preservatives — sodium benzoate, potassium sorbate and calcium propionate — alongside sorbitol 70% solution, fruity flavour esters, menthol and steam-distilled oils such as peppermint, clove and lemongrass.",
      "Food use is governed by the regulations of the market you sell into, such as FSSAI in India. State the grade and food standard you work to, and the documentation your QA team requires, and we will confirm suitability before quoting.",
    ],
    specify: [
      "Food grade and the standard you work to (e.g. FSSAI, FCC)",
      "Particle form — powder or granules — where it matters",
      "Documents required (COA, MSDS/SDS, allergen or origin statements)",
      "Monthly volume and pack size",
    ],
    categories: ["food-pharma-ingredients"],
    slugs: ["isoamyl-acetate", "isoamyl-butyrate", "benzyl-butyrate", "menthol", "peppermint-oil", "clove-oil", "lemongrass-oil", "cinnamon-oil"],
    applicationMatch: /food|beverage|confection|flavour/i,
    guides: ["food-preservatives-guide", "chemical-quotation-checklist"],
    seo: {
      title: "Food Ingredient & Preservative Supplier, Gujarat",
      description:
        "Sodium benzoate, potassium sorbate, calcium propionate, sorbitol 70%, flavour esters and essential oils for food & beverage. Ahmedabad, India.",
    },
  },
  {
    slug: "fragrance-and-flavour",
    name: "Fragrance & Flavour",
    title: "Aroma chemicals and essential oils for fragrance and flavour houses",
    summary: "Benzyl esters, aromatic alcohols, salicylates, specialty crystals and essential oils.",
    intro: [
      "Fragrance compounders and flavour houses source our aromatic chemicals — the benzyl and isoamyl ester family, benzyl alcohol, methyl salicylate, indole, Yara Yara and menthol — together with essential oils and isolates such as eugenol and anethole.",
      "Olfactive quality matters as much as assay in this trade. Share your odour standard or a reference sample along with the purity you work to, and we will match the material to it before quoting.",
    ],
    specify: [
      "Purity / assay and any odour standard or reference sample",
      "For essential oils, the key constituent range (e.g. citral, eugenol, menthol)",
      "Documents required (COA, MSDS/SDS, IFRA information if needed)",
      "Pack size — sample, trial lot or regular volume",
    ],
    categories: ["aromatic-chemicals", "essential-oils"],
    guides: ["chemical-quotation-checklist", "importing-chemicals-from-india"],
    seo: {
      title: "Aroma Chemicals & Essential Oils for Perfumery",
      description:
        "Benzyl acetate, benzyl alcohol, esters, menthol, Yara Yara and essential oils for fragrance and flavour houses. Supplier in Ahmedabad, India.",
    },
  },
  {
    slug: "cosmetics-and-personal-care",
    name: "Cosmetics & Personal Care",
    title: "Ingredients for cosmetics, oral care and personal care",
    summary: "Preservatives, solvents, humectants, cooling agents and essential oils.",
    intro: [
      "Personal-care and oral-care manufacturers use benzyl alcohol and sodium benzoate as preservatives, sorbitol 70% solution as a humectant in toothpaste, menthol and methyl salicylate for cooling and fragrance, and essential oils such as tea tree, eucalyptus, rosemary and peppermint.",
      "Tell us the grade and the regulatory framework of your market, and whether you need cosmetic- or pharma-grade documentation, so the material can be confirmed before quoting.",
    ],
    specify: [
      "Grade (cosmetic, pharma or food) and the market you sell into",
      "Documents required (COA, MSDS/SDS)",
      "For essential oils, origin and constituent profile",
      "Pack size and delivery schedule",
    ],
    slugs: [
      "benzyl-alcohol",
      "benzyl-benzoate",
      "sodium-benzoate",
      "potassium-sorbate",
      "sorbitol-70-solution",
      "menthol",
      "methyl-salicylate",
      "tea-tree-oil",
      "eucalyptus-oil",
      "rosemary-oil",
      "peppermint-oil",
    ],
    applicationMatch: /cosmetic|personal care|oral care|skin/i,
    guides: ["food-preservatives-guide", "chemical-quotation-checklist"],
    seo: {
      title: "Cosmetic & Personal Care Ingredient Supplier",
      description:
        "Benzyl alcohol, sodium benzoate, sorbitol 70%, menthol and essential oils for cosmetics, oral care and personal care. Ahmedabad, India.",
    },
  },
  {
    slug: "ayurveda-and-nutraceuticals",
    name: "Ayurveda & Nutraceuticals",
    title: "Ayurvedic herbs, raw materials and powders",
    summary: "Whole herbs, seeds and roots plus milled powders including Ashwagandha and Shilajit.",
    intro: [
      "Ayurvedic pharmacies, nutraceutical brands and supplement manufacturers source both whole raw materials — roots, fruits, seeds and rhizomes such as Ashwagandha, Amla, Harad, Shatavari and Gokhru — and the milled powders produced from them, including Triphala, Moringa, Turmeric and Shilajit.",
      "Botanical raw materials vary with origin and season. State the botanical name, plant part, mesh size, moisture limit and any marker assay you require, and we will source and quote against that specification.",
    ],
    specify: [
      "Botanical name and plant part",
      "Mesh size and moisture limit for powders",
      "Marker assay where relevant (e.g. withanolides, fulvic acid)",
      "Documents required and destination market",
    ],
    categories: ["ayurvedic-products"],
    guides: ["chemical-quotation-checklist", "importing-chemicals-from-india"],
    seo: {
      title: "Ayurvedic & Nutraceutical Raw Material Supplier",
      description:
        "Ashwagandha, Amla, Triphala, Moringa, Shilajit and other Ayurvedic herbs and powders for nutraceutical and Ayurvedic manufacturers. Ahmedabad, India.",
    },
  },
  {
    slug: "chemical-synthesis",
    name: "Chemical & Agrochemical Synthesis",
    title: "Catalysts, intermediates and reagents for fine chemical and agrochemical synthesis",
    summary: "Phase transfer catalysts, quaternary salts, intermediates and reactive metals.",
    intro: [
      "Fine chemical and agrochemical manufacturers use our phase transfer catalysts — TEBAC, TBAB, benzyl tributyl ammonium chloride and the triphenyl phosphonium salts — to run alkylation, substitution and Wittig chemistry, alongside intermediates such as diphenyl acetonitrile and reagents such as sodium metal and iodine.",
      "Share the reaction or the specification you work to — assay, moisture and halide limits matter for most catalysts — and we will confirm the right grade before quoting. Reactive and dangerous goods are packed and shipped under the agreed handling arrangements.",
    ],
    specify: [
      "Assay, moisture and halide limits",
      "Anhydrous or solution form, where both exist",
      "Documents required (COA, MSDS/SDS, DG declaration for hazardous items)",
      "Quantity and destination, for packing and transport",
    ],
    categories: ["phase-transfer-catalysts", "pharma-intermediates"],
    slugs: ["sodium-metal", "iodine"],
    guides: ["phase-transfer-catalysts-selection-guide", "importing-chemicals-from-india"],
    seo: {
      title: "Phase Transfer Catalyst & Intermediate Supplier",
      description:
        "TEBAC, TBAB, phosphonium salts, intermediates and reagents for fine chemical and agrochemical synthesis. Supplier in Ahmedabad, India.",
    },
  },
  {
    slug: "industrial",
    name: "Industrial & Specialty",
    title: "Industrial chemicals for glass, electronics, coatings and polymers",
    summary: "High-purity metals, solvents, electrolytes, curing accelerators and corrosion inhibitors.",
    intro: [
      "Industrial buyers use selenium in glass decolourising and electronics, benzyl alcohol as a solvent for inks and coatings, quaternary salts such as TEABF4 as electrolytes and phosphonium salts as curing accelerators in polymer chemistry, and sodium benzoate as a corrosion inhibitor.",
      "Industrial grades are quoted against the purity, particle size and packing you specify. Tell us the end use and destination with the enquiry so handling and documentation can be confirmed.",
    ],
    specify: [
      "Purity and particle size or form",
      "End use, for grade confirmation",
      "Documents required (COA, MSDS/SDS)",
      "Bulk packing — drums, bags or IBCs",
    ],
    categories: ["metals"],
    slugs: ["benzyl-alcohol", "sodium-benzoate"],
    applicationMatch: /glass|electronic|polymer|coating|resin|curing|electrolyte|corrosion|metallurg|ink/i,
    guides: ["chemical-quotation-checklist", "importing-chemicals-from-india"],
    seo: {
      title: "Industrial Chemical Supplier in Ahmedabad",
      description:
        "Selenium, solvents, electrolytes, curing accelerators and corrosion inhibitors for glass, electronics, coatings and polymers. Ahmedabad, India.",
    },
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}

export function industryHref(industry: Industry): string {
  return `/industries/${industry.slug}`
}

export function productsForIndustry(industry: Industry): Product[] {
  const explicit = new Set(industry.slugs ?? [])
  return productsDatabase.filter(
    (p) =>
      explicit.has(p.slug) ||
      industry.categories?.includes(p.category) ||
      (industry.applicationMatch && p.applications.some((a) => industry.applicationMatch!.test(a))),
  )
}

/** Industries a product is listed under, for cross-links on product pages. */
export function industriesForProduct(product: Product): Industry[] {
  return industries.filter((industry) => productsForIndustry(industry).some((p) => p.slug === product.slug))
}
