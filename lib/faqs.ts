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
      "We supply five product groups: aromatic chemicals, essential oils, Ayurvedic products (whole herbs, raw materials and milled powders), metals, and pharma intermediates. The full catalogue is listed on the Products pages, and items outside the listed range can be discussed on enquiry.",
    featured: true,
  },
  {
    question: "Does Sheetal Aromatics supply international buyers?",
    answer:
      "Yes. We handle enquiries from importers, distributors, manufacturers and procurement teams outside India, and hold an Importer Exporter Code (IEC 0805014608). Shipment terms, packing and documentation are agreed for each order.",
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
      "Sample requests are considered against a specific enquiry. Please include the product, the specification you are evaluating against and your shipping address, and we will confirm what is possible.",
  },
  {
    question: "What packing is available?",
    answer:
      "Packing depends on the product and the quantity ordered, and is confirmed with the quotation. If you have a required pack size or packaging standard, state it with your enquiry.",
  },
  {
    question: "Do you provide documentation with shipments?",
    answer:
      "Documentation is prepared according to the product, the destination and the terms agreed for the order. Tell us what your side needs at enquiry stage and we will confirm what can be provided.",
  },
]

export const featuredFaqs = faqs.filter((f) => f.featured)
