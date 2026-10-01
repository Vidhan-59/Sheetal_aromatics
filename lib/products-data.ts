/**
 * Product catalogue.
 *
 * Data-driven so new products can be added by appending one object — routes,
 * sitemap entries, search, filters, breadcrumbs and metadata all derive from
 * this file.
 *
 * Accuracy rules applied throughout:
 *  - `casNumber`, `molecularFormula` and `molecularWeight` are public,
 *    verifiable chemical identifiers, not company claims.
 *  - `typicalGrade` carries forward the grade wording the business already
 *    published. It is rendered as indicative, with final specification
 *    confirmed per order.
 *  - No price, MOQ, stock, packaging, certification or origin is asserted
 *    anywhere. Those fields exist in the UI as "confirmed on enquiry".
 *  - `technicalNote` is general, published chemistry/industry context about
 *    the substance — it is labelled as such in the UI and is never presented
 *    as a statement about Sheetal Aromatics' own material.
 */

export type CategorySlug =
  | "aromatic-chemicals"
  | "essential-oils"
  | "ayurvedic-products"
  | "metals"
  | "pharma-intermediates"
  | "phase-transfer-catalysts"

export type VisualForm =
  | "liquid"
  | "crystal"
  | "powder"
  | "solid"
  | "oil"
  | "metal"
  /* Botanical raw-material forms — chosen to match the part of the plant
     actually traded, so a root does not get drawn as a leaf. */
  | "root"
  | "fruit"
  | "spiky-fruit"
  | "seed"
  | "leaf"
  | "rhizome"
  | "pod"
  | "resin"
  | "botanical"

export interface ProductCategory {
  slug: CategorySlug
  name: string
  /** One-line positioning used on cards and in the mega menu. */
  tagline: string
  /** Card / meta description length. */
  description: string
  /** Full intro paragraph on the category page. */
  intro: string
  /** Optional sub-grouping shown as filter chips on the category page. */
  groups?: string[]
  /** Slug of the product whose image represents the category on tiles. Defaults to the first product. */
  cover?: string
  seo: { title: string; description: string }
}

export interface Product {
  slug: string
  name: string
  category: CategorySlug
  /** Sub-group within a category (currently used by Ayurvedic Products). */
  group?: string
  /** Short line used on cards and in search results. */
  summary: string
  /** Longer overview paragraph on the product page. */
  overview?: string

  casNumber?: string
  molecularFormula?: string
  molecularWeight?: string
  typicalGrade?: string
  physicalForm?: string

  appearance?: string
  odor?: string
  boilingPoint?: string
  meltingPoint?: string
  density?: string
  solubility?: string
  storage?: string

  /** Overrides the motif inferred from category and physical form. */
  visual?: VisualForm
  /** Material colour used by the product illustration, where it is characteristic. */
  tone?: string

  synonyms?: string[]
  applications: string[]
  keywords: string[]
  /** General published context about the substance, clearly labelled in the UI. */
  technicalNote?: string
  /** Overrides the generated meta description when a hand-written one reads better. */
  seo?: { title?: string; description?: string }
}

/* ------------------------------------------------------------------------ */
/* Categories                                                                */
/* ------------------------------------------------------------------------ */

export const productCategories: ProductCategory[] = [
  {
    slug: "aromatic-chemicals",
    cover: "menthol",
    name: "Aromatic Chemicals",
    tagline: "Esters, alcohols and specialty aroma ingredients",
    description:
      "Benzyl esters, aromatic alcohols, salicylates and specialty aroma ingredients for fragrance, flavour, cosmetic and industrial formulations.",
    intro:
      "Our aromatic chemicals range covers the benzyl and isoamyl ester family, aromatic alcohols, salicylates and specialty crystals used across fragrance houses, flavour compounders, cosmetic manufacturers and industrial formulators. Each enquiry is handled against your own specification sheet — share the grade, purity and packaging you work to and we will respond with availability and a quotation.",
    seo: {
      title: "Aromatic Chemicals Supplier & Exporter",
      description:
        "Benzyl acetate, benzyl alcohol, benzyl benzoate, isoamyl acetate, methyl salicylate, menthol and more, from Ahmedabad, India. Request a quotation.",
    },
  },
  {
    slug: "essential-oils",
    cover: "clove-oil",
    name: "Essential Oils",
    tagline: "Steam-distilled oils and isolated aroma compounds",
    description:
      "Steam-distilled essential oils and isolated aroma compounds including lemongrass, eucalyptus, clove, peppermint, eugenol and anethole.",
    intro:
      "We supply steam-distilled essential oils alongside the isolated aroma compounds derived from them, such as eugenol, methyl eugenol and anethole. Oils are sourced against the constituent profile our customers work to; specification sheets and sampling arrangements are discussed at enquiry stage.",
    seo: {
      title: "Essential Oils Supplier & Exporter, India",
      description:
        "Lemongrass, eucalyptus, clove, peppermint, patchouli, sandalwood oils plus eugenol and anethole, from Ahmedabad, India. Request a quotation.",
    },
  },
  {
    slug: "ayurvedic-products",
    cover: "ashwagandha",
    name: "Ayurvedic Products",
    tagline: "Herbs, raw materials and milled powders",
    description:
      "Ayurvedic herbs, seeds and raw materials plus finely milled powders including Ashwagandha, Amla, Triphala, Neem, Tulsi and Moringa.",
    intro:
      "Our Ayurvedic range covers both whole herbs and raw materials and the milled powders produced from them. Buyers working to a mesh size, assay marker or moisture limit should share those requirements with the enquiry so the material can be sourced and quoted against the correct specification.",
    groups: ["Herbs & Raw Materials", "Powders"],
    seo: {
      title: "Ayurvedic Herbs & Powders Supplier, India",
      description:
        "Ashwagandha, Amla, Harad, Baheda, Shatavari, Triphala, Neem, Tulsi, Moringa and more, as herbs or milled powders. Ahmedabad, India.",
    },
  },
  {
    slug: "metals",
    cover: "selenium-metal-powder",
    name: "Metals",
    tagline: "High-purity elements for industry and synthesis",
    description:
      "High-purity elemental materials for industrial, electronic, laboratory and synthesis applications, including selenium, iodine and sodium metal.",
    intro:
      "We handle high-purity elemental materials used in industrial processing, electronics, laboratory work and chemical synthesis. Several items in this range are reactive or otherwise restricted and require handling, packing and transport arrangements to be agreed before despatch — please state your intended grade, quantity and destination with the enquiry.",
    seo: {
      title: "Metals Supplier — Selenium, Iodine, Sodium",
      description:
        "Selenium metal powder, iodine and sodium metal for industrial, laboratory and synthesis use. Supplied from Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "pharma-intermediates",
    cover: "2-mercapto-5-methoxybenzimidazole",
    name: "Pharma Intermediates",
    tagline: "Building blocks for pharmaceutical synthesis",
    description:
      "Benzimidazole, diphenyl and related intermediates supplied as building blocks for pharmaceutical and fine chemical synthesis.",
    intro:
      "Our pharma intermediates range supports customers manufacturing active ingredients and fine chemicals. Enquiries are handled against your specification — share the assay, impurity limits and documentation you require and we will confirm what can be supplied and quote accordingly.",
    seo: {
      title: "Pharma Intermediates Supplier, India",
      description:
        "2-Mercapto-5-methoxybenzimidazole, diphenyl acetonitrile, diphenyl acetic acid and related building blocks. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "phase-transfer-catalysts",
    cover: "benzyl-triphenyl-phosphonium-chloride",
    name: "Phase Transfer Catalysts",
    tagline: "Quaternary ammonium and phosphonium salts",
    description:
      "Quaternary ammonium and phosphonium salts including TEBAC, TBAB, TBAF, TBAI, and triphenyl phosphonium salts for synthesis and polymer work.",
    intro:
      "Our phase transfer catalyst range covers the quaternary ammonium and phosphonium salts used to carry reactants between aqueous and organic phases — in alkylation, substitution and condensation chemistry for pharmaceutical, agrochemical and fine chemical manufacture — along with triphenyl phosphonium salts used as Wittig reagent precursors and curing accelerators. Share the assay, moisture limit and packing you work to and we will respond with availability and a quotation.",
    seo: {
      title: "Phase Transfer Catalysts Supplier, India",
      description:
        "TEBAC, TBAB, TBAF, TBAI, triphenyl phosphonium halides, and quaternary ammonium catalysts from Ahmedabad, India.",
    },
  },
]

/* ------------------------------------------------------------------------ */
/* Products                                                                  */
/* ------------------------------------------------------------------------ */

export const productsDatabase: Product[] = [
  /* ---------------------------- Aromatic Chemicals ---------------------- */
  {
    slug: "benzyl-acetate",
    name: "Benzyl Acetate",
    category: "aromatic-chemicals",
    summary: "Aromatic ester with a sweet, jasmine-like floral character, widely used in perfumery and flavours.",
    overview:
      "Benzyl acetate is one of the most widely used floral esters in fragrance compounding, valued for its clean jasmine character and good stability in soap and detergent bases. It is also used as a flavour ingredient and as a solvent for cellulose derivatives.",
    casNumber: "140-11-4",
    molecularFormula: "C9H10O2",
    molecularWeight: "150.17 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Liquid",
    appearance: "Clear colourless liquid",
    odor: "Sweet floral, jasmine-like",
    boilingPoint: "213 °C",
    density: "1.055 g/cm³ at 20 °C",
    synonyms: ["Benzyl ethanoate", "Acetic acid benzyl ester"],
    applications: ["Perfumery", "Flavours", "Cosmetics", "Soaps & Detergents", "Solvent"],
    keywords: ["benzyl", "acetate", "ester", "fragrance", "floral", "jasmine", "sweet"],
  },
  {
    slug: "benzyl-alcohol",
    name: "Benzyl Alcohol",
    category: "aromatic-chemicals",
    summary: "Versatile aromatic alcohol used as a solvent, preservative and fragrance ingredient.",
    overview:
      "Benzyl alcohol is a general-purpose aromatic alcohol used as a solvent for resins and inks, a carrier and preservative in personal care formulations, and a fixative in fragrance compounding. Its low volatility and mild odour make it useful across a wide range of formulation work.",
    casNumber: "100-51-6",
    molecularFormula: "C7H8O",
    molecularWeight: "108.14 g/mol",
    typicalGrade: "99.5%+",
    physicalForm: "Liquid",
    appearance: "Clear colourless liquid",
    odor: "Faint sweet, slightly aromatic",
    boilingPoint: "205.3 °C",
    synonyms: ["Phenylmethanol", "Phenylcarbinol", "Benzenemethanol"],
    applications: ["Solvent", "Preservative", "Fragrance", "Pharmaceutical Formulation", "Inks & Coatings"],
    keywords: ["benzyl", "alcohol", "solvent", "preservative", "phenylmethanol"],
  },
  {
    slug: "benzyl-benzoate",
    name: "Benzyl Benzoate",
    category: "aromatic-chemicals",
    summary: "Aromatic ester used as a fixative in perfumery and as a solvent and carrier.",
    overview:
      "Benzyl benzoate is a heavy, low-volatility ester used as a fixative and diluent in fragrance compounding and as a solvent for other aroma materials. It is also long established as a topical pharmaceutical ingredient.",
    casNumber: "120-51-4",
    molecularFormula: "C14H12O2",
    molecularWeight: "212.24 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Liquid",
    synonyms: ["Benzoic acid benzyl ester"],
    applications: ["Perfumery Fixative", "Solvent", "Pharmaceutical", "Cosmetics"],
    keywords: ["benzyl", "benzoate", "ester", "solvent", "fixative", "fragrance"],
  },
  {
    slug: "benzyl-propionate",
    name: "Benzyl Propionate",
    category: "aromatic-chemicals",
    summary: "Fruity aromatic ester with a sweet, honey-like character.",
    casNumber: "122-63-4",
    molecularFormula: "C10H12O2",
    typicalGrade: "98%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavours", "Cosmetics"],
    keywords: ["benzyl", "propionate", "fruity", "honey", "sweet", "ester"],
  },
  {
    slug: "benzyl-butyrate",
    name: "Benzyl Butyrate",
    category: "aromatic-chemicals",
    summary: "Fruity aromatic ester with a plum-like character used in flavour and fragrance work.",
    casNumber: "103-37-7",
    molecularFormula: "C11H14O2",
    typicalGrade: "98%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavours", "Food Industry"],
    keywords: ["benzyl", "butyrate", "fruity", "plum", "ester"],
  },
  {
    slug: "phenyl-ethyl-isobutyrate",
    name: "Phenyl Ethyl Isobutyrate",
    category: "aromatic-chemicals",
    summary: "Rose-toned aromatic ester used in fine fragrance compounding.",
    casNumber: "103-48-0",
    molecularFormula: "C12H16O2",
    typicalGrade: "98%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Fine Fragrance", "Cosmetics"],
    keywords: ["phenyl", "ethyl", "isobutyrate", "rose", "floral"],
  },
  {
    slug: "phenoxy-ethyl-isobutyrate",
    name: "Phenoxy Ethyl Isobutyrate",
    category: "aromatic-chemicals",
    summary: "Honey-rose aromatic ester with good tenacity for perfumery applications.",
    casNumber: "103-60-6",
    molecularFormula: "C12H16O3",
    typicalGrade: "98%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Fragrance Compounding", "Cosmetics"],
    keywords: ["phenoxy", "ethyl", "isobutyrate", "honey", "rose"],
  },
  {
    slug: "isoamyl-acetate",
    name: "Isoamyl Acetate",
    category: "aromatic-chemicals",
    summary: "Banana-character fruity ester used widely in flavour compounding.",
    casNumber: "123-92-2",
    molecularFormula: "C7H14O2",
    typicalGrade: "99%+",
    physicalForm: "Liquid",
    synonyms: ["Isopentyl acetate", "Banana oil"],
    applications: ["Flavours", "Food Industry", "Perfumery", "Solvent"],
    keywords: ["isoamyl", "acetate", "banana", "fruity", "flavouring", "isopentyl"],
  },
  {
    slug: "isoamyl-butyrate",
    name: "Isoamyl Butyrate",
    category: "aromatic-chemicals",
    summary: "Pear-character fruity ester used in flavour and beverage applications.",
    casNumber: "106-27-4",
    molecularFormula: "C9H18O2",
    typicalGrade: "98%+",
    physicalForm: "Liquid",
    applications: ["Flavours", "Food Industry", "Beverages"],
    keywords: ["isoamyl", "butyrate", "pear", "fruity", "ester"],
  },
  {
    slug: "ethyl-benzoate",
    name: "Ethyl Benzoate",
    category: "aromatic-chemicals",
    summary: "Sweet aromatic ester with a wintergreen-leaning odour profile.",
    casNumber: "93-89-0",
    molecularFormula: "C9H10O2",
    typicalGrade: "99%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavours", "Solvent"],
    keywords: ["ethyl", "benzoate", "sweet", "wintergreen", "ester"],
  },
  {
    slug: "indole-powder",
    name: "Indole Powder",
    category: "aromatic-chemicals",
    summary: "Crystalline aromatic heterocycle used at trace levels in fine fragrance.",
    overview:
      "Indole is used in very small proportions to give white-floral accords their natural depth, and is also a building block in chemical synthesis. It is supplied as a crystalline solid.",
    casNumber: "120-72-9",
    molecularFormula: "C8H7N",
    typicalGrade: "99%+",
    physicalForm: "Powder / Crystalline solid",
    synonyms: ["1H-Indole", "Benzopyrrole"],
    applications: ["Perfumery", "Fine Fragrance", "Chemical Synthesis"],
    keywords: ["indole", "powder", "crystalline", "aromatic", "heterocycle", "floral"],
  },
  {
    slug: "methyl-salicylate",
    name: "Methyl Salicylate",
    category: "aromatic-chemicals",
    summary: "Wintergreen ester with a characteristic minty-medicinal aroma.",
    overview:
      "Methyl salicylate, commonly known as wintergreen, is used in topical preparations, oral care and flavour work. It has a strong, immediately recognisable minty-medicinal character.",
    casNumber: "119-36-8",
    molecularFormula: "C8H8O3",
    typicalGrade: "99%+",
    physicalForm: "Liquid",
    synonyms: ["Wintergreen oil (synthetic)", "Methyl 2-hydroxybenzoate"],
    applications: ["Topical Preparations", "Oral Care", "Flavours", "Perfumery"],
    keywords: ["methyl", "salicylate", "wintergreen", "minty", "topical"],
  },
  {
    slug: "menthol",
    name: "Menthol",
    category: "aromatic-chemicals",
    summary: "Crystalline cooling agent with a clean, refreshing mint character.",
    overview:
      "Menthol is the principal cooling agent used across oral care, confectionery, topical preparations and tobacco-free mint applications. It is supplied in crystal form.",
    casNumber: "89-78-1",
    molecularFormula: "C10H20O",
    typicalGrade: "99%+",
    physicalForm: "Crystals",
    synonyms: ["Menthol crystals", "2-Isopropyl-5-methylcyclohexanol"],
    applications: ["Oral Care", "Pharmaceutical", "Cosmetics", "Food Industry", "Confectionery"],
    keywords: ["menthol", "crystals", "cooling", "mint", "refreshing"],
  },
  {
    slug: "methyl-benzoate",
    name: "Methyl Benzoate",
    category: "aromatic-chemicals",
    summary: "Aromatic ester with a pleasant fruity-floral odour, also used as a solvent.",
    casNumber: "93-58-3",
    molecularFormula: "C8H8O2",
    typicalGrade: "99%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavours", "Solvent"],
    keywords: ["methyl", "benzoate", "fruity", "ester", "solvent"],
  },
  {
    slug: "yara-yara-crystal",
    name: "Yara Yara Crystal",
    category: "aromatic-chemicals",
    summary: "Specialty aromatic crystal used in classical perfumery accords.",
    casNumber: "93-04-9",
    molecularFormula: "C11H10O",
    molecularWeight: "158.20 g/mol",
    typicalGrade: "High grade",
    physicalForm: "Crystals",
    synonyms: ["2-Methoxynaphthalene (Yara Yara)", "Methyl 2-naphthyl ether", "Nerolin Yara Yara"],
    applications: ["Perfumery", "Fine Fragrance", "Specialty Compounding"],
    keywords: ["yara yara", "crystal", "specialty", "aromatic", "perfumery", "methoxynaphthalene", "nerolin"],
  },

  /* ------------------------------- Essential Oils ----------------------- */
  {
    slug: "lemongrass-oil",
    name: "Lemongrass Oil",
    category: "essential-oils",
    summary: "Steam-distilled lemongrass oil with a fresh, citral-led citrus character.",
    overview:
      "Lemongrass oil is valued for its bright citrus top note and its citral content, which also makes it a feedstock for downstream aroma chemistry. Buyers working to a citral percentage should state the required range with the enquiry.",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    applications: ["Aromatherapy", "Perfumery", "Flavours", "Household & Insect Repellent"],
    keywords: ["lemongrass", "citrus", "citral", "steam distilled", "natural", "essential oil"],
  },
  {
    slug: "cinnamon-oil",
    name: "Cinnamon Oil",
    category: "essential-oils",
    summary: "Warm, spicy essential oil with the characteristic cinnamon profile.",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    applications: ["Aromatherapy", "Flavours", "Perfumery", "Traditional Preparations"],
    keywords: ["cinnamon", "spicy", "warm", "cassia", "essential oil"],
  },
  {
    slug: "clove-oil",
    name: "Clove Oil",
    category: "essential-oils",
    summary: "Strongly spicy essential oil, rich in eugenol.",
    overview:
      "Clove oil is one of the highest-eugenol natural oils and is used both directly and as the starting material for eugenol isolation. Bud, leaf and stem oils differ in profile — please specify which is required.",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    applications: ["Dental & Oral Care", "Aromatherapy", "Flavours", "Eugenol Feedstock"],
    keywords: ["clove", "spicy", "eugenol", "dental", "essential oil"],
  },
  {
    slug: "eucalyptus-oil",
    name: "Eucalyptus Oil",
    category: "essential-oils",
    summary: "Refreshing camphoraceous oil, rich in eucalyptol (1,8-cineole).",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    synonyms: ["Eucalyptus globulus oil"],
    applications: ["Pharmaceutical", "Aromatherapy", "Personal Care", "Respiratory Preparations"],
    keywords: ["eucalyptus", "cineole", "eucalyptol", "camphor", "refreshing", "essential oil"],
  },
  {
    slug: "peppermint-oil",
    name: "Peppermint Oil",
    category: "essential-oils",
    summary: "Cooling essential oil with a fresh, menthol-led mint character.",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    synonyms: ["Mentha piperita oil"],
    applications: ["Food Industry", "Oral Care", "Pharmaceutical", "Cosmetics"],
    keywords: ["peppermint", "mentha", "cooling", "menthol", "mint", "essential oil"],
  },
  {
    slug: "patchouli-oil",
    name: "Patchouli Oil",
    category: "essential-oils",
    summary: "Earthy, musky essential oil with excellent tenacity as a base note.",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Aromatherapy", "Cosmetics", "Traditional Preparations"],
    keywords: ["patchouli", "earthy", "musky", "base note", "essential oil"],
  },
  {
    slug: "eugenol",
    name: "Eugenol",
    category: "essential-oils",
    summary: "Phenolic aroma compound with a clove-like character, isolated from clove oil.",
    casNumber: "97-53-0",
    molecularFormula: "C10H12O2",
    typicalGrade: "99%+",
    physicalForm: "Liquid",
    synonyms: ["4-Allyl-2-methoxyphenol"],
    applications: ["Dental & Oral Care", "Perfumery", "Flavours", "Pharmaceutical"],
    keywords: ["eugenol", "clove", "phenolic", "dental", "aroma isolate"],
  },
  {
    slug: "methyl-eugenol",
    name: "Methyl Eugenol",
    category: "essential-oils",
    summary: "Sweet, spicy aroma compound with a carnation-like character.",
    casNumber: "93-15-2",
    molecularFormula: "C11H14O2",
    typicalGrade: "99%+",
    physicalForm: "Liquid",
    synonyms: ["4-Allylveratrole", "Eugenol methyl ether"],
    applications: ["Perfumery", "Flavours", "Cosmetics"],
    keywords: ["methyl", "eugenol", "sweet", "spicy", "carnation", "aroma isolate"],
  },
  {
    slug: "anethole",
    name: "Anethole",
    category: "essential-oils",
    summary: "Sweet aroma compound with the characteristic anise profile.",
    casNumber: "104-46-1",
    molecularFormula: "C10H12O",
    typicalGrade: "99%+",
    physicalForm: "Liquid / Crystalline below room temperature",
    synonyms: ["trans-Anethole", "Anise camphor"],
    applications: ["Flavours", "Confectionery", "Perfumery", "Pharmaceutical"],
    keywords: ["anethole", "anise", "sweet", "liquorice", "flavouring"],
  },
  {
    slug: "sandalwood-oil",
    name: "Sandalwood Oil",
    category: "essential-oils",
    summary: "Woody, creamy essential oil used as a premium perfumery base note.",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Aromatherapy", "Cosmetics", "Traditional Preparations"],
    keywords: ["sandalwood", "woody", "creamy", "santalol", "essential oil"],
  },
  {
    slug: "rosemary-oil",
    name: "Rosemary Oil",
    category: "essential-oils",
    summary: "Herbaceous essential oil with a fresh, woody-camphoraceous character.",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    applications: ["Aromatherapy", "Hair Care", "Flavours", "Personal Care"],
    keywords: ["rosemary", "herbaceous", "woody", "hair care", "essential oil"],
  },
  {
    slug: "tea-tree-oil",
    name: "Tea Tree Oil",
    category: "essential-oils",
    summary: "Melaleuca oil with a fresh medicinal character, used widely in skin care.",
    typicalGrade: "100% pure essential oil",
    physicalForm: "Liquid",
    synonyms: ["Melaleuca alternifolia oil"],
    applications: ["Skin Care", "Personal Care", "Aromatherapy", "Household"],
    keywords: ["tea tree", "melaleuca", "terpinen", "skin care", "essential oil"],
  },

  /* ---------------------- Ayurvedic Products — Herbs -------------------- */
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "root",
    tone: "#B08A5E",
    summary: "Withania somnifera root, one of the most widely traded adaptogenic raw materials.",
    typicalGrade: "Natural grade",
    synonyms: ["Withania somnifera", "Indian winter cherry"],
    applications: ["Ayurvedic Formulation", "Dietary Supplements", "Extraction Feedstock"],
    keywords: ["ashwagandha", "withania", "adaptogen", "root", "herb"],
  },
  {
    slug: "amla",
    name: "Amla",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "fruit",
    tone: "#8FA03C",
    summary: "Indian gooseberry fruit, a long-established raw material in Ayurvedic formulation.",
    typicalGrade: "Natural grade",
    synonyms: ["Emblica officinalis", "Indian gooseberry"],
    applications: ["Dietary Supplements", "Hair & Personal Care", "Ayurvedic Formulation"],
    keywords: ["amla", "emblica", "gooseberry", "fruit", "herb"],
  },
  {
    slug: "harad",
    name: "Harad",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "fruit",
    tone: "#8A6A3C",
    summary: "Terminalia chebula fruit, one of the three components of Triphala.",
    typicalGrade: "Natural grade",
    synonyms: ["Terminalia chebula", "Haritaki"],
    applications: ["Ayurvedic Formulation", "Triphala Blends", "Extraction Feedstock"],
    keywords: ["harad", "haritaki", "terminalia", "chebula", "triphala"],
  },
  {
    slug: "baheda",
    name: "Baheda",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "fruit",
    tone: "#7A5F3A",
    summary: "Terminalia bellirica fruit, the second component of the Triphala blend.",
    typicalGrade: "Natural grade",
    synonyms: ["Terminalia bellirica", "Bibhitaki"],
    applications: ["Ayurvedic Formulation", "Triphala Blends", "Extraction Feedstock"],
    keywords: ["baheda", "bibhitaki", "terminalia", "bellirica", "triphala"],
  },
  {
    slug: "gokhru",
    name: "Gokhru",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "spiky-fruit",
    tone: "#A08A55",
    summary: "Tribulus terrestris fruit, a long-used raw material in traditional formulation.",
    typicalGrade: "Natural grade",
    synonyms: ["Tribulus terrestris", "Gokshura"],
    applications: ["Ayurvedic Formulation", "Dietary Supplements", "Extraction Feedstock"],
    keywords: ["gokhru", "gokshura", "tribulus", "terrestris", "herb"],
  },
  {
    slug: "shatavari",
    name: "Shatavari",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "root",
    tone: "#C2A882",
    summary: "Asparagus racemosus root, widely used in women's wellness formulations.",
    typicalGrade: "Natural grade",
    synonyms: ["Asparagus racemosus"],
    applications: ["Ayurvedic Formulation", "Dietary Supplements", "Extraction Feedstock"],
    keywords: ["shatavari", "asparagus", "racemosus", "root", "herb"],
  },
  {
    slug: "jamun-beej",
    name: "Jamun Beej",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "seed",
    tone: "#5B4A6B",
    summary: "Syzygium cumini (Java plum) seed, a traditional Ayurvedic raw material.",
    typicalGrade: "Natural grade",
    synonyms: ["Syzygium cumini seed", "Jamun seed", "Java plum seed"],
    applications: ["Ayurvedic Formulation", "Dietary Supplements", "Extraction Feedstock"],
    keywords: ["jamun", "beej", "syzygium", "cumini", "seed"],
  },
  {
    slug: "karela",
    name: "Karela",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "pod",
    tone: "#6E8A3A",
    summary: "Momordica charantia (bitter gourd), used dried in traditional formulation.",
    typicalGrade: "Natural grade",
    synonyms: ["Momordica charantia", "Bitter gourd", "Bitter melon"],
    applications: ["Ayurvedic Formulation", "Dietary Supplements", "Extraction Feedstock"],
    keywords: ["karela", "momordica", "bitter gourd", "bitter melon"],
  },
  {
    slug: "nasottar",
    name: "Nasottar",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "leaf",
    tone: "#5A7D42",
    summary: "Traditional Ayurvedic raw material supplied against customer specification.",
    typicalGrade: "Natural grade",
    applications: ["Ayurvedic Formulation", "Traditional Preparations"],
    keywords: ["nasottar", "traditional", "ayurvedic", "herb"],
  },
  {
    slug: "vavding",
    name: "Vavding",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "seed",
    tone: "#6B4A3A",
    summary: "Embelia ribes fruit, used in classical Ayurvedic formulations.",
    typicalGrade: "Natural grade",
    synonyms: ["Embelia ribes", "Vidanga", "False black pepper"],
    applications: ["Ayurvedic Formulation", "Traditional Preparations", "Extraction Feedstock"],
    keywords: ["vavding", "vidanga", "embelia", "ribes", "herb"],
  },
  {
    slug: "lindi-pepper",
    name: "Lindi Pepper",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "pod",
    tone: "#6B4A32",
    summary: "Piper longum (long pepper), used as both a spice and an Ayurvedic raw material.",
    typicalGrade: "Natural grade",
    synonyms: ["Piper longum", "Long pepper", "Pippali"],
    applications: ["Ayurvedic Formulation", "Spice", "Extraction Feedstock"],
    keywords: ["lindi", "pippali", "long pepper", "piper longum", "spice"],
  },
  {
    slug: "sunth-ginger",
    name: "Sunth (Ginger)",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "rhizome",
    tone: "#C2A05A",
    summary: "Dried ginger rhizome, used as a spice and Ayurvedic raw material.",
    typicalGrade: "Natural grade",
    synonyms: ["Zingiber officinale", "Dry ginger", "Sonth"],
    applications: ["Ayurvedic Formulation", "Spice", "Food Industry", "Extraction Feedstock"],
    keywords: ["sunth", "sonth", "ginger", "zingiber", "dry ginger", "spice"],
  },
  {
    slug: "nimboda-beej",
    name: "Nimboda Beej",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "seed",
    tone: "#8A7A4A",
    summary: "Neem (Azadirachta indica) seed, used in traditional and industrial applications.",
    typicalGrade: "Natural grade",
    synonyms: ["Neem seed", "Azadirachta indica seed"],
    applications: ["Ayurvedic Formulation", "Traditional Preparations", "Extraction Feedstock"],
    keywords: ["nimboda", "beej", "neem seed", "azadirachta", "seed"],
  },
  {
    slug: "garcinia-cambogia",
    name: "Garcinia Cambogia",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "fruit",
    tone: "#9A6B3A",
    summary: "Garcinia gummi-gutta rind, a widely traded botanical raw material.",
    typicalGrade: "Natural grade",
    synonyms: ["Garcinia gummi-gutta", "Malabar tamarind", "Kokum-family rind"],
    applications: ["Dietary Supplements", "Extraction Feedstock", "Traditional Preparations"],
    keywords: ["garcinia", "cambogia", "malabar tamarind", "hca", "botanical"],
  },
  {
    slug: "nagarmotha",
    name: "Nagarmotha",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "rhizome",
    tone: "#7A6242",
    summary: "Cyperus rotundus (nut grass) rhizome, used in Ayurvedic and perfumery applications.",
    typicalGrade: "Natural grade",
    synonyms: ["Cyperus rotundus", "Nut grass", "Musta"],
    applications: ["Ayurvedic Formulation", "Perfumery Raw Material", "Extraction Feedstock"],
    keywords: ["nagarmotha", "cyperus", "rotundus", "musta", "nut grass"],
  },
  {
    slug: "danti-beej",
    name: "Danti Beej",
    category: "ayurvedic-products",
    group: "Herbs & Raw Materials",
    visual: "seed",
    tone: "#7A6A4A",
    summary: "Baliospermum montanum seed, used in classical Ayurvedic formulations.",
    typicalGrade: "Natural grade",
    synonyms: ["Baliospermum montanum seed", "Danti seed"],
    applications: ["Ayurvedic Formulation", "Traditional Preparations"],
    keywords: ["danti", "beej", "baliospermum", "seed", "ayurvedic"],
  },

  /* --------------------- Ayurvedic Products — Powders ------------------- */
  {
    slug: "ashwagandha-powder",
    name: "Ashwagandha Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#B08A5E",
    summary: "Milled Withania somnifera root powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Withania somnifera root powder"],
    applications: ["Dietary Supplements", "Ayurvedic Formulation", "Nutraceutical Blending"],
    keywords: ["ashwagandha", "powder", "withania", "root powder", "adaptogen"],
  },
  {
    slug: "amla-powder",
    name: "Amla Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#8FA03C",
    summary: "Milled Indian gooseberry fruit powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Emblica officinalis powder"],
    applications: ["Dietary Supplements", "Hair & Personal Care", "Ayurvedic Formulation"],
    keywords: ["amla", "powder", "emblica", "gooseberry", "fruit powder"],
  },
  {
    slug: "harad-powder",
    name: "Harad Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#8A6A3C",
    summary: "Milled Terminalia chebula fruit powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Haritaki powder", "Terminalia chebula powder"],
    applications: ["Ayurvedic Formulation", "Triphala Blending", "Dietary Supplements"],
    keywords: ["harad", "haritaki", "powder", "terminalia", "chebula"],
  },
  {
    slug: "triphala-powder",
    name: "Triphala Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#7A5230",
    summary: "Classical three-fruit blend of Harad, Baheda and Amla in powder form.",
    overview:
      "Triphala is the classical Ayurvedic combination of Haritaki (Harad), Bibhitaki (Baheda) and Amalaki (Amla). Buyers working to a particular ratio or mesh size should confirm it with the enquiry.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Triphala churna"],
    applications: ["Ayurvedic Formulation", "Dietary Supplements", "Nutraceutical Blending"],
    keywords: ["triphala", "powder", "churna", "three fruits", "harad baheda amla"],
  },
  {
    slug: "neem-powder",
    name: "Neem Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#4E7A3A",
    summary: "Milled neem leaf powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Azadirachta indica leaf powder"],
    applications: ["Personal Care", "Ayurvedic Formulation", "Agricultural & Household"],
    keywords: ["neem", "powder", "azadirachta", "leaf powder"],
  },
  {
    slug: "tulsi-powder",
    name: "Tulsi Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#3E6B38",
    summary: "Milled holy basil leaf powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Ocimum sanctum powder", "Holy basil powder"],
    applications: ["Dietary Supplements", "Ayurvedic Formulation", "Herbal Teas"],
    keywords: ["tulsi", "powder", "holy basil", "ocimum", "leaf powder"],
  },
  {
    slug: "gokhru-powder",
    name: "Gokhru Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#A08A55",
    summary: "Milled Tribulus terrestris fruit powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Gokshura powder", "Tribulus terrestris powder"],
    applications: ["Dietary Supplements", "Ayurvedic Formulation", "Nutraceutical Blending"],
    keywords: ["gokhru", "gokshura", "powder", "tribulus"],
  },
  {
    slug: "karela-powder",
    name: "Karela Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#6E8A3A",
    summary: "Milled bitter gourd powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Momordica charantia powder", "Bitter gourd powder"],
    applications: ["Dietary Supplements", "Ayurvedic Formulation", "Nutraceutical Blending"],
    keywords: ["karela", "powder", "momordica", "bitter gourd"],
  },
  {
    slug: "sunth-powder",
    name: "Sunth Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#C2A05A",
    summary: "Milled dry ginger powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Dry ginger powder", "Sonth powder", "Zingiber officinale powder"],
    applications: ["Food Industry", "Ayurvedic Formulation", "Spice Blending"],
    keywords: ["sunth", "sonth", "powder", "ginger", "dry ginger"],
  },
  {
    slug: "garcinia-cambogia-powder",
    name: "Garcinia Cambogia Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#9A6B3A",
    summary: "Milled Garcinia rind powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Garcinia gummi-gutta powder", "Malabar tamarind powder"],
    applications: ["Dietary Supplements", "Nutraceutical Blending", "Extraction Feedstock"],
    keywords: ["garcinia", "cambogia", "powder", "malabar tamarind"],
  },
  {
    slug: "moringa-powder",
    name: "Moringa Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#4F7C42",
    summary: "Milled Moringa oleifera leaf powder.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Moringa oleifera leaf powder", "Drumstick leaf powder"],
    applications: ["Dietary Supplements", "Food & Beverage", "Nutraceutical Blending"],
    keywords: ["moringa", "powder", "oleifera", "leaf powder", "drumstick"],
  },
  {
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "ayurvedic-products",
    group: "Powders",
    tone: "#C8901F",
    summary: "Milled Curcuma longa rhizome powder.",
    overview:
      "Turmeric is traded both as a culinary spice and as a curcuminoid feedstock. Buyers working to a curcumin percentage should state the required range with the enquiry so material can be sourced accordingly.",
    typicalGrade: "Natural grade",
    physicalForm: "Powder",
    synonyms: ["Curcuma longa powder", "Haldi powder"],
    applications: ["Food Industry", "Dietary Supplements", "Ayurvedic Formulation", "Extraction Feedstock"],
    keywords: ["turmeric", "haldi", "powder", "curcuma", "curcumin"],
  },
  {
    slug: "shilajit-powder-3",
    name: "Shilajit Powder (3% Fulvic Acid)",
    category: "ayurvedic-products",
    group: "Powders",
    visual: "resin",
    tone: "#3B2E24",
    summary: "Shilajit powder offered at a 3% fulvic acid specification.",
    typicalGrade: "3% fulvic acid",
    physicalForm: "Powder",
    synonyms: ["Shilajit 3%", "Asphaltum powder"],
    applications: ["Dietary Supplements", "Ayurvedic Formulation", "Nutraceutical Blending"],
    keywords: ["shilajit", "powder", "fulvic acid", "3%", "asphaltum"],
  },
  {
    slug: "shilajit-powder-5",
    name: "Shilajit Powder (5% Fulvic Acid)",
    category: "ayurvedic-products",
    group: "Powders",
    visual: "resin",
    tone: "#33271E",
    summary: "Shilajit powder offered at a 5% fulvic acid specification.",
    typicalGrade: "5% fulvic acid",
    physicalForm: "Powder",
    synonyms: ["Shilajit 5%", "Asphaltum powder"],
    applications: ["Dietary Supplements", "Ayurvedic Formulation", "Nutraceutical Blending"],
    keywords: ["shilajit", "powder", "fulvic acid", "5%", "asphaltum"],
  },
  {
    slug: "shilajit-powder-7",
    name: "Shilajit Powder (7% Fulvic Acid)",
    category: "ayurvedic-products",
    group: "Powders",
    visual: "resin",
    tone: "#2B2019",
    summary: "Shilajit powder offered at a 7% fulvic acid specification.",
    typicalGrade: "7% fulvic acid",
    physicalForm: "Powder",
    synonyms: ["Shilajit 7%", "Asphaltum powder"],
    applications: ["Dietary Supplements", "Ayurvedic Formulation", "Nutraceutical Blending"],
    keywords: ["shilajit", "powder", "fulvic acid", "7%", "asphaltum"],
  },

  /* ------------------------------------ Metals -------------------------- */
  {
    slug: "selenium-metal-powder",
    name: "Selenium Metal Powder",
    category: "metals",
    summary: "High-purity selenium metal powder for industrial, glass and laboratory applications.",
    overview:
      "Selenium is used in glass decolourising and colouring, electronics, metallurgy and as a trace element source. It is supplied here in powder form.",
    casNumber: "7782-49-2",
    molecularFormula: "Se",
    molecularWeight: "78.97 g/mol",
    typicalGrade: "99.9%",
    physicalForm: "Powder",
    synonyms: ["Selenium metal", "Grey selenium", "Elemental selenium"],
    applications: ["Glass Industry", "Electronics", "Metallurgy", "Laboratory & Research"],
    keywords: ["selenium", "metal", "selenium metal", "powder", "high purity", "se", "industrial"],
  },
  {
    slug: "iodine",
    name: "Iodine",
    category: "metals",
    summary: "High-purity iodine for pharmaceutical, antiseptic and industrial use.",
    casNumber: "7553-56-2",
    molecularFormula: "I2",
    molecularWeight: "253.81 g/mol",
    typicalGrade: "99.5%",
    physicalForm: "Solid (resublimed crystals)",
    synonyms: ["Resublimed iodine", "Iodine crystals"],
    applications: ["Pharmaceutical", "Antiseptic Preparations", "Industrial Chemistry", "Laboratory & Research"],
    keywords: ["iodine", "i2", "resublimed", "high purity", "antiseptic"],
  },
  {
    slug: "sodium-metal",
    name: "Sodium Metal",
    category: "metals",
    summary: "Elemental sodium, a soft alkali metal used as a strong reducing agent in chemical synthesis.",
    overview:
      "Sodium metal is supplied against the grade, form and packing agreed at enquiry stage. Because it is water-reactive, handling, packing and transport arrangements are confirmed for every order before despatch — please state your intended grade, quantity, destination and end use with your enquiry.",
    casNumber: "7440-23-5",
    molecularFormula: "Na",
    molecularWeight: "22.99 g/mol",
    physicalForm: "Solid",
    appearance: "Soft, silvery-white metal that tarnishes rapidly in air",
    meltingPoint: "97.8 °C",
    boilingPoint: "883 °C",
    density: "0.968 g/cm³ at 20 °C",
    storage:
      "Water-reactive. Stored and shipped protected from moisture and air, under mineral oil or an inert atmosphere, in line with applicable dangerous-goods requirements.",
    synonyms: ["Natrium", "Sodium (elemental)", "Na metal"],
    applications: [
      "Reducing Agent in Organic Synthesis",
      "Sodium Alkoxide Manufacture",
      "Pharmaceutical & Fine Chemical Intermediates",
      "Metal Reduction",
      "Laboratory & Research",
    ],
    keywords: ["sodium", "metal", "na", "alkali metal", "reducing agent", "sodium metal supplier"],
    technicalNote:
      "General information: sodium is an alkali metal that reacts vigorously with water and moist air, releasing hydrogen. It is classified as a dangerous good for transport and is handled under inert conditions. Grade, form, purity and packing are confirmed per order.",
    seo: {
      title: "Sodium Metal Supplier | CAS 7440-23-5",
      description:
        "Sodium metal (CAS 7440-23-5) for chemical synthesis and reduction. Grade, packing and handling confirmed per order. Ahmedabad, India.",
    },
  },

  /* ------------------------------ Pharma Intermediates ------------------ */
  {
    slug: "2-mercapto-5-methoxybenzimidazole",
    name: "2-Mercapto-5-Methoxybenzimidazole",
    category: "pharma-intermediates",
    summary:
      "Substituted benzimidazole thiol used as a building block in pharmaceutical synthesis.",
    overview:
      "2-Mercapto-5-Methoxybenzimidazole is a methoxy-substituted benzimidazole-2-thiol. It is handled as a pharmaceutical intermediate and supplied against the buyer's own specification — assay, impurity limits, packing and documentation are confirmed at enquiry stage.",
    casNumber: "37052-78-1",
    molecularFormula: "C8H8N2OS",
    molecularWeight: "180.23 g/mol",
    physicalForm: "Solid",
    synonyms: [
      "5-Methoxy-2-mercaptobenzimidazole",
      "2-Mercapto-5-methoxy-1H-benzimidazole",
      "5-Methoxy-1H-benzimidazole-2-thiol",
    ],
    applications: ["Pharmaceutical Synthesis", "Fine Chemical Manufacturing", "Laboratory & Research"],
    keywords: [
      "2-mercapto-5-methoxybenzimidazole",
      "5-methoxy-2-mercaptobenzimidazole",
      "benzimidazole",
      "37052-78-1",
      "pharma intermediate",
      "mmbi",
    ],
    technicalNote:
      "General information: this compound is a known benzimidazole intermediate documented in the published literature and in supplier catalogues, including in routes to substituted benzimidazole active ingredients. This is general chemistry context about the substance and is not a statement about a specific grade, assay or application of material supplied by Sheetal Aromatics.",
    seo: {
      title: "2-Mercapto-5-Methoxybenzimidazole | CAS 37052-78-1",
      description:
        "2-Mercapto-5-Methoxybenzimidazole (CAS 37052-78-1) supplied as a pharmaceutical intermediate from Ahmedabad, India. Request a quotation.",
    },
  },
  {
    slug: "2-mercapto-benzimidazole",
    name: "2-Mercapto Benzimidazole",
    category: "pharma-intermediates",
    summary: "Benzimidazole thiol used as an intermediate and in industrial applications.",
    casNumber: "583-39-1",
    molecularFormula: "C7H6N2S",
    molecularWeight: "150.20 g/mol",
    typicalGrade: "98%+",
    physicalForm: "Solid",
    synonyms: ["2-Mercaptobenzimidazole", "1H-Benzimidazole-2-thiol", "MBI"],
    applications: ["Pharmaceutical Synthesis", "Fine Chemical Manufacturing", "Industrial Additive"],
    keywords: ["mercapto", "benzimidazole", "mbi", "583-39-1", "thiol", "intermediate"],
  },
  {
    slug: "diphenyl-acetonitrile",
    name: "Diphenyl Acetonitrile",
    category: "pharma-intermediates",
    summary: "Diphenyl-substituted nitrile used as an intermediate in pharmaceutical synthesis.",
    casNumber: "86-29-3",
    molecularFormula: "C14H11N",
    molecularWeight: "193.24 g/mol",
    typicalGrade: "98%+",
    physicalForm: "Solid",
    synonyms: ["2,2-Diphenylacetonitrile", "α-Phenylbenzeneacetonitrile"],
    applications: ["Pharmaceutical Synthesis", "Fine Chemical Manufacturing", "Laboratory & Research"],
    keywords: ["diphenyl", "acetonitrile", "86-29-3", "nitrile", "intermediate"],
  },
  {
    slug: "diphenyl-acetic-acid",
    name: "Diphenyl Acetic Acid",
    category: "pharma-intermediates",
    summary: "Diphenyl-substituted carboxylic acid used as a pharmaceutical building block.",
    casNumber: "117-34-0",
    molecularFormula: "C14H12O2",
    molecularWeight: "212.24 g/mol",
    typicalGrade: "98%+",
    physicalForm: "Solid",
    synonyms: ["2,2-Diphenylacetic acid", "α-Phenylphenylacetic acid"],
    applications: ["Pharmaceutical Synthesis", "Fine Chemical Manufacturing", "Laboratory & Research"],
    keywords: ["diphenyl", "acetic acid", "117-34-0", "carboxylic acid", "intermediate"],
  },
  {
    slug: "dimethyl-isopropyl-chloride-hydrochloride",
    name: "Dimethyl Isopropyl Chloride Hydrochloride",
    category: "pharma-intermediates",
    summary: "Specialised intermediate supplied against customer specification.",
    typicalGrade: "98%+",
    physicalForm: "Solid",
    applications: ["Pharmaceutical Synthesis", "Fine Chemical Manufacturing"],
    keywords: ["dimethyl", "isopropyl", "chloride", "hydrochloride", "intermediate"],
  },
  {
    slug: "benzhydryl-thioacetamide",
    name: "Benzhydryl Thioacetamide",
    category: "pharma-intermediates",
    summary: "Benzhydryl thioether amide used as an intermediate in pharmaceutical synthesis.",
    casNumber: "68524-30-1",
    molecularFormula: "C15H15NOS",
    molecularWeight: "257.35 g/mol",
    typicalGrade: "98%+",
    physicalForm: "Solid",
    synonyms: ["2-(Benzhydrylthio)acetamide", "2-[(Diphenylmethyl)thio]acetamide", "Benhydryl thioacetamide"],
    applications: ["Pharmaceutical Synthesis", "Fine Chemical Manufacturing"],
    keywords: ["benzhydryl", "benhydryl", "thioacetamide", "diphenylmethylthio", "68524-30-1", "intermediate"],
  },
  {
    slug: "2-2-diphenyl-4-bromo-butyronitrile",
    name: "2,2-Diphenyl-4-Bromo Butyronitrile",
    category: "pharma-intermediates",
    summary: "Brominated diphenyl nitrile used in multi-step pharmaceutical synthesis.",
    casNumber: "39186-58-8",
    molecularFormula: "C16H14BrN",
    molecularWeight: "300.19 g/mol",
    typicalGrade: "98%+",
    physicalForm: "Solid",
    synonyms: ["4-Bromo-2,2-diphenylbutyronitrile", "4-Bromo-2,2-diphenylbutanenitrile"],
    applications: ["Pharmaceutical Synthesis", "Fine Chemical Manufacturing", "Laboratory & Research"],
    keywords: ["diphenyl", "bromo", "butyronitrile", "39186-58-8", "intermediate", "synthesis"],
  },
  {
    slug: "2-phenyl-butyric-acid",
    name: "2-Phenyl Butyric Acid",
    category: "pharma-intermediates",
    summary: "Phenyl-substituted butyric acid used as a pharmaceutical building block.",
    casNumber: "90-27-7",
    molecularFormula: "C10H12O2",
    molecularWeight: "164.20 g/mol",
    typicalGrade: "98%+",
    physicalForm: "Solid",
    synonyms: ["α-Ethylphenylacetic acid", "2-Phenylbutanoic acid"],
    applications: ["Pharmaceutical Synthesis", "Fine Chemical Manufacturing"],
    keywords: ["phenyl", "butyric acid", "90-27-7", "intermediate", "building block"],
  },

  /* ---------------------------- Phase Transfer Catalysts ---------------- */
  {
    slug: "benzyl-triethyl-ammonium-chloride",
    name: "Benzyl Triethyl Ammonium Chloride",
    category: "phase-transfer-catalysts",
    summary: "TEBAC — one of the most widely used quaternary ammonium phase transfer catalysts.",
    overview:
      "Benzyl triethyl ammonium chloride (TEBAC, TEBA) is a quaternary ammonium salt used to carry anions from an aqueous or solid phase into an organic phase, so that alkylation, substitution, carbene and condensation reactions proceed between reagents that would not otherwise mix. It is used across pharmaceutical, agrochemical and fine chemical synthesis and in polymer and resin chemistry. Assay, moisture limit and packing are confirmed against each enquiry.",
    casNumber: "56-37-1",
    molecularFormula: "C13H22ClN",
    molecularWeight: "227.77 g/mol",
    physicalForm: "Crystalline powder",
    synonyms: ["TEBAC", "TEBA", "BTEAC", "Benzyltriethylammonium chloride", "Triethylbenzylammonium chloride"],
    applications: [
      "Phase Transfer Catalysis",
      "Pharmaceutical Synthesis",
      "Agrochemical Synthesis",
      "Polymer & Resin Chemistry",
      "Fine Chemical Manufacturing",
    ],
    keywords: ["tebac", "teba", "bteac", "benzyltriethylammonium", "quaternary ammonium", "phase transfer catalyst", "ptc", "quat"],
    technicalNote:
      "General information: TEBAC is a quaternary ammonium salt and is known to be hygroscopic, so it is normally kept in tightly closed containers away from moisture. This is general chemistry context about the substance and is not a statement about a specific grade or assay of material supplied by Sheetal Aromatics.",
    seo: {
      title: "Benzyl Triethyl Ammonium Chloride (TEBAC)",
      description:
        "Benzyl triethyl ammonium chloride (TEBAC, CAS 56-37-1), a quaternary ammonium phase transfer catalyst, supplied from Ahmedabad, India. Request a quotation.",
    },
  },
  {
    slug: "benzyl-tributyl-ammonium-chloride",
    name: "Benzyl Tributyl Ammonium Chloride",
    category: "phase-transfer-catalysts",
    summary: "Lipophilic quaternary ammonium phase transfer catalyst for alkylation and substitution chemistry.",
    overview:
      "Benzyl tributyl ammonium chloride (BTBAC) carries three butyl chains, which makes it more soluble in organic solvents than its triethyl analogue. It is used as a phase transfer catalyst in alkylation, esterification and nucleophilic substitution reactions, and in polymer chemistry. Assay and packing are confirmed against each enquiry.",
    casNumber: "23616-79-7",
    molecularFormula: "C19H34ClN",
    molecularWeight: "311.94 g/mol",
    physicalForm: "Crystalline powder",
    synonyms: ["BTBAC", "Benzyltributylammonium chloride", "Tributylbenzylammonium chloride"],
    applications: [
      "Phase Transfer Catalysis",
      "Alkylation & Substitution Reactions",
      "Pharmaceutical Synthesis",
      "Polymer Chemistry",
    ],
    keywords: ["btbac", "benzyltributylammonium", "tributylbenzylammonium", "quaternary ammonium", "phase transfer catalyst", "ptc", "quat"],
    seo: {
      title: "Benzyl Tributyl Ammonium Chloride | CAS 23616-79-7",
      description:
        "Benzyl tributyl ammonium chloride (BTBAC, CAS 23616-79-7), a lipophilic phase transfer catalyst, supplied from Ahmedabad, India. Request a quotation.",
    },
  },
  {
    slug: "phenyl-trimethyl-ammonium-chloride",
    name: "Phenyl Trimethyl Ammonium Chloride",
    category: "phase-transfer-catalysts",
    summary: "Aryl quaternary ammonium salt used as a phase transfer catalyst and synthesis reagent.",
    overview:
      "Phenyl trimethyl ammonium chloride (PTMAC), also known as N,N,N-trimethylanilinium chloride, is a quaternary ammonium salt used in organic synthesis as a phase transfer catalyst and as a reagent. Assay, moisture limit and packing are confirmed against each enquiry.",
    casNumber: "138-24-9",
    molecularFormula: "C9H14ClN",
    molecularWeight: "171.67 g/mol",
    physicalForm: "Crystalline powder",
    synonyms: ["PTMAC", "N,N,N-Trimethylanilinium chloride", "Trimethylphenylammonium chloride"],
    applications: ["Phase Transfer Catalysis", "Organic Synthesis", "Pharmaceutical Synthesis", "Laboratory & Research"],
    keywords: ["ptmac", "trimethylanilinium", "trimethylphenylammonium", "quaternary ammonium", "phase transfer catalyst", "ptc", "quat"],
    technicalNote:
      "General information: phenyl trimethyl ammonium chloride is known to be hygroscopic and is normally kept in tightly closed containers away from moisture. This is general chemistry context about the substance and is not a statement about a specific grade or assay of material supplied by Sheetal Aromatics.",
    seo: {
      title: "Phenyl Trimethyl Ammonium Chloride | CAS 138-24-9",
      description:
        "Phenyl trimethyl ammonium chloride (PTMAC, CAS 138-24-9) for phase transfer catalysis and organic synthesis. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "benzyl-triphenyl-phosphonium-chloride",
    name: "Benzyl Triphenyl Phosphonium Chloride",
    category: "phase-transfer-catalysts",
    summary: "Quaternary phosphonium salt used as a Wittig reagent precursor, catalyst and curing accelerator.",
    overview:
      "Benzyl triphenyl phosphonium chloride (BTPPC) is a quaternary phosphonium salt. It is the precursor to the benzylidene ylide used in Wittig olefination, is used as a phase transfer catalyst, and is widely used as an accelerator in the curing of fluoroelastomers. Assay and packing are confirmed against each enquiry.",
    casNumber: "1100-88-5",
    molecularFormula: "C25H22ClP",
    molecularWeight: "388.87 g/mol",
    physicalForm: "Crystalline powder",
    synonyms: ["BTPPC", "Benzyltriphenylphosphonium chloride", "(Phenylmethyl)triphenylphosphonium chloride"],
    applications: [
      "Wittig Reaction Reagent",
      "Phase Transfer Catalysis",
      "Fluoroelastomer Curing Accelerator",
      "Pharmaceutical Synthesis",
      "Fine Chemical Manufacturing",
    ],
    keywords: ["btppc", "benzyltriphenylphosphonium", "phosphonium salt", "wittig", "fluoroelastomer", "phase transfer catalyst", "ptc"],
    seo: {
      title: "Benzyl Triphenyl Phosphonium Chloride (BTPPC)",
      description:
        "Benzyl triphenyl phosphonium chloride (BTPPC, CAS 1100-88-5) for Wittig reactions, phase transfer catalysis and FKM curing. Ahmedabad, India.",
    },
  },
  {
    slug: "butyl-triphenyl-phosphonium-chloride",
    name: "Butyl Triphenyl Phosphonium Chloride",
    category: "phase-transfer-catalysts",
    summary: "Quaternary phosphonium salt used as a Wittig reagent precursor and phase transfer catalyst.",
    overview:
      "Butyl triphenyl phosphonium chloride is a quaternary phosphonium salt used as the precursor to the butylidene ylide in Wittig olefination, as a phase transfer catalyst, and as a catalyst in polymer and resin chemistry. Assay and packing are confirmed against each enquiry.",
    casNumber: "13371-17-0",
    molecularFormula: "C22H24ClP",
    molecularWeight: "354.86 g/mol",
    physicalForm: "Crystalline powder",
    synonyms: ["Butyltriphenylphosphonium chloride", "n-Butyltriphenylphosphonium chloride"],
    applications: ["Wittig Reaction Reagent", "Phase Transfer Catalysis", "Polymer & Resin Chemistry", "Fine Chemical Manufacturing"],
    keywords: ["butyltriphenylphosphonium", "phosphonium salt", "wittig", "phase transfer catalyst", "ptc"],
    seo: {
      title: "Butyl Triphenyl Phosphonium Chloride Supplier",
      description:
        "Butyl triphenyl phosphonium chloride (CAS 13371-17-0) for Wittig reactions, phase transfer catalysis and polymer work. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "ethyl-triphenyl-phosphonium-bromide",
    name: "Ethyl Triphenyl Phosphonium Bromide",
    category: "phase-transfer-catalysts",
    summary: "Quaternary phosphonium salt used as a Wittig olefination reagent and phase transfer catalyst.",
    overview:
      "Ethyl triphenyl phosphonium bromide (ETPPB) is an organophosphorus quaternary salt widely used as the precursor to the ethylidene ylide in Wittig reactions, converting aldehydes and ketones into alkenes. It also serves as an effective phase transfer catalyst in organic synthesis and as an accelerator or curing catalyst in epoxy resins and powder coatings. Specification, assay and packaging are confirmed per enquiry.",
    casNumber: "1530-32-1",
    molecularFormula: "C20H20BrP",
    molecularWeight: "371.25 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Crystalline powder",
    appearance: "White to off-white crystalline powder",
    meltingPoint: "203–208 °C",
    synonyms: ["ETPPB", "Ethyltriphenylphosphonium bromide", "(Ethyl)triphenylphosphonium bromide"],
    applications: [
      "Wittig Reaction Reagent",
      "Phase Transfer Catalysis",
      "Pharmaceutical Synthesis",
      "Epoxy Resin & Polymer Chemistry",
      "Fine Chemical Manufacturing",
    ],
    keywords: ["etppb", "ethyltriphenylphosphonium", "phosphonium salt", "wittig", "phase transfer catalyst", "ptc"],
    technicalNote:
      "General information: ethyl triphenyl phosphonium bromide is hygroscopic and should be stored in tightly sealed containers in a cool, dry place under an inert atmosphere where possible. This is general chemistry context and not a statement regarding a specific grade supplied by Sheetal Aromatics.",
    seo: {
      title: "Ethyl Triphenyl Phosphonium Bromide | CAS 1530-32-1",
      description:
        "Ethyl triphenyl phosphonium bromide (CAS 1530-32-1) for Wittig reactions, phase transfer catalysis and epoxy systems. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "ethyl-triphenyl-phosphonium-iodide",
    name: "Ethyl Triphenyl Phosphonium Iodide",
    category: "phase-transfer-catalysts",
    summary: "Quaternary phosphonium iodide used as a Wittig reagent precursor and catalyst in resin curing.",
    overview:
      "Ethyl triphenyl phosphonium iodide is a quaternary phosphonium salt used in organic synthesis, notably in Wittig olefination reactions, and as an active catalyst and promoter in the curing and advancement of phenolic and epoxy resins. Moisture limits, assay and packaging are confirmed against customer enquiry.",
    casNumber: "4736-60-1",
    molecularFormula: "C20H20IP",
    molecularWeight: "418.25 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Crystalline powder",
    appearance: "White to off-white crystalline powder",
    meltingPoint: "161–166 °C",
    synonyms: ["ETPPI", "Ethyltriphenylphosphonium iodide", "(Ethyl)triphenylphosphonium iodide"],
    applications: [
      "Wittig Reaction Reagent",
      "Phase Transfer Catalysis",
      "Phenolic & Epoxy Resin Curing",
      "Organic Synthesis",
    ],
    keywords: ["etppi", "ethyltriphenylphosphonium", "phosphonium iodide", "wittig", "phase transfer catalyst", "ptc"],
    technicalNote:
      "General information: ethyl triphenyl phosphonium iodide is light-sensitive and hygroscopic; standard practice requires storage in light-resistant, sealed containers under dry conditions. This is general scientific context about the substance.",
    seo: {
      title: "Ethyl Triphenyl Phosphonium Iodide Supplier | CAS 4736-60-1",
      description:
        "Ethyl triphenyl phosphonium iodide (CAS 4736-60-1) for Wittig olefination and resin curing catalysis. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "methyl-triphenyl-phosphonium-bromide",
    name: "Methyl Triphenyl Phosphonium Bromide",
    category: "phase-transfer-catalysts",
    summary: "Key precursor to methylenetriphenylphosphorane for Wittig methylenation of carbonyl compounds.",
    overview:
      "Methyl triphenyl phosphonium bromide (MTPPB) is one of the most widely used quaternary phosphonium salts in synthetic organic chemistry. It serves as the direct precursor to the methylidene ylide in Wittig methylenation reactions, converting aldehydes and ketones into terminal alkenes. It also functions as a cationic phase transfer catalyst and building block in pharmaceutical synthesis. Grade, assay and packaging confirmed upon enquiry.",
    casNumber: "1779-49-3",
    molecularFormula: "C19H18BrP",
    molecularWeight: "357.22 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Crystalline powder",
    appearance: "White to off-white crystalline powder",
    meltingPoint: "230–235 °C",
    synonyms: ["MTPPB", "Methyltriphenylphosphonium bromide", "(Methyl)triphenylphosphonium bromide"],
    applications: [
      "Wittig Methylenation",
      "Phase Transfer Catalysis",
      "Pharmaceutical Synthesis",
      "Organic Synthesis",
    ],
    keywords: ["mtppb", "methyltriphenylphosphonium", "wittig methylenation", "phosphonium salt", "phase transfer catalyst", "ptc"],
    technicalNote:
      "General information: methyl triphenyl phosphonium bromide is moderately hygroscopic and sensitive to humidity. Material is kept in tightly closed containers in a dry, ventilated area. This note provides general chemical context.",
    seo: {
      title: "Methyl Triphenyl Phosphonium Bromide (MTPPB)",
      description:
        "Methyl triphenyl phosphonium bromide (MTPPB, CAS 1779-49-3) for Wittig methylenation and phase transfer catalysis. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "methoxymethyl-triphenyl-phosphonium-chloride",
    name: "Methoxymethyl Triphenyl Phosphonium Chloride",
    category: "phase-transfer-catalysts",
    summary: "Wittig reagent precursor for one-carbon aldehyde homologation and stereoselective alkene synthesis.",
    overview:
      "Methoxymethyl triphenyl phosphonium chloride is a versatile phosphonium salt used extensively in organic synthesis as a Wittig reagent for carbonyl homologation. Reaction with aldehydes and ketones generates methoxyalkenes (enol ethers) that hydrolyze directly to the homologated aldehydes. It is an essential reagent in the total synthesis of natural products, pharmaceuticals and fine chemicals. Assay and packaging confirmed per enquiry.",
    casNumber: "4009-98-7",
    molecularFormula: "C20H20ClOP",
    molecularWeight: "342.80 g/mol",
    typicalGrade: "98%+",
    physicalForm: "Crystalline powder",
    appearance: "White to pale yellow crystalline powder",
    meltingPoint: "185–195 °C (dec.)",
    synonyms: ["MMPPC", "MTPC", "(Methoxymethyl)triphenylphosphonium chloride", "Triphenyl(methoxymethyl)phosphonium chloride"],
    applications: [
      "Wittig Homologation",
      "Carbonyl Homologation to Aldehydes",
      "Pharmaceutical Synthesis",
      "Phase Transfer Catalysis",
    ],
    keywords: ["methoxymethyltriphenylphosphonium", "mmppc", "wittig homologation", "aldehyde synthesis", "phosphonium salt", "ptc"],
    technicalNote:
      "General information: methoxymethyl triphenyl phosphonium chloride is hygroscopic and may decompose if exposed to excessive moisture or heat. Stored under dry conditions. This represents general scientific information.",
    seo: {
      title: "Methoxymethyl Triphenyl Phosphonium Chloride | CAS 4009-98-7",
      description:
        "Methoxymethyl triphenyl phosphonium chloride (CAS 4009-98-7) for Wittig homologation and fine chemical synthesis. Ahmedabad, India.",
    },
  },
  {
    slug: "tetrabutyl-ammonium-bromide",
    name: "Tetrabutyl Ammonium Bromide",
    category: "phase-transfer-catalysts",
    summary: "TBAB — the benchmark quaternary ammonium phase transfer catalyst for biphasic organic transformations.",
    overview:
      "Tetrabutyl ammonium bromide (TBAB) is among the most widely used and versatile phase transfer catalysts in commercial and laboratory organic synthesis. Its lipophilic tetrabutyl chains enable rapid migration of anions across aqueous-organic interfaces, accelerating alkylations, oxidations, reductions, nucleophilic substitutions and Heck reactions. It also serves as a molten salt ionic liquid medium. Assay, moisture limit and packaging are confirmed against enquiry.",
    casNumber: "1643-19-2",
    molecularFormula: "C16H36BrN",
    molecularWeight: "322.37 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Crystalline powder",
    appearance: "White crystalline powder",
    meltingPoint: "103–106 °C",
    synonyms: ["TBAB", "Tetrabutylammonium bromide", "Tetra-n-butylammonium bromide"],
    applications: [
      "Phase Transfer Catalysis",
      "Alkylation Reactions",
      "Pharmaceutical Synthesis",
      "Agrochemical Synthesis",
      "Ionic Liquid Precursor",
    ],
    keywords: ["tbab", "tetrabutylammonium bromide", "quaternary ammonium", "phase transfer catalyst", "ptc", "quat"],
    technicalNote:
      "General information: TBAB is hygroscopic and deliquescent in humid atmospheres; storage in tightly closed containers in a cool, dry area is standard industry practice. This note provides general chemical context.",
    seo: {
      title: "Tetrabutyl Ammonium Bromide (TBAB) | CAS 1643-19-2",
      description:
        "Tetrabutyl ammonium bromide (TBAB, CAS 1643-19-2), high-purity phase transfer catalyst for synthesis and industry. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "tetrabutyl-ammonium-fluoride",
    name: "Tetrabutyl Ammonium Fluoride",
    category: "phase-transfer-catalysts",
    summary: "TBAF — premier fluoride source for selective silyl ether deprotection and phase transfer reactions.",
    overview:
      "Tetrabutyl ammonium fluoride (TBAF) is an indispensable reagent in organic and medicinal chemistry, celebrated as the reagent of choice for cleaving silyl protecting groups (such as TBS, TBDPS, TMS and TIPS) under mild conditions. It is also used as a nucleophilic fluoride source, a mild base in carbon-carbon bond forming reactions, and as a phase transfer catalyst. Form (hydrate/solution), assay and packaging are confirmed against each enquiry.",
    casNumber: "429-41-4",
    molecularFormula: "C16H36FN",
    molecularWeight: "261.46 g/mol",
    typicalGrade: "98%+",
    physicalForm: "Crystalline solid",
    appearance: "White to off-white crystalline solid",
    meltingPoint: "62–63 °C",
    synonyms: ["TBAF", "Tetrabutylammonium fluoride", "Tetra-n-butylammonium fluoride"],
    applications: [
      "Silyl Ether Deprotection",
      "Fluorination Reagent",
      "Phase Transfer Catalysis",
      "Mild Base for Condensations",
      "Polymer Chemistry",
    ],
    keywords: ["tbaf", "tetrabutylammonium fluoride", "deprotection", "silyl ether", "fluoride source", "phase transfer catalyst", "ptc"],
    technicalNote:
      "General information: TBAF is extremely hygroscopic and typically supplied as a trihydrate or solution in THF to prevent decomposition. Avoid skin and eye contact. This is general chemical context.",
    seo: {
      title: "Tetrabutyl Ammonium Fluoride (TBAF) Supplier",
      description:
        "Tetrabutyl ammonium fluoride (TBAF, CAS 429-41-4) for silyl deprotection and organic synthesis. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "tetrabutyl-ammonium-hydrogen-sulphate",
    name: "Tetrabutyl Ammonium Hydrogen Sulphate",
    category: "phase-transfer-catalysts",
    summary: "TBAHS — quaternary ammonium phase transfer catalyst and widely used ion-pair chromatography reagent.",
    overview:
      "Tetrabutyl ammonium hydrogen sulphate (TBAHS, tetrabutylammonium bisulfate) is a versatile quaternary ammonium salt used as an efficient phase transfer catalyst in biphasic alkylations, oxidations and esterifications. Because of its lipophilic cation and acidic bisulfate anion, it is also widely employed as an ion-pairing reagent in reverse-phase HPLC and chromatography. Assay, purity grade and packing confirmed upon enquiry.",
    casNumber: "32503-27-8",
    molecularFormula: "C16H37NO4S",
    molecularWeight: "339.54 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Crystalline powder",
    appearance: "White crystalline powder",
    meltingPoint: "169–173 °C",
    synonyms: ["TBAHS", "Tetrabutylammonium hydrogen sulfate", "Tetrabutylammonium bisulfate"],
    applications: [
      "Phase Transfer Catalysis",
      "Ion-Pair Chromatography",
      "Alkylation & Acylation Reactions",
      "Pharmaceutical Synthesis",
    ],
    keywords: ["tbahs", "tetrabutylammonium hydrogen sulphate", "tetrabutylammonium bisulfate", "ion pair chromatography", "phase transfer catalyst", "ptc"],
    technicalNote:
      "General information: TBAHS is hygroscopic and forms acidic aqueous solutions (pH ~1-2). Stored in tightly sealed containers protected from atmospheric moisture. This provides general chemistry context.",
    seo: {
      title: "Tetrabutyl Ammonium Hydrogen Sulphate (TBAHS)",
      description:
        "Tetrabutyl ammonium hydrogen sulphate (TBAHS, CAS 32503-27-8) for phase transfer catalysis and HPLC ion-pairing. Ahmedabad, India — request a quote.",
    },
  },
  {
    slug: "tetrabutyl-ammonium-iodide",
    name: "Tetrabutyl Ammonium Iodide",
    category: "phase-transfer-catalysts",
    summary: "TBAI — quaternary ammonium iodide catalyst for enhanced nucleophilic substitutions and cross-coupling.",
    overview:
      "Tetrabutyl ammonium iodide (TBAI) is a quaternary ammonium phase transfer catalyst that combines the phase-shuttling capabilities of the tetrabutylammonium cation with the nucleophilic catalytic enhancement of the iodide anion. In substitution reactions, catalytic TBAI in situ generates reactive alkyl iodides from less reactive alkyl chlorides or bromides, dramatically speeding up reactions. Specification, purity and packaging confirmed against enquiry.",
    casNumber: "311-28-4",
    molecularFormula: "C16H36IN",
    molecularWeight: "369.37 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Crystalline powder",
    appearance: "White to light yellow crystalline powder",
    meltingPoint: "144–147 °C",
    synonyms: ["TBAI", "Tetrabutylammonium iodide", "Tetra-n-butylammonium iodide"],
    applications: [
      "Phase Transfer Catalysis",
      "Nucleophilic Substitution",
      "Etherification & Esterification",
      "Electrolyte & Analytical Reagent",
    ],
    keywords: ["tbai", "tetrabutylammonium iodide", "phase transfer catalyst", "quaternary ammonium", "nucleophilic substitution", "ptc"],
    technicalNote:
      "General information: TBAI is sensitive to light and moisture; prolonged exposure to air/light can cause discoloration due to trace iodine liberation. Stored in opaque, airtight containers. This is general chemistry context.",
    seo: {
      title: "Tetrabutyl Ammonium Iodide (TBAI) | CAS 311-28-4",
      description:
        "Tetrabutyl ammonium iodide (TBAI, CAS 311-28-4) for nucleophilic substitution and phase transfer catalysis. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "tetraethyl-ammonium-bromide",
    name: "Tetraethyl Ammonium Bromide",
    category: "phase-transfer-catalysts",
    summary: "TEAB — compact quaternary ammonium bromide catalyst for organic synthesis and electrochemical applications.",
    overview:
      "Tetraethyl ammonium bromide (TEAB) is a water-soluble quaternary ammonium salt used as a phase transfer catalyst in organic synthesis and as a source of tetraethylammonium ions in chemical and electrochemical processes. It facilitates biphasic halogenations, substitutions and condensations, and serves as a supporting electrolyte. Assay and packaging confirmed against each customer enquiry.",
    casNumber: "71-91-0",
    molecularFormula: "C8H20BrN",
    molecularWeight: "210.16 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Crystalline powder",
    appearance: "White to off-white crystalline powder",
    meltingPoint: "284–286 °C (dec.)",
    synonyms: ["TEAB", "Tetraethylammonium bromide", "Tetramethylene ammonium bromide"],
    applications: [
      "Phase Transfer Catalysis",
      "Organic Synthesis",
      "Electrolyte in Electrochemistry",
      "Pharmaceutical Intermediates",
    ],
    keywords: ["teab", "tetraethylammonium bromide", "quaternary ammonium", "phase transfer catalyst", "ptc"],
    technicalNote:
      "General information: TEAB is hygroscopic and decomposes at elevated temperatures near its melting point. Standard storage requires tightly closed containers in a dry, ventilated area. This note reflects general scientific literature.",
    seo: {
      title: "Tetraethyl Ammonium Bromide (TEAB) | CAS 71-91-0",
      description:
        "Tetraethyl ammonium bromide (TEAB, CAS 71-91-0) for phase transfer catalysis and electrochemical synthesis. Ahmedabad, India — request a quotation.",
    },
  },
  {
    slug: "tetraethyl-ammonium-tetrafluoroborate",
    name: "Tetraethyl Ammonium Tetrafluoro Borate",
    category: "phase-transfer-catalysts",
    summary: "TEABF4 — high-conductivity quaternary ammonium electrolyte salt for supercapacitors and electro-synthesis.",
    overview:
      "Tetraethyl ammonium tetrafluoroborate (TEABF4) is a quaternary ammonium salt renowned for its high electrochemical stability window, high ionic conductivity and wide temperature tolerance. It is the premier electrolyte salt in double-layer electric capacitors (supercapacitors), lithium-ion battery research, and electrochemical synthesis, as well as a phase transfer reagent and ionic material. Assay, water content and packing confirmed upon enquiry.",
    casNumber: "429-06-1",
    molecularFormula: "C8H20BF4N",
    molecularWeight: "217.06 g/mol",
    typicalGrade: "99%+",
    physicalForm: "Crystalline powder",
    appearance: "White crystalline powder",
    meltingPoint: "375–378 °C (dec.)",
    synonyms: ["TEABF4", "Tetraethylammonium tetrafluoroborate", "Tetraethylammonium fluoborate", "Tetraethyl ammonium tetrafluoro borate"],
    applications: [
      "Supercapacitor Electrolyte",
      "Electrochemical Synthesis",
      "Phase Transfer & Ionic Media",
      "Energy Storage Materials",
      "Organic Synthesis",
    ],
    keywords: ["teabf4", "tetraethylammonium tetrafluoroborate", "electrolyte", "supercapacitor", "phase transfer catalyst", "ptc"],
    technicalNote:
      "General information: TEABF4 for electrochemical applications is typically controlled for ultra-low moisture and trace halide content. Stored in tightly sealed containers under dry conditions. This provides general chemical context.",
    seo: {
      title: "Tetraethyl Ammonium Tetrafluoroborate (TEABF4)",
      description:
        "Tetraethyl ammonium tetrafluoroborate (TEABF4, CAS 429-06-1) for supercapacitors and electrochemical applications. Ahmedabad, India.",
    },
  },
]

/* ------------------------------------------------------------------------ */
/* Derived helpers                                                           */
/* ------------------------------------------------------------------------ */

export const categoriesBySlug = new Map(productCategories.map((c) => [c.slug, c]))

export function getCategory(slug: string): ProductCategory | undefined {
  return categoriesBySlug.get(slug as CategorySlug)
}

export function getProductsByCategory(slug: string): Product[] {
  return productsDatabase.filter((p) => p.category === slug)
}

export function getProduct(categorySlug: string, productSlug: string): Product | undefined {
  return productsDatabase.find((p) => p.category === categorySlug && p.slug === productSlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsDatabase.find((p) => p.slug === slug)
}

export function productHref(product: Product): string {
  return `/products/${product.category}/${product.slug}`
}

export function categoryHref(slug: CategorySlug | string): string {
  return `/products/${slug}`
}

export function categoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug
}

/** The product whose image stands for the category on tiles and cards. */
export function categoryCover(slug: string): Product | undefined {
  const cover = getCategory(slug)?.cover
  return (cover && getProductBySlug(cover)) || productsDatabase.find((p) => p.category === slug)
}

export function countByCategory(slug: string): number {
  return getProductsByCategory(slug).length
}

/** Related products: same category (and sub-group where present) first. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameGroup = productsDatabase.filter(
    (p) => p.slug !== product.slug && p.category === product.category && p.group === product.group,
  )
  const sameCategory = productsDatabase.filter(
    (p) => p.slug !== product.slug && p.category === product.category && !sameGroup.includes(p),
  )
  return [...sameGroup, ...sameCategory].slice(0, limit)
}

/** Maps a product to the visual treatment used by <ProductVisual />. */
export function visualFormFor(product: Product): VisualForm {
  if (product.visual) return product.visual
  if (product.category === "essential-oils") return "oil"
  if (product.category === "metals") return "metal"
  if (product.category === "ayurvedic-products") return product.group === "Powders" ? "powder" : "botanical"
  if (product.category === "pharma-intermediates") return "crystal"
  if (product.category === "phase-transfer-catalysts") return "crystal"

  const form = (product.physicalForm ?? "").toLowerCase()
  if (form.includes("crystal")) return "crystal"
  if (form.includes("powder")) return "powder"
  if (form.includes("liquid")) return "liquid"
  return "solid"
}

/* ------------------------------ Search ---------------------------------- */

/** Light synonym expansion so buyers find products by the term they know. */
const searchSynonyms: Record<string, string[]> = {
  wintergreen: ["methyl salicylate"],
  banana: ["isoamyl acetate"],
  jasmine: ["benzyl acetate"],
  mint: ["menthol", "peppermint"],
  clove: ["eugenol", "clove oil"],
  anise: ["anethole"],
  haldi: ["turmeric"],
  sonth: ["sunth", "ginger"],
  ginger: ["sunth"],
  haritaki: ["harad"],
  bibhitaki: ["baheda"],
  gokshura: ["gokhru"],
  vidanga: ["vavding"],
  na: ["sodium"],
  salt: ["sodium"],
  ppi: ["benzimidazole"],
  omeprazole: ["benzimidazole", "methoxybenzimidazole"],
  ptc: ["phase transfer catalyst"],
  quat: ["quaternary ammonium", "phosphonium"],
  teba: ["benzyl triethyl ammonium chloride"],
  tebac: ["benzyl triethyl ammonium chloride"],
  tbab: ["tetrabutyl ammonium bromide"],
  tbaf: ["tetrabutyl ammonium fluoride"],
  tbahs: ["tetrabutyl ammonium hydrogen sulphate"],
  tbai: ["tetrabutyl ammonium iodide"],
  teab: ["tetraethyl ammonium bromide"],
  teabf4: ["tetraethyl ammonium tetrafluoroborate"],
  etppb: ["ethyl triphenyl phosphonium bromide"],
  etppi: ["ethyl triphenyl phosphonium iodide"],
  mtppb: ["methyl triphenyl phosphonium bromide"],
  mmppc: ["methoxymethyl triphenyl phosphonium chloride"],
  wittig: ["phosphonium"],
}

function haystack(product: Product): string {
  return [
    product.name,
    product.slug.replace(/-/g, " "),
    categoryName(product.category),
    product.group ?? "",
    product.summary,
    product.overview ?? "",
    product.casNumber ?? "",
    product.molecularFormula ?? "",
    product.physicalForm ?? "",
    product.typicalGrade ?? "",
    ...(product.synonyms ?? []),
    ...product.applications,
    ...product.keywords,
  ]
    .join(" ")
    .toLowerCase()
}

export function searchProducts(query: string, category?: string): Product[] {
  const pool = category ? getProductsByCategory(category) : productsDatabase
  const term = query.trim().toLowerCase()
  if (!term) return pool

  const terms = new Set<string>([term])
  for (const word of term.split(/\s+/)) {
    for (const expansion of searchSynonyms[word] ?? []) terms.add(expansion)
  }

  const scored = pool
    .map((product) => {
      const hay = haystack(product)
      const name = product.name.toLowerCase()
      let score = 0
      for (const t of terms) {
        if (!hay.includes(t)) continue
        if (name === t) score += 100
        else if (name.startsWith(t)) score += 50
        else if (name.includes(t)) score += 30
        else score += 8
      }
      return { product, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))

  return scored.map((r) => r.product)
}

/* ------------------------------ SEO copy -------------------------------- */

/**
 * Kept short enough that the brand suffix added by the layout template still
 * fits inside a search result. The CAS number is only worth the characters
 * when the product name itself is short.
 */
export function productSeoTitle(product: Product): string {
  if (product.seo?.title) return product.seo.title
  if (product.casNumber && product.name.length <= 22) {
    return `${product.name} Supplier | CAS ${product.casNumber}`
  }
  return `${product.name} Supplier & Exporter`
}

/** Kept at or under 158 characters so search results are not truncated. */
export function productSeoDescription(product: Product): string {
  if (product.seo?.description) return product.seo.description

  const identity = product.casNumber ? ` (CAS ${product.casNumber})` : ""
  const tail = "Ahmedabad, India — request a quotation."
  const head = `${product.name}${identity} supplied for `

  for (const count of [3, 2, 1]) {
    const uses = product.applications.slice(0, count).join(", ").toLowerCase()
    const candidate = `${head}${uses}. ${tail}`
    if (candidate.length <= 158) return candidate
  }

  return `${product.name}${identity} supplied by Sheetal Aromatics. ${tail}`
}
