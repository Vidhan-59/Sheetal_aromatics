/**
 * Buyer guides — practical articles for procurement and technical buyers.
 *
 * Content is general, published chemistry and trade practice. Guides do not
 * state regulatory limits, prices or lead times, and make no claims about
 * Sheetal Aromatics beyond the verified facts in lib/site-config.ts.
 */

import type { CategorySlug, Product } from "@/lib/products-data"

export interface GuideTable {
  caption: string
  columns: string[]
  rows: string[][]
}

export interface GuideSection {
  heading: string
  paragraphs: string[]
  list?: string[]
  /** Comparison or reference table shown after the paragraphs and list. */
  table?: GuideTable
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
  /** Who the guide is written for, shown under the title. */
  audience?: string
  /** Product categories whose pages link to this guide. */
  relatedCategories?: CategorySlug[]
  /** True for buyer guides relevant to every product (quotation, export). */
  appliesToAllProducts?: boolean
  /** Primary sources the guide relies on (regulators, standards bodies). */
  sources?: { label: string; href: string }[]
  /** Short questions and answers at the end of the guide (also FAQPage schema). */
  faqs?: { question: string; answer: string }[]
}

export const guides: Guide[] = [
  {
    slug: "chemical-quotation-checklist",
    title: "How to request a chemical quotation: the checklist procurement teams use",
    seoTitle: "Chemical Quotation Checklist for B2B Buyers",
    description:
      "The eight details that turn a chemical enquiry into an accurate quotation first time — product identity, grade, quantity, packing, documents, destination.",
    datePublished: "2026-10-21",
    dateModified: "2026-11-14",
    readingMinutes: 6,
    audience:
      "Procurement, purchasing and quality teams requesting quotations for chemicals, essential oils or botanicals from any supplier, in India or abroad.",
    sections: [
      {
        heading: "Why most enquiries need a second round",
        paragraphs: [
          "A message that says only \"please quote benzyl alcohol\" can be answered with a price, but rarely with the right price. Grade, pack size, destination and documentation each change what is quoted. Supplying the details below in the first message usually saves a full round of questions and gets you a firm, comparable quotation.",
        ],
      },
      {
        heading: "The checklist at a glance",
        paragraphs: [
          "The table summarises what to include. Each point is explained in the sections that follow.",
        ],
        table: {
          caption: "What to include in a chemical enquiry",
          columns: ["Field", "What to state", "Why it matters"],
          rows: [
            [
              "Product identity",
              "The name you use and the CAS number; for botanicals, the botanical name and plant part",
              "Trade names vary between countries and suppliers; a CAS number removes the ambiguity",
            ],
            [
              "Grade and specification",
              "Technical, food, cosmetic or pharmaceutical grade; the pharmacopoeia or standard; your specification sheet",
              "Assay, impurity and moisture limits change which material is offered and how it is priced",
            ],
            [
              "Quantity",
              "First-order quantity and expected regular volume",
              "Lets the supplier quote the trial with the regular business in mind",
            ],
            [
              "Packing and labelling",
              "Pack type and size, labelling and palletisation; UN-approved packaging if hazardous",
              "Packing affects cost, shelf life and whether the goods can be shipped by a given mode",
            ],
            [
              "Documents",
              "COA, SDS, method of analysis, certificate of origin and any market-specific papers",
              "Documents prepared with the goods avoid delays at dispatch and at customs",
            ],
            [
              "Destination and Incoterm",
              "Delivery city or port, and the Incoterms rule with its named place",
              "Decides who pays freight and insurance, and whether air freight is possible",
            ],
            [
              "Application",
              "One line on the end use",
              "Lets the supplier confirm the grade is suitable and flag handling or regulatory constraints",
            ],
            [
              "Technical contact",
              "Name and phone or WhatsApp number of someone who knows the specification",
              "A short call settles questions that would otherwise take several emails",
            ],
            [
              "Payment and timing",
              "Your preferred payment term and when you need the goods",
              "Avoids a quotation built on terms you cannot accept",
            ],
          ],
        },
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
      {
        heading: "An example enquiry",
        paragraphs: [
          "An enquiry with every field filled in can still be short. The figures below are illustrative only:",
        ],
        list: [
          "Product: benzyl alcohol, CAS 100-51-6",
          "Grade: pharmaceutical, to BP; our specification attached",
          "Quantity: 200 kg trial, then about 2 tonnes a month if approved",
          "Packing: HDPE drums, palletised, labels in English",
          "Documents: COA and SDS with each lot; certificate of origin",
          "Delivery: CIF Jebel Ali, UAE",
          "Application: solvent in a pharmaceutical formulation",
          "Contact: name, role and WhatsApp number",
        ],
      },
      {
        heading: "What a complete quotation should state",
        paragraphs: [
          "Check the reply as carefully as you wrote the enquiry. A quotation you can act on states:",
        ],
        list: [
          "The product, its CAS number and the grade or specification quoted against",
          "Price per unit, the unit basis (for example per kg net) and the currency",
          "The Incoterms rule and named place",
          "Pack type and pack size",
          "Payment terms",
          "How long the offer is valid",
          "The documents supplied with each lot",
          "The supplier's stated dispatch timing",
        ],
      },
      {
        heading: "Comparing quotations like for like",
        paragraphs: [
          "Quotations from different suppliers are rarely on the same basis. Before comparing prices, bring each one to the same Incoterm and named place, the same currency and the same unit. An EXW price and a CIF price for the same material are not comparable until freight, insurance and export clearance are added to the first.",
          "Then check the specification behind each price. Assay can be stated \"as is\" or on a dried basis, and a 99% grade is a different product from a 98% one. Confirm whether packing, palletisation, the COA, the SDS and a certificate of origin are included or charged separately, and note each offer's validity period. A lower price for a different grade or delivery term is not a saving.",
        ],
      },
    ],
    relatedProducts: ["benzyl-alcohol", "sodium-benzoate", "menthol", "benzyl-triethyl-ammonium-chloride"],
    relatedIndustries: ["pharmaceutical", "food-and-beverage", "fragrance-and-flavour"],
    appliesToAllProducts: true,
    sources: [
      { label: "CAS (Chemical Abstracts Service) — CAS Registry Numbers", href: "https://www.cas.org" },
      { label: "PubChem, US National Library of Medicine — chemical identifiers", href: "https://pubchem.ncbi.nlm.nih.gov" },
      { label: "International Chamber of Commerce — Incoterms 2020 rules", href: "https://iccwbo.org/business-solutions/incoterms-rules/" },
      { label: "UNECE — Globally Harmonized System (GHS), including the safety data sheet format", href: "https://unece.org" },
    ],
    faqs: [
      {
        question: "Why should a chemical enquiry include the CAS number?",
        answer:
          "Trade names differ between countries and suppliers, and some names cover more than one substance. A CAS Registry Number identifies a single substance, so including it ensures the supplier quotes the material you actually need. For mixtures and natural products, also give the botanical name, plant part or composition, because one CAS number may not describe them fully.",
      },
      {
        question: "How do I compare chemical quotations from different suppliers?",
        answer:
          "Bring every offer to the same basis before comparing prices: the same Incoterm and named place, currency, unit and specification. Check whether assay is stated on the same basis, whether packing, palletisation and documents are included, and how long each offer is valid. A lower price for a different grade or delivery term is not a like-for-like saving.",
      },
      {
        question: "What documents should I ask for with a chemical quotation?",
        answer:
          "Ask for a recent certificate of analysis and the safety data sheet with the quotation, so your quality team can review the material before ordering. For regular supply, confirm what accompanies each lot, usually a batch certificate of analysis, and for exports whether a certificate of origin is provided. Name any market-specific documents in the first enquiry.",
      },
      {
        question: "Should I ask for a sample before placing a chemical order?",
        answer:
          "For a new supplier or a new grade, yes. Test the sample against your specification, ideally alongside the supplier's certificate of analysis, and keep part of it as a reference for later deliveries. Ask whether it comes from a production batch. Samples of hazardous materials travel as dangerous goods, so allow for special courier arrangements and documents.",
      },
    ],
  },
  {
    slug: "phase-transfer-catalysts-selection-guide",
    title: "Phase transfer catalysts: choosing between TEBAC, TBAB and phosphonium salts",
    seoTitle: "Choosing a Phase Transfer Catalyst: TEBAC vs TBAB",
    description:
      "How quaternary ammonium and phosphonium phase transfer catalysts work, and how lipophilicity, counter-ion and stability guide the choice for a reaction.",
    datePublished: "2026-10-21",
    dateModified: "2026-11-14",
    readingMinutes: 7,
    audience:
      "Process chemists, R&D teams and buyers selecting or sourcing quaternary ammonium and phosphonium salts for synthesis.",
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
        heading: "Common catalysts compared",
        paragraphs: [
          "The table summarises where each common salt is usually considered. It is a starting point for screening, not a prediction: the best catalyst for a given reaction is normally confirmed by trial.",
        ],
        table: {
          caption: "Quaternary ammonium and phosphonium salts used in phase transfer catalysis",
          columns: ["Catalyst", "Type", "Typical uses", "Notes"],
          rows: [
            [
              "TEBAC / BTEAC — benzyl triethyl ammonium chloride (CAS 56-37-1)",
              "Quaternary ammonium chloride",
              "Reactions with concentrated aqueous sodium hydroxide: dichlorocarbene additions and C-alkylation of active methylene compounds such as phenylacetonitrile",
              "13 carbons, relatively hydrophilic; hygroscopic solid",
            ],
            [
              "Benzyl tributyl ammonium chloride (CAS 23616-79-7)",
              "Quaternary ammonium chloride",
              "Alkylation and substitution where the anion is hard to extract or the solvent is non-polar",
              "19 carbons, more lipophilic than TEBAC",
            ],
            [
              "TBAB — tetrabutyl ammonium bromide (CAS 1643-19-2)",
              "Quaternary ammonium bromide",
              "General-purpose PTC: O-, N- and C-alkylation, nucleophilic substitution, esterification and oxidations",
              "16 carbons, balanced lipophilicity; can degrade to tributylamine in hot, concentrated alkali",
            ],
            [
              "TBAHS — tetrabutyl ammonium hydrogen sulphate (CAS 32503-27-8)",
              "Quaternary ammonium hydrogen sulphate",
              "Reactions where a halide would interfere; ion-pair extraction; ion-pair reagent in HPLC",
              "Consumes one equivalent of base; the sulphate formed stays in the water phase and barely competes with the reacting anion",
            ],
            [
              "TBAI — tetrabutyl ammonium iodide (CAS 311-28-4)",
              "Quaternary ammonium iodide",
              "Co-catalyst for alkylations with alkyl chlorides, which it converts to more reactive iodides in situ",
              "Iodide is lipophilic and can slow the transfer of other anions; may discolour on exposure to light and air",
            ],
            [
              "Tetraalkyl phosphonium salts, such as tetrabutyl phosphonium bromide",
              "Quaternary phosphonium halide",
              "Higher-temperature substitution reactions under neutral or mildly basic conditions",
              "More thermally stable than ammonium analogues, but decompose in strong base",
            ],
            [
              "Triphenyl phosphonium salts — benzyl, butyl, ethyl and methyl triphenyl phosphonium halides",
              "Quaternary phosphonium halide",
              "Wittig ylide precursors; benzyl triphenyl phosphonium chloride as a fluoroelastomer curing accelerator; ethyl triphenyl phosphonium salts in epoxy resin curing",
              "Usually bought as reagents rather than as phase transfer catalysts",
            ],
          ],
        },
      },
      {
        heading: "Liquid–liquid or solid–liquid?",
        paragraphs: [
          "In liquid–liquid PTC the inorganic reagent is dissolved in water, often as a concentrated solution such as 50% sodium hydroxide, and the catalyst shuttles anions across the interface. In solid–liquid PTC the reagent is a finely ground solid — potassium carbonate, potassium hydroxide or a salt such as potassium acetate — suspended in the organic solvent, and the catalyst draws anions from the solid surface.",
          "Solid–liquid conditions keep water out of the organic phase, which helps when the substrate or product hydrolyses easily, and the transferred anion carries less water with it, which can make it more reactive. Liquid–liquid systems are simpler to handle and separate at scale. Crown ethers and polyethylene glycols can also act as phase transfer agents, particularly in solid–liquid systems, but quaternary salts remain the usual industrial choice.",
        ],
      },
      {
        heading: "Practical points for scale-up",
        paragraphs: [
          "Several factors that are minor in the laboratory matter in the plant:",
        ],
        list: [
          "Agitation — many PTC reactions are limited by transfer across the interface, so stirring speed and reactor geometry can change the reaction rate. Keep agitation consistent when scaling up.",
          "Catalyst degradation — in hot, concentrated alkali, quaternary ammonium salts can undergo Hofmann elimination; tetrabutyl ammonium salts give tributylamine and butene. The amine can appear in the product as an impurity or an odour.",
          "Catalyst poisoning — highly lipophilic anions such as iodide or tosylate tend to stay paired with the catalyst and slow the transfer of the anion you need. This is why chloride or bromide is usually preferred unless iodide is wanted as a co-catalyst.",
          "Removal from the product — most quaternary salts partition into water and are removed by aqueous washes; more lipophilic catalysts may need extra washes. In pharmaceutical synthesis, residual catalyst and its breakdown products are controlled like any other process impurity.",
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
      "ethyl-triphenyl-phosphonium-bromide",
      "methyl-triphenyl-phosphonium-bromide",
    ],
    relatedIndustries: ["chemical-synthesis", "pharmaceutical"],
    relatedCategories: ["phase-transfer-catalysts"],
    sources: [
      { label: "PubChem, US National Library of Medicine — compound records", href: "https://pubchem.ncbi.nlm.nih.gov" },
      { label: "IUPAC Compendium of Chemical Terminology (Gold Book)", href: "https://goldbook.iupac.org" },
      { label: "European Chemicals Agency (ECHA) — registered substance information", href: "https://echa.europa.eu" },
    ],
    faqs: [
      {
        question: "What is the difference between TEBAC and TBAB?",
        answer:
          "Both are quaternary ammonium phase transfer catalysts. TEBAC (benzyl triethyl ammonium chloride) has 13 carbon atoms and is relatively hydrophilic, which suits reactions with concentrated aqueous sodium hydroxide such as dichlorocarbene chemistry. TBAB (tetrabutyl ammonium bromide) has 16 carbons, is more lipophilic and is a general-purpose choice for alkylation and substitution. For a new reaction, trial both.",
      },
      {
        question: "Why use TBAHS instead of TBAB as a phase transfer catalyst?",
        answer:
          "Tetrabutyl ammonium hydrogen sulphate is chosen when bromide would interfere with the reaction or contaminate the product. Under basic conditions its hydrogen sulphate anion is neutralised to sulphate, which stays in the aqueous phase and hardly competes with the anion being transferred. It consumes one equivalent of base. TBAHS is also used as an ion-pair reagent in extraction and HPLC.",
      },
      {
        question: "Are phosphonium salts better phase transfer catalysts than ammonium salts?",
        answer:
          "Not in general. Quaternary phosphonium salts tolerate higher temperatures, so they suit hot reactions under neutral or mildly basic conditions. Quaternary ammonium salts are less thermally stable but cope better with strong base, and they are more widely used, so they remain the default for most base-mediated phase transfer reactions. The reaction conditions decide which family fits.",
      },
      {
        question: "Does water content matter when buying a phase transfer catalyst?",
        answer:
          "It can. Many quaternary ammonium and phosphonium salts are hygroscopic, and the water they absorb lowers the assay and can affect water-sensitive or solid–liquid reactions. State a moisture limit in your specification, say whether an anhydrous grade or an aqueous solution is wanted, and keep opened containers tightly closed in a dry place.",
      },
    ],
  },
  {
    slug: "food-preservatives-guide",
    title: "Sodium benzoate, potassium sorbate or calcium propionate? Choosing a food preservative",
    seoTitle: "Benzoate vs Sorbate vs Propionate Preservatives",
    description:
      "How the three most common food preservatives differ — the pH range each works in, which foods they suit, and what to specify when buying.",
    datePublished: "2026-10-21",
    dateModified: "2026-11-14",
    readingMinutes: 6,
    audience:
      "Food, beverage, personal-care and pharmaceutical formulators and buyers choosing between weak-acid preservatives.",
    sections: [
      {
        heading: "Why pH decides most of the choice",
        paragraphs: [
          "Sodium benzoate, potassium sorbate and calcium propionate are all salts of weak organic acids. In each case it is mainly the undissociated acid that inhibits microbes, and the proportion of undissociated acid rises as pH falls. So each preservative has a pH range in which it works well, and outside that range a much higher dose achieves much less.",
        ],
      },
      {
        heading: "The three compared",
        paragraphs: [
          "The pKa values below are standard reference figures for the parent acids. At a pH equal to the pKa, half the acid is undissociated; one pH unit above it, only about a tenth is.",
        ],
        table: {
          caption: "Sodium benzoate, potassium sorbate and calcium propionate at a glance",
          columns: ["Preservative", "E number", "Active form / effective pH range", "Typical applications"],
          rows: [
            [
              "Sodium benzoate",
              "E211",
              "Undissociated benzoic acid (pKa about 4.2); most effective in clearly acidic products, roughly pH 4.5 and below",
              "Carbonated soft drinks, fruit juices, sauces, pickles, chutneys and syrups; liquid pharmaceutical and personal-care products",
            ],
            [
              "Potassium sorbate",
              "E202",
              "Undissociated sorbic acid (pKa about 4.8); remains useful over a wider range, up to around pH 6.5",
              "Cheese, dairy desserts, chemically leavened bakery products, dried fruit, wine, beverages and cosmetics",
            ],
            [
              "Calcium propionate",
              "E282",
              "Undissociated propionic acid (pKa about 4.9); effective in mildly acidic foods such as bread, with little effect on baker's yeast",
              "Bread and other yeast-raised bakery products, some processed foods, animal feed",
            ],
          ],
        },
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
          "Sodium propionate (E281) is the usual alternative in chemically leavened products such as cakes, because calcium ions can interfere with the action of chemical raising agents.",
        ],
      },
      {
        heading: "Acid or salt?",
        paragraphs: [
          "Each preservative is also available as the free acid: benzoic acid (E210), sorbic acid (E200) and propionic acid (E280). The salts are usually preferred because they dissolve far more readily in water, which makes them easier to dose and to disperse evenly. Once in an acidic product, salt and acid reach the same equilibrium, so the choice is mainly about handling and solubility rather than activity.",
          "When comparing doses, allow for the fact that a kilogram of the salt contains less of the active acid than a kilogram of the free acid, because part of its weight is sodium, potassium or calcium.",
        ],
      },
      {
        heading: "Preservatives are one hurdle among several",
        paragraphs: [
          "Weak-acid preservatives slow the growth of spoilage organisms; they do not sterilise a product or make up for poor hygiene. They work best as one of several barriers — low pH, reduced water activity, heat treatment, clean filling and suitable packaging — that together keep a product stable for its intended shelf life.",
          "A product with a heavy initial microbial load can spoil even with a preservative present, and some spoilage yeasts, such as Zygosaccharomyces bailii, are notably tolerant of weak acids. Shelf-life and challenge testing on the finished product show whether a formulation is adequately protected.",
        ],
      },
      {
        heading: "Formulation points",
        paragraphs: ["A few handling details prevent common problems:"],
        list: [
          "Dissolve sodium benzoate in water before acidulants are added. Benzoic acid is much less soluble than its sodium salt and can precipitate from concentrated acidic syrups.",
          "In wine, sorbate is usually used together with sulphur dioxide, because lactic acid bacteria can convert sorbic acid into a compound with a geranium-like off-odour.",
          "Sorbates can be applied to surfaces — as a dip or spray on cheese or baked goods — as well as mixed into the product.",
        ],
      },
      {
        heading: "Where sorbitol fits",
        paragraphs: [
          "Sorbitol (E420) is not a preservative but is often bought alongside them. As a humectant it binds water and keeps products soft and moist; sorbitol 70% solution is widely used in toothpaste, confectionery and pharmaceutical syrups.",
        ],
      },
      {
        heading: "Regulation and labelling",
        paragraphs: [
          "Which preservatives are permitted, in which foods and at what level, is set by the regulations of the market where the product is sold — for example FSSAI in India, the Codex General Standard for Food Additives for many export markets, or Regulation (EC) No 1333/2008 in the European Union. Always check the current rules for your product category before formulating.",
          "Labels normally declare a preservative by its function and its name or code. E numbers are used in the EU; the Codex International Numbering System (INS) uses the same numerals for these three additives and is used in many other markets, including India.",
        ],
      },
      {
        heading: "What to specify when buying",
        paragraphs: [
          "Food-grade material is usually specified against a recognised standard, such as the JECFA specifications, the EU specifications for food additives or the Food Chemicals Codex, or a pharmacopoeia for pharmaceutical use. When buying, state:",
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
    relatedCategories: ["food-pharma-ingredients"],
    sources: [
      { label: "EUR-Lex — Regulation (EC) No 1333/2008 on food additives", href: "https://eur-lex.europa.eu/eli/reg/2008/1333/oj" },
      { label: "Codex Alimentarius (FAO/WHO) — General Standard for Food Additives and INS", href: "https://www.fao.org/fao-who-codexalimentarius/" },
      { label: "Food Safety and Standards Authority of India (FSSAI)", href: "https://www.fssai.gov.in" },
      { label: "PubChem, US National Library of Medicine — benzoic, sorbic and propionic acid records", href: "https://pubchem.ncbi.nlm.nih.gov" },
    ],
    faqs: [
      {
        question: "Which preservative is used in soft drinks?",
        answer:
          "Sodium benzoate is the standard preservative for acidic soft drinks and juices, because benzoic acid works best below about pH 4.5. It is often combined with potassium sorbate to cover a wider range of yeasts and moulds. Which preservatives are permitted, and at what level, depends on the rules of the country where the drink is sold, so check those first.",
      },
      {
        question: "Why is calcium propionate used in bread rather than potassium sorbate?",
        answer:
          "Calcium propionate inhibits moulds and the bacteria that cause rope in bread, but has little effect on baker's yeast, so the dough still rises normally. Potassium sorbate also slows yeast, which makes it better suited to chemically leavened products such as cakes, or to surface treatment of baked goods after fermentation is complete.",
      },
      {
        question: "Can sodium benzoate and potassium sorbate be used together?",
        answer:
          "Yes. The two are frequently combined, particularly in soft drinks, sauces and syrups, because together they cover a broader range of spoilage yeasts and moulds than either does alone. Both work best in acidic conditions. The combination, and the level of each, must still comply with the food additive rules of the market where the product is sold.",
      },
      {
        question: "What do the codes E211, E202 and E282 mean?",
        answer:
          "They are the European Union codes for approved food additives: E211 is sodium benzoate, E202 is potassium sorbate and E282 is calcium propionate. The Codex Alimentarius International Numbering System uses the same numerals, written as INS 211, INS 202 and INS 282, and many countries outside the EU use those codes on food labels.",
      },
    ],
  },
  {
    slug: "importing-chemicals-from-india",
    title: "How to import chemicals from India: a checklist for overseas buyers",
    seoTitle: "Buying Chemicals from India: Importer's Checklist",
    description:
      "For overseas buyers sourcing chemicals from India: verifying a supplier, payment terms, export documents, dangerous-goods packing, ports and Incoterms.",
    datePublished: "2026-10-21",
    dateModified: "2026-11-14",
    readingMinutes: 12,
    audience:
      "Buyers outside India — importers, distributors and manufacturers — sourcing chemicals, essential oils or botanicals from Indian suppliers. It does not cover the rules for companies importing goods into India.",
    sections: [
      {
        heading: "How a first purchase from India usually runs",
        paragraphs: [
          "This checklist follows a typical first order from an Indian supplier. Rules for importing into India, such as DGFT import licensing or BIS certification, are a separate subject and are not covered here. The usual sequence is:",
        ],
        list: [
          "Verify the supplier and send a complete enquiry",
          "Approve a sample against your specification",
          "Agree the quotation, Incoterm and payment terms",
          "Place a trial lot, then regular orders",
          "Receive the goods with the agreed documents and clear them in your country",
        ],
      },
      {
        heading: "Verify the supplier",
        paragraphs: [
          "Indian exporters hold two registrations that an overseas buyer can check independently. Ask for both in the first exchange.",
        ],
        list: [
          "GSTIN (Goods and Services Tax Identification Number) — a 15-character number whose first two digits are the state code (24 is Gujarat) and whose third to twelfth characters are the business's PAN. The public Search Taxpayer tool on the GST portal shows the legal name, registration status and principal place of business.",
          "IEC (Importer-Exporter Code) — issued by the Directorate General of Foreign Trade (DGFT); Indian businesses generally need one to export goods. It can be checked on the DGFT website against the firm's registered name.",
          "Physical address — the address in the GST record should match the website, quotation and invoice, and be a works, warehouse or office rather than only a mailing address. A video call from the premises, a visit or an independent inspection agency can confirm it.",
          "Sample before order — test a sample in your own or an independent laboratory against your specification before placing the first order.",
        ],
      },
      {
        heading: "What to put in the enquiry",
        paragraphs: [
          "A complete first message gets a firm quotation rather than a list of questions; the chemical quotation checklist on this site covers each point in detail. For an export enquiry, include:",
        ],
        list: [
          "Product name and CAS number, or the botanical name and plant part",
          "Grade and specification, with your specification sheet if you have one",
          "Trial quantity and expected regular volume",
          "Packing, labelling and palletisation requirements",
          "Destination port or city, and your preferred Incoterm",
          "Documents needed, including any destination-specific certificates",
          "End use, so transport or export restrictions can be flagged early",
          "Your legal name, address and tax or import registration number, for the proforma invoice",
        ],
      },
      {
        heading: "Agree the product classification",
        paragraphs: [
          "Two classifications drive almost everything else in an export shipment. The HS code determines the customs duty and any import licensing in your country. The transport classification determines whether the material is a dangerous good — and if it is, its UN number, hazard class and packing group decide how it may be packed and whether it can travel by air at all. Agree both with your supplier before the order is confirmed.",
          "The first six digits of an HS code are shared by every country that uses the Harmonized System. National tariff lines add further digits, so the Indian export code and your import code may differ after the sixth digit.",
        ],
      },
      {
        heading: "Payment terms used in Indian export trade",
        paragraphs: [
          "Payment terms are agreed for each contract and often change as a trading relationship develops. Each term below spreads risk differently between buyer and seller, and none suits every transaction. Documents against acceptance and open-account terms are also used, usually once the parties have a trading history.",
        ],
        list: [
          "Advance payment — the buyer pays by bank transfer (T/T) before dispatch and relies on the exporter to ship as agreed.",
          "Part-advance — part is paid with the order and the balance before dispatch or against a copy of the bill of lading, sharing the risk between the parties.",
          "Letter of credit (L/C) — the buyer's bank undertakes to pay against documents that comply exactly with the credit's terms, usually under the ICC's UCP 600 rules. Bank charges are higher, and a discrepancy in the documents can delay payment.",
          "Documents against payment (D/P) — the buyer's bank releases the shipping documents, which the buyer needs to take delivery, only when the buyer pays. No bank guarantees payment; such collections usually follow the ICC's URC 522 rules.",
        ],
      },
      {
        heading: "Confirm bank details before you pay",
        paragraphs: [
          "Whatever the term, check that the beneficiary name on the proforma invoice matches the legal name in the supplier's GST record. Confirm any emailed change of bank details by phone with a contact you already know before sending money. Invoice fraud through altered bank details occurs throughout international trade, and the check takes a few minutes.",
        ],
      },
      {
        heading: "Export documents",
        paragraphs: [
          "Most chemical shipments from India travel with the documents below. The exact set depends on the product, the destination and the payment term; a letter of credit, for example, lists precisely what must be presented. Many destinations add their own requirements, such as chemical inventory registration, pre-shipment inspection or label languages, so confirm the list with your customs broker and raise it in your first enquiry.",
        ],
        table: {
          caption: "Documents commonly used for chemical shipments from India",
          columns: ["Document", "Issued by", "Purpose"],
          rows: [
            [
              "Commercial invoice",
              "Exporter",
              "States the goods, quantity, value and Incoterm; the basis for customs valuation and duty at destination",
            ],
            [
              "Packing list",
              "Exporter",
              "Lists package marks, contents and net and gross weights, for cargo handling and customs examination",
            ],
            [
              "Certificate of analysis (COA)",
              "The manufacturer's or supplier's quality-control laboratory, or an agreed independent laboratory",
              "Reports test results for the specific batch against the agreed specification",
            ],
            [
              "Safety data sheet (SDS)",
              "Manufacturer or supplier",
              "Sets out hazards, handling, storage and transport information, usually in the 16-section GHS format",
            ],
            [
              "Certificate of origin",
              "A chamber of commerce or other authorised agency in India",
              "Confirms where the goods were produced; a preferential certificate can reduce duty where a trade agreement applies",
            ],
            [
              "Bill of lading (sea) or air waybill (air)",
              "Shipping line or airline, or their agent",
              "Receipt for the goods and evidence of the contract of carriage; an original negotiable bill of lading is also a document of title",
            ],
            [
              "Shipping bill",
              "Filed with Indian Customs by the exporter or its customs broker",
              "India's export declaration, against which export clearance is recorded",
            ],
            [
              "Dangerous goods declaration (where applicable)",
              "Shipper — the exporter, often with its freight forwarder",
              "Declares the UN number, proper shipping name, hazard class, packing group and packaging, as the IMDG Code or IATA DGR requires",
            ],
            [
              "Phytosanitary certificate (some botanicals)",
              "India's plant quarantine authority",
              "Confirms plant material has been inspected for the importing country's plant-health requirements",
            ],
          ],
        },
      },
      {
        heading: "Packing and dangerous goods",
        paragraphs: [
          "Export packing must hold up to weeks at sea, container heat and repeated handling. Liquids typically travel in HDPE or MS drums or IBCs, powders in lined bags or fibre drums, all palletised and stretch-wrapped. Hygroscopic and air-sensitive materials need moisture-proof inner packing — state this with the order.",
          "Dangerous goods must travel in UN-approved packaging: a design that has passed the UN performance tests and carries the UN specification mark. The mark shows the packaging type and the packing groups it is approved for — X for packing groups I to III, Y for II and III, Z for III only. The two transport codes are both based on the UN Recommendations on the Transport of Dangerous Goods:",
        ],
        list: [
          "Sea — the International Maritime Dangerous Goods (IMDG) Code, published by the International Maritime Organization (IMO). It covers classification, packing, marking, documentation and the segregation of incompatible goods in a container.",
          "Air — the IATA Dangerous Goods Regulations (DGR), based on the ICAO Technical Instructions. Air rules are stricter: some materials may travel only on cargo aircraft, only in limited quantities, or not at all.",
          "Packages carry the UN number, proper shipping name and hazard labels, and both codes require the people preparing them to be trained.",
        ],
      },
      {
        heading: "Ports and Incoterms",
        paragraphs: [
          "Shipments from Gujarat usually leave through Mundra, Kandla (Deendayal Port) or Hazira, or through Nhava Sheva (Jawaharlal Nehru Port) near Mumbai; air freight usually goes from Ahmedabad or Mumbai. The Incoterm and named place in the quotation decide where the supplier's costs and risks end. The table summarises common rules under ICC Incoterms 2020; the ICC's published rules are the authoritative text.",
          "Two points are often misunderstood. Under CFR and CIF, risk passes to the buyer when the goods are loaded in India, even though the seller pays freight to your port. And FOB, CFR and CIF are intended for sea transport; for containers handed over at a terminal, and for air freight, FCA, CPT and CIP are the equivalents for any mode.",
        ],
        table: {
          caption: "Common Incoterms 2020 rules for shipments from India",
          columns: ["Incoterm", "Seller's responsibility ends", "Common use"],
          rows: [
            [
              "EXW — Ex Works (named place)",
              "When the goods are made available at the seller's premises or another named place, not loaded and not cleared for export",
              "Buyers with their own forwarder in India; the buyer must handle Indian export clearance, which can be impractical from overseas",
            ],
            [
              "FCA — Free Carrier (named place)",
              "When the goods, cleared for export, are handed to the buyer's nominated carrier at the named place",
              "Container and air shipments where the buyer controls the main freight; any mode of transport",
            ],
            [
              "FOB — Free On Board (named Indian port)",
              "When the goods are on board the buyer's nominated vessel at the named port",
              "Sea freight booked by the buyer; widely quoted, although the ICC suggests FCA for containers handed over at a terminal",
            ],
            [
              "CFR — Cost and Freight (named destination port)",
              "Risk passes on loading at the Indian port; the seller pays sea freight to the named destination port",
              "Sea freight booked by the seller, with the buyer arranging insurance",
            ],
            [
              "CIF — Cost, Insurance and Freight (named destination port)",
              "As CFR, and the seller also buys cargo insurance, with minimum cover under Institute Cargo Clauses (C)",
              "Sea freight where the buyer wants freight and insurance arranged by the seller",
            ],
            [
              "DAP — Delivered at Place (named destination)",
              "When the goods arrive at the named place, ready for unloading; the buyer clears import and pays duties",
              "Delivery to the buyer's premises with the seller managing transport; any mode of transport",
            ],
          ],
        },
      },
      {
        heading: "Samples, then a trial lot",
        paragraphs: [
          "For a new supplier or a new grade, the usual sequence is a sample for laboratory approval, then a trial lot, then regular orders. Approve the sample against your specification and keep it as a reference for later lots.",
          "Ask for the batch COA with the sample and agree test methods in advance: GC, HPLC and titration can give different assay figures for the same material, and many disputes stem from methods rather than product. Samples of hazardous materials are dangerous goods too, and many couriers refuse them, so allow for a specialist carrier and a dangerous goods declaration.",
          "Pack and document the trial lot exactly as regular orders will be, so it tests the whole chain: packing, documents, transit and clearance. Where the order value justifies it, an independent pre-shipment inspection can check quantity and packing before dispatch.",
        ],
      },
      {
        heading: "Check the import rules in your own country",
        paragraphs: [
          "Export clearance in India does not mean a product can be imported, sold or used in your market. The importer is usually responsible for compliance at destination, so check the rules with your customs broker or regulatory adviser before the first order. For example:",
        ],
        list: [
          "European Union — REACH, administered by the European Chemicals Agency (ECHA). Imported substances may need registration, normally by the EU importer or by an only representative appointed by the non-EU manufacturer. CLP rules then govern classification and labelling.",
          "United States — the Toxic Substances Control Act (TSCA), administered by the EPA. Substances must generally be on the TSCA Inventory or exempt, and importers certify TSCA compliance when goods enter the country.",
          "Other markets — the United Kingdom, Canada, Australia, Japan, Korea and China, among others, run their own chemical inventories or registration schemes.",
          "Food, pharmaceutical and cosmetic materials — your food safety authority or medicines regulator may require registration, specific grades or approved suppliers.",
          "Controlled materials — drug precursors, dual-use chemicals and some botanicals covered by plant-health or CITES rules can need permits at one or both ends.",
        ],
      },
    ],
    relatedProducts: ["lemongrass-oil", "menthol", "ashwagandha-powder", "benzyl-acetate"],
    relatedIndustries: ["fragrance-and-flavour", "ayurveda-and-nutraceuticals", "chemical-synthesis"],
    appliesToAllProducts: true,
    sources: [
      { label: "Goods and Services Tax portal, Government of India — Search Taxpayer", href: "https://www.gst.gov.in" },
      { label: "Directorate General of Foreign Trade (DGFT) — Importer-Exporter Code", href: "https://www.dgft.gov.in" },
      { label: "International Chamber of Commerce — Incoterms 2020 rules", href: "https://iccwbo.org/business-solutions/incoterms-rules/" },
      { label: "International Chamber of Commerce — UCP 600 and URC 522", href: "https://iccwbo.org" },
      { label: "International Maritime Organization (IMO) — IMDG Code", href: "https://www.imo.org" },
      { label: "IATA — Dangerous Goods Regulations", href: "https://www.iata.org" },
      { label: "European Chemicals Agency (ECHA) — REACH", href: "https://echa.europa.eu" },
      { label: "US Environmental Protection Agency — TSCA Chemical Substance Inventory", href: "https://www.epa.gov/tsca-inventory" },
    ],
    faqs: [
      {
        question: "How can I check that an Indian chemical supplier is genuine?",
        answer:
          "Ask for the supplier's GSTIN and IEC. Enter the GSTIN in the public Search Taxpayer tool on the GST portal to confirm the legal name, status and principal place of business, and check the IEC on the DGFT website. Make sure the address matches the website and invoices, and test a sample before ordering. A video call from the premises or an independent inspection adds assurance.",
      },
      {
        question: "What documents come with a chemical shipment from India?",
        answer:
          "A typical chemical shipment from India travels with a commercial invoice, packing list, certificate of analysis, safety data sheet, certificate of origin and a bill of lading or air waybill. Hazardous materials also need a dangerous goods declaration. Your country may require further documents, such as import permits or phytosanitary certificates, so confirm the list with your customs broker before ordering.",
      },
      {
        question: "Which payment terms are used when buying chemicals from India?",
        answer:
          "Indian exporters commonly work with advance payment by bank transfer, part-advance with the balance before dispatch or against shipping documents, letters of credit issued under the ICC's UCP 600 rules, and documents against payment. Each spreads risk differently between buyer and seller. The term is agreed for each contract and often changes as the trading relationship develops.",
      },
      {
        question: "What is the difference between FOB and CIF when buying from India?",
        answer:
          "Under FOB, the seller's responsibility ends when the goods are loaded on the vessel at the named Indian port, and the buyer pays sea freight and insurance. Under CIF, the seller also pays freight to the named destination port and buys minimum cargo insurance, but risk still passes to the buyer on loading in India. Both rules are defined in ICC Incoterms 2020.",
      },
      {
        question: "Who is responsible for REACH or TSCA compliance when importing chemicals from India?",
        answer:
          "Compliance at destination generally rests with the importer. In the EU, REACH registration is normally the EU importer's responsibility unless the non-EU manufacturer has appointed an only representative. In the US, importers certify TSCA compliance at entry. An Indian supplier can usually provide the safety data sheet and composition details you need, but confirm the rules with ECHA, the EPA or your adviser.",
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

/**
 * Guides to show on a product page: guides that name the product first, then
 * guides for its category, then the general buyer guides.
 */
export function guidesForProduct(product: Product, limit = 3): Guide[] {
  const named = guides.filter((g) => g.relatedProducts.includes(product.slug))
  const byCategory = guides.filter((g) => g.relatedCategories?.includes(product.category))
  const general = guides.filter((g) => g.appliesToAllProducts)
  return [...new Set([...named, ...byCategory, ...general])].slice(0, limit)
}

/** Guides to show on a category page: the category's own guides, then the general ones. */
export function guidesForCategory(category: CategorySlug, limit = 3): Guide[] {
  const own = guides.filter(
    (g) => g.relatedCategories?.includes(category),
  )
  const general = guides.filter((g) => g.appliesToAllProducts)
  return [...new Set([...own, ...general])].slice(0, limit)
}
