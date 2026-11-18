import { siteConfig, addressSingleLine, yearsOfExperience } from "@/lib/site-config"

export interface Faq {
  question: string
  answer: string
  /** Shown on the home page shortlist. */
  featured?: boolean
}

/**
 * Answers are written only from information the business has confirmed. Where
 * something depends on the order — grade, packing, lead time, price — the
 * answer says so instead of stating a figure.
 */
export const faqs: Faq[] = [
  {
    question: "What products does Sheetal Aromatics supply?",
    answer:
      "We supply eight product groups: aromatic chemicals, essential oils, Ayurvedic products (whole herbs, raw materials and milled powders), metals, pharma intermediates, phase transfer catalysts (quaternary ammonium and phosphonium salts), food & pharma ingredients (preservatives, humectants and excipients), and specialty chemicals such as the bittering agent denatonium benzoate. The full catalogue is listed on the Products pages, and items outside the listed range can be discussed on enquiry.",
    featured: true,
  },
  {
    question: "Is Sheetal Aromatics a chemical trader in Gujarat?",
    answer:
      "Yes. Sheetal Aromatics is a chemical trading and custom-manufacturing firm based in Ahmedabad, Gujarat, established in 2005. We supply aromatic chemicals, phase transfer catalysts, pharma intermediates, food and pharma ingredients, essential oils, Ayurvedic raw materials and metals to manufacturers and distributors across Gujarat and India, and export to buyers in other countries.",
    featured: true,
  },
  {
    question: "Do you offer custom manufacturing?",
    answer:
      "Yes. Alongside trading, we take up custom manufacturing of chemicals to a buyer's own specification. Share the product or structure, the specification you need, the quantity and your target timeline, and we will confirm feasibility before quoting.",
  },
  {
    question: "Do you offer private labelling and custom packaging?",
    answer:
      "Yes. Distributors, importers and new chemical brands can source products from us under their own brand, with custom pack sizes and labels to their requirements. Availability, minimum quantities and lead times are confirmed per product with the quotation. See our private labelling page for how it works.",
    featured: true,
  },
  {
    question: "Does Sheetal Aromatics supply international buyers?",
    answer:
      "Yes. Export is a core part of the business: we supply importers, distributors and manufacturers in 5+ countries and hold Importer Exporter Code 0805014608. Shipments leave from Mundra, Kandla, Hazira or Nhava Sheva on EXW, FOB, CFR or CIF terms, with COA, SDS, certificate of origin and shipping documents. See the Export page for details.",
    featured: true,
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Use the Request a Quote form, or write to " +
      siteConfig.contact.email +
      ". Every product page also has a quote button that carries the product name into the enquiry for you.",
    featured: true,
  },
  {
    question: "What information should I include in an enquiry?",
    answer:
      "The product name, the quantity you need, the specification or grade you work to, your required packing, and the destination country or city. With those five details we can respond with availability and a quotation rather than a round of clarifying questions.",
    featured: true,
  },
  {
    question: "Can I request a product specification before ordering?",
    answer:
      "Yes. Specifications and supporting documentation are shared on request against a specific enquiry, since the applicable details depend on the grade and quantity being discussed.",
    featured: true,
  },
  {
    question: "How long has Sheetal Aromatics been in business?",
    answer:
      "The firm was established in " +
      siteConfig.establishedYear +
      ", giving " +
      yearsOfExperience +
      "+ years of continuous experience in chemical and natural product supply.",
  },
  {
    question: "Is Sheetal Aromatics a registered business?",
    answer:
      "Yes. Sheetal Aromatics is a partnership firm registered in Gujarat, India, under GST 24ABEFS0254K1Z9, with Importer Exporter Code 0805014608. The firm is run by its partners, Mr. Shailesh Shah and Mr. Vidhan Shah.",
  },
  {
    question: "Where is Sheetal Aromatics located?",
    answer: "Our office address is " + addressSingleLine + ".",
  },
  {
    question: "Which aromatic chemicals do you supply?",
    answer:
      "Our aromatic chemicals range includes benzyl acetate, benzyl alcohol, benzyl benzoate, benzyl propionate, benzyl butyrate, isoamyl acetate, isoamyl butyrate, ethyl benzoate, methyl benzoate, methyl salicylate, menthol, indole, phenyl ethyl isobutyrate, phenoxy ethyl isobutyrate and yara yara crystal. Each product has its own page with the identifiers we hold for it.",
  },
  {
    question: "How do I enquire about pharma intermediates?",
    answer:
      "Open the product page for the intermediate you need and use the quote button, or send your specification directly. For intermediates we ask for the assay and impurity limits you work to, the quantity, and the documentation you require, so we can confirm what can be supplied before quoting.",
  },
  {
    question: "How do I enquire about sodium metal?",
    answer:
      "Sodium metal is water-reactive and classified as a dangerous good for transport, so enquiries are handled individually. Please state the grade and form you need, the quantity, the destination, and your intended end use. Handling, packing and transport arrangements are confirmed before any despatch.",
  },
  {
    question: "Do you supply samples?",
    answer:
      "Yes. New buyers usually move from a sample to a trial lot and then to regular orders. Sample terms are confirmed against a specific enquiry, so include the product, the specification you are evaluating against and your delivery address.",
  },
  {
    question: "What packing is available?",
    answer:
      "Packing is confirmed with the quotation. Typical export packs are HDPE or MS drums or IBCs for liquids and lined bags or fibre drums for powders, palletised and stretch-wrapped; dangerous goods go in UN-certified packaging. Custom pack sizes and private labelling are available, so state any required pack size, standard or label with your enquiry.",
  },
  {
    question: "Do you provide documentation with shipments?",
    answer:
      "Yes. A certificate of analysis and safety data sheet are available for each product, and export shipments also carry the commercial invoice, packing list, certificate of origin and bill of lading or air waybill, plus a dangerous-goods declaration for hazardous items. A method of analysis is available on request. Tell us any extra document your importer or bank needs.",
  },
]

export const featuredFaqs = faqs.filter((f) => f.featured)
