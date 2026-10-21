/**
 * Buyer guides — practical articles for procurement and technical buyers.
 *
 * Content is general, published chemistry and trade practice. Guides do not
 * state regulatory limits, prices or lead times, and make no claims about
 * Sheetal Aromatics beyond the verified facts in lib/site-config.ts.
 */

export interface GuideSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface Guide {
  slug: string
  title: string
  /** Meta description and card summary (≤ 158 characters). */
  description: string
  seoTitle: string
  datePublished: string
  dateModified: string
  readingMinutes: number
  sections: GuideSection[]
  /** Product slugs linked at the end of the guide. */
  relatedProducts: string[]
  /** Industry slugs linked at the end of the guide. */
  relatedIndustries: string[]
}

export const guides: Guide[] = [
  {
    slug: "chemical-quotation-checklist",
    title: "How to request a chemical quotation: the checklist procurement teams use",
    seoTitle: "Chemical Quotation Checklist for B2B Buyers",
    description:
      "The eight details that turn a chemical enquiry into an accurate quotation first time — product identity, grade, quantity, packing, documents, destination.",
    datePublished: "2026-10-21",
    dateModified: "2026-10-21",
    readingMinutes: 5,
    sections: [
      {
        heading: "Why most enquiries need a second round",
        paragraphs: [
          "A message that says only \"please quote benzyl alcohol\" can be answered with a price, but rarely with the right price. Grade, pack size, destination and documentation each change what is quoted. Supplying the details below in the first message usually saves a full round of questions and gets you a firm, comparable quotation.",
        ],
      },
      {
        heading: "1. Identify the product unambiguously",
        paragraphs: [
          "Give the product name you use and, wherever possible, its CAS number. Trade names vary between countries and suppliers — Yara Yara and 2-methoxynaphthalene are the same material, while \"nerolin\" can mean two different ethers. A CAS number removes that ambiguity. For botanicals, give the botanical name and the plant part.",
        ],
      },
      {
        heading: "2. State the grade and specification you work to",
        paragraphs: [
          "Say whether you need technical, food, cosmetic or pharmaceutical grade, and attach your specification sheet if you have one. If you work to a pharmacopoeia (IP, BP, USP or EP) or a food standard, name it. The items that most often change a quotation are:",
        ],
        list: [
          "Assay or purity, and how it is measured",
          "Impurity, moisture and heavy-metal limits",
          "For essential oils, the key constituent range",
          "For powders, mesh size and bulk density",
        ],
      },
      {
        heading: "3. Quantity — trial and regular",
        paragraphs: [
          "Give both the first-order quantity and the expected regular volume, even if approximate. A 25 kg trial and a 5-tonne monthly requirement are quoted very differently, and knowing both lets a supplier quote the trial with the regular business in mind.",
        ],
      },
      {
        heading: "4. Packing and labelling",
        paragraphs: [
          "State the pack you want — bags, fibre drums, HDPE or MS drums, or IBCs — and any labelling or palletisation requirements. For hazardous materials, packing must also meet the transport regulations for the mode of shipment.",
        ],
      },
      {
        heading: "5. Documents your quality team needs",
        paragraphs: [
          "List the documents required with the shipment so they can be prepared in advance. Typical requests include a certificate of analysis (COA), a safety data sheet (SDS/MSDS), a method of analysis and, for exports, a certificate of origin. Ask early for anything specific to your market.",
        ],
      },
      {
        heading: "6. Destination and delivery terms",
        paragraphs: [
          "Give the delivery city or port, and your preferred Incoterms if you have them — for example EXW Ahmedabad, FOB an Indian port, or CIF your port. Destination also determines whether a material can be shipped by air or must go by sea.",
        ],
      },
      {
        heading: "7. Intended application",
        paragraphs: [
          "A one-line description of the end use helps the supplier confirm the grade is suitable and flag handling or regulatory constraints before an order is placed, rather than after.",
        ],
      },
      {
        heading: "8. A contact who can answer technical questions",
        paragraphs: [
          "Include a phone or WhatsApp number for someone who can answer questions about the specification. A two-minute call often resolves what would otherwise take several emails.",
        ],
      },
    ],
    relatedProducts: ["benzyl-alcohol", "sodium-benzoate", "menthol", "benzyl-triethyl-ammonium-chloride"],
    relatedIndustries: ["pharmaceutical", "food-and-beverage", "fragrance-and-flavour"],
  },
  {
    slug: "phase-transfer-catalysts-selection-guide",
    title: "Phase transfer catalysts: choosing between TEBAC, TBAB and phosphonium salts",
    seoTitle: "Choosing a Phase Transfer Catalyst: TEBAC vs TBAB",
    description:
      "How quaternary ammonium and phosphonium phase transfer catalysts work, and how lipophilicity, counter-ion and stability guide the choice for a reaction.",
    datePublished: "2026-10-21",
    dateModified: "2026-10-21",
    readingMinutes: 6,
    sections: [
      {
        heading: "What a phase transfer catalyst does",
        paragraphs: [
          "Many useful reactions combine an organic substrate, dissolved in an organic solvent, with an inorganic reagent — hydroxide, cyanide, a halide or a carboxylate — that only dissolves in water or exists as a solid. Without help, the two barely meet. A phase transfer catalyst (PTC) is a salt with a bulky, organic-soluble cation, typically a quaternary ammonium or phosphonium ion. It pairs with the reactive anion and carries it into the organic phase, where the reaction proceeds, then returns to collect more.",
          "The result is faster reactions under milder conditions, often with cheap inorganic bases in place of expensive anhydrous reagents and solvents. PTC chemistry is used widely for alkylation of active methylene compounds, O- and N-alkylation, nucleophilic substitution, dichlorocarbene reactions and oxidations.",
        ],
      },
      {
        heading: "Lipophilicity: the first selection criterion",
        paragraphs: [
          "The cation must be organic-soluble enough to carry the anion into the organic phase, but not so lipophilic that it stays there. A useful rule of thumb is the total number of carbon atoms on the cation:",
        ],
        list: [
          "Benzyl triethyl ammonium chloride (TEBAC, 13 carbons) — relatively hydrophilic; the classic catalyst for reactions with concentrated aqueous sodium hydroxide, including dichlorocarbene chemistry.",
          "Tetrabutyl ammonium bromide (TBAB, 16 carbons) — a balanced, general-purpose choice and one of the most widely used PTCs.",
          "Benzyl tributyl ammonium chloride (19 carbons) — more lipophilic, useful when the anion is hard to extract or the organic phase is non-polar.",
        ],
      },
      {
        heading: "The counter-ion matters",
        paragraphs: [
          "The catalyst's own anion competes with the anion you want to transfer. Chloride and bromide salts are the usual starting point. Hydrogen sulphate salts such as tetrabutyl ammonium hydrogen sulphate (TBAHS) are chosen when a halide would interfere, and are also used in ion-pair extraction. Iodide salts such as tetrabutyl ammonium iodide can act as a co-catalyst, converting a sluggish alkyl chloride into a more reactive iodide in situ.",
          "Some quaternary salts are bought for the anion itself rather than as catalysts: tetrabutyl ammonium fluoride (TBAF) is a soluble fluoride source, best known for removing silyl protecting groups, and tetraethyl ammonium tetrafluoroborate (TEABF4) is used as an electrolyte.",
        ],
      },
      {
        heading: "Ammonium or phosphonium?",
        paragraphs: [
          "Quaternary phosphonium salts are generally more thermally stable than their ammonium counterparts, which can degrade at high temperature in strongly basic media. Phosphonium salts, however, are less tolerant of strong base. In practice, ammonium salts are the default for most base-mediated PTC work, while phosphonium salts are chosen for higher-temperature reactions under neutral or mildly basic conditions.",
          "Triphenyl phosphonium salts also have a second, separate role: benzyl, butyl, ethyl and methyl triphenyl phosphonium halides are the precursors to the ylides used in Wittig olefination, and some, such as benzyl triphenyl phosphonium chloride, are used as curing accelerators for fluoroelastomers.",
        ],
      },
      {
        heading: "What to specify when you buy",
        paragraphs: [
          "Quaternary salts are often hygroscopic, and water or halide content can affect sensitive reactions. When requesting a quotation, state:",
        ],
        list: [
          "Assay, and the method used to measure it",
          "Moisture limit (and whether an anhydrous grade or an aqueous solution is wanted)",
          "Halide or other anion limits, for non-halide salts",
          "Pack size and storage requirements",
        ],
      },
    ],
    relatedProducts: [
      "benzyl-triethyl-ammonium-chloride",
      "tetrabutyl-ammonium-bromide",
      "benzyl-tributyl-ammonium-chloride",
      "tetrabutyl-ammonium-hydrogen-sulphate",
      "benzyl-triphenyl-phosphonium-chloride",
      "tetrabutyl-ammonium-iodide",
    ],
    relatedIndustries: ["chemical-synthesis", "pharmaceutical"],
  },
  {
    slug: "food-preservatives-guide",
    title: "Sodium benzoate, potassium sorbate or calcium propionate? Choosing a food preservative",
    seoTitle: "Benzoate vs Sorbate vs Propionate Preservatives",
    description:
      "How the three most common food preservatives differ — the pH range each works in, which foods they suit, and what to specify when buying.",
    datePublished: "2026-10-21",
    dateModified: "2026-10-21",
    readingMinutes: 5,
    sections: [
      {
        heading: "Why pH decides most of the choice",
        paragraphs: [
          "Sodium benzoate, potassium sorbate and calcium propionate are all salts of weak organic acids. In each case it is mainly the undissociated acid that inhibits microbes, and the proportion of undissociated acid rises as pH falls. So each preservative has a pH range in which it works well, and outside that range a much higher dose achieves much less.",
        ],
      },
      {
        heading: "Sodium benzoate (E211)",
        paragraphs: [
          "Benzoic acid has a pKa of about 4.2, so sodium benzoate is most effective in clearly acidic products — roughly pH 4.5 and below. That makes it a standard choice for carbonated soft drinks, fruit juices, sauces, pickles, chutneys and syrups, as well as liquid pharmaceutical and personal-care products.",
          "In beverages that also contain ascorbic acid (vitamin C), formulators should be aware that benzoate and ascorbate can form trace benzene under heat and light; formulation and storage are managed to prevent this.",
        ],
      },
      {
        heading: "Potassium sorbate (E202)",
        paragraphs: [
          "Sorbic acid has a pKa of about 4.8, so sorbates stay useful up to around pH 6.5 — a wider range than benzoate. Potassium sorbate is effective against moulds and yeasts and is common in cheese, dairy desserts, chemically leavened bakery products, dried fruit, wine and cosmetics. Because it also inhibits yeast, it is generally not added to yeast-raised dough.",
          "Benzoate and sorbate are frequently used together in beverages to cover a broader spectrum of spoilage organisms.",
        ],
      },
      {
        heading: "Calcium propionate (E282)",
        paragraphs: [
          "Calcium propionate inhibits moulds and the bacteria responsible for \"rope\" in bread, while having little effect on baker's yeast. That is why it is the standard preservative for bread and other yeast-raised bakery products. It is also used in some processed foods and in animal feed.",
        ],
      },
      {
        heading: "Where sorbitol fits",
        paragraphs: [
          "Sorbitol (E420) is not a preservative but is often bought alongside them. As a humectant it binds water and keeps products soft and moist; sorbitol 70% solution is widely used in toothpaste, confectionery and pharmaceutical syrups.",
        ],
      },
      {
        heading: "Regulation and what to specify",
        paragraphs: [
          "Which preservatives are permitted, in which foods and at what level, is set by the regulations of the market where the product is sold — for example FSSAI in India, Codex for many export markets, or the EU additives regulation. Always check the current rules for your product category. When buying, state:",
        ],
        list: [
          "Food, pharma or technical grade, and the standard you work to",
          "Physical form — powder, granules or, for sorbitol, crystallising or non-crystallising solution",
          "Documents required with each lot (COA, SDS)",
          "Regular volume and preferred pack size",
        ],
      },
    ],
    relatedProducts: ["sodium-benzoate", "potassium-sorbate", "calcium-propionate", "sorbitol-70-solution"],
    relatedIndustries: ["food-and-beverage", "cosmetics-and-personal-care", "pharmaceutical"],
  },
  {
    slug: "importing-chemicals-from-india",
    title: "Importing chemicals from India: documents, packing and shipping checklist",
    seoTitle: "Importing Chemicals from India: Export Checklist",
    description:
      "Checklist for overseas buyers importing chemicals, essential oils and botanicals from India: documents, dangerous goods, packing, ports and Incoterms.",
    datePublished: "2026-10-21",
    dateModified: "2026-10-21",
    readingMinutes: 6,
    sections: [
      {
        heading: "Start with the product and its classification",
        paragraphs: [
          "Two classifications drive almost everything else in an export shipment. The HS code determines the customs duty and any import licensing in your country. The transport classification determines whether the material is a dangerous good — and if it is, its UN number, hazard class and packing group decide how it may be packed and whether it can travel by air at all. Agree both with your supplier before the order is confirmed.",
        ],
      },
      {
        heading: "The standard document set",
        paragraphs: ["Most chemical shipments from India travel with:"],
        list: [
          "Commercial invoice and packing list",
          "Bill of lading (sea) or air waybill (air)",
          "Certificate of analysis (COA) for each batch",
          "Safety data sheet (SDS/MSDS) in the 16-section GHS format",
          "Certificate of origin — a preferential one where a trade agreement applies",
          "For dangerous goods, a dangerous goods declaration (IMDG for sea, IATA for air)",
        ],
      },
      {
        heading: "Ask early for anything market-specific",
        paragraphs: [
          "Many destinations add their own requirements: chemical inventory registration, pre-shipment inspection, phytosanitary certificates for botanicals, or specific label languages. Your customs broker is the best source for these. Raise them in the first enquiry so documents can be prepared with the goods rather than after shipment.",
        ],
      },
      {
        heading: "Packing that survives the journey",
        paragraphs: [
          "Export packing must hold up to weeks at sea, container heat and repeated handling. Liquids typically travel in HDPE or MS drums or IBCs, powders in lined bags or fibre drums, all palletised and stretch-wrapped. Hazardous materials must be in UN-certified packaging marked for their class. Hygroscopic and air-sensitive materials need moisture-proof inner packing — state this with the order.",
        ],
      },
      {
        heading: "Ports and Incoterms",
        paragraphs: [
          "Shipments from Gujarat usually leave through Mundra, Kandla (Deendayal) or Hazira, or through Nhava Sheva (JNPT) near Mumbai. Incoterms define where the supplier's responsibility ends: EXW at the supplier's premises, FOB once loaded at the Indian port, or CFR/CIF to your port. Agree the Incoterm and named place in the quotation — it changes both the price and who arranges freight and insurance.",
        ],
      },
      {
        heading: "Samples, then a trial lot",
        paragraphs: [
          "For a new supplier or a new grade, the usual sequence is a sample for laboratory approval, then a trial lot, then regular orders. Approve the sample against your specification and keep it as a reference for later lots.",
        ],
      },
    ],
    relatedProducts: ["lemongrass-oil", "menthol", "ashwagandha-powder", "benzyl-acetate"],
    relatedIndustries: ["fragrance-and-flavour", "ayurveda-and-nutraceuticals", "chemical-synthesis"],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}
