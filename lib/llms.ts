/**
 * /llms.txt and /llms-full.txt (https://llmstxt.org): a plain-Markdown map of
 * the site for AI assistants and answer engines. Built from the same data as
 * the pages, so it never drifts from the catalogue. Only verified facts from
 * site-config are stated; prices and stock are never implied.
 */
import { siteConfig, addressSingleLine } from "@/lib/site-config"
import { productCategories, productsDatabase, productHref, categoryHref, type Product } from "@/lib/products-data"
import { industries, industryHref } from "@/lib/industries"
import { guides } from "@/lib/guides"
import { faqs } from "@/lib/faqs"
import { productFaqs, productOverview } from "@/lib/product-content"

const BASE = siteConfig.url
const url = (path: string) => `${BASE}${path}`

function header(): string[] {
  const { contact, address } = siteConfig
  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} is a chemical trading and custom-manufacturing firm in ${address.city}, ${address.state}, India, established in ${siteConfig.establishedYear}. It supplies aromatic chemicals, essential oils, Ayurvedic products, metals, pharma intermediates, phase transfer catalysts, food & pharma ingredients and specialty chemicals to manufacturers and distributors across India, and exports to buyers in ${siteConfig.exportCountries} countries.`,
    "",
    "Key facts:",
    "",
    "- Business model: trading, plus custom manufacturing to a buyer's specification. It is not the manufacturer of every listed product.",
    `- Services: custom packaging and private labelling under the buyer's own brand (${url("/private-label")})`,
    `- Established: ${siteConfig.establishedYear} (${siteConfig.legalForm.toLowerCase()})`,
    `- Address: ${addressSingleLine}`,
    `- Phone / WhatsApp: ${contact.phonePrimary.display} (${contact.phonePrimary.contactName}), ${contact.phoneSecondary.display} (${contact.phoneSecondary.contactName})`,
    `- Email: ${contact.email}`,
    `- Hours: ${siteConfig.businessHours.summary}; ${siteConfig.businessHours.closed}`,
    ...siteConfig.registrations.map((r) => `- ${r.label} ${r.value}`),
    `- Partners: ${siteConfig.partners.map((p) => p.name).join(", ")}`,
    `- Catalogue: ${productsDatabase.length} products listed online across ${productCategories.length} categories; ${siteConfig.productPortfolio} products sourced on request`,
    `- Export: buyers in ${siteConfig.exportCountries} countries`,
    ...siteConfig.social.map((p) => `- ${p.label}: ${p.href}`),
    `- Last updated: ${siteConfig.contentUpdated}`,
    "- Prices, minimum order quantity, packing and lead time are quoted per enquiry; there is no public price list.",
    `- Quotations: ${url("/request-a-quote")}`,
  ]
}

function mainPages(): string[] {
  return [
    "## Main pages",
    "",
    `- [Home](${BASE}): company overview, product groups and industries served`,
    `- [All products](${url("/products")}): full catalogue, searchable by name or CAS number`,
    `- [Request a quote](${url("/request-a-quote")}): enquiry form for quotations and samples`,
    `- [Export](${url("/export")}): how export enquiries, documentation and shipments are handled`,
    `- [Chemical supplier in Ahmedabad & Gujarat](${url("/chemical-supplier-ahmedabad-gujarat")}): local supply, GST invoicing, office address, hours and map`,
    `- [Private labelling](${url("/private-label")}): product sourcing, custom pack sizes and labels under the buyer's own brand`,
    `- [About](${url("/about")}): company background and partners`,
    `- [Contact](${url("/contact")}): address, phone, WhatsApp, email and map`,
    `- [FAQ](${url("/faq")}): buyer questions on enquiries, specifications and export`,
  ]
}

function productLine(p: Product): string {
  const id = [p.casNumber && `CAS ${p.casNumber}`, p.molecularFormula].filter(Boolean).join(", ")
  return `- [${p.name}${id ? ` (${id})` : ""}](${url(productHref(p))}): ${p.summary}`
}

function catalogue(): string[] {
  const lines = ["## Product categories", ""]
  for (const c of productCategories) lines.push(`- [${c.name}](${url(categoryHref(c.slug))}): ${c.description}`)
  lines.push("", "## Products")
  for (const c of productCategories) {
    lines.push("", `### ${c.name}`, "")
    for (const p of productsDatabase.filter((p) => p.category === c.slug)) lines.push(productLine(p))
  }
  return lines
}

function industriesAndGuides(): string[] {
  return [
    "## Industries served",
    "",
    ...industries.map((i) => `- [${i.name}](${url(industryHref(i))}): ${i.summary}`),
    "",
    "## Buyer guides",
    "",
    ...guides.map((g) => `- [${g.title}](${url(`/guides/${g.slug}`)}): ${g.description}`),
  ]
}

export function llmsTxt(): string {
  return [
    ...header(),
    "",
    ...mainPages(),
    "",
    ...catalogue(),
    "",
    ...industriesAndGuides(),
    "",
    "## Optional",
    "",
    `- [Full product data](${url("/llms-full.txt")}): every product with CAS number, formula, grade, form, synonyms and applications, plus buyer FAQs`,
    `- [Sitemap](${url("/sitemap.xml")})`,
    `- [Privacy policy](${url("/privacy-policy")})`,
    `- [Terms and conditions](${url("/terms-and-conditions")})`,
    `- [Website security](${url("/website-security")})`,
    "",
  ].join("\n")
}

function productDetail(p: Product): string[] {
  const rows: [string, string | undefined][] = [
    ["URL", url(productHref(p))],
    ["CAS number", p.casNumber],
    ["Molecular formula", p.molecularFormula],
    ["Molecular weight", p.molecularWeight],
    ["Typical grade", p.typicalGrade],
    ["Physical form", p.physicalForm],
    ["Appearance", p.appearance],
    ["Odour", p.odor],
    ["Synonyms", p.synonyms?.join(", ")],
    ["Applications", p.applications.join(", ")],
    ["Forms supplied", p.forms?.join(", ")],
    ...(p.packaging ?? []).map((pack): [string, string] => [`Pack sizes (${pack.form})`, pack.sizes.join(", ")]),
    ["Solution bases", p.solutionBases?.join(", ")],
  ]
  const productQuestions = productFaqs(p)
  return [
    `#### ${p.name}`,
    "",
    productOverview(p) ?? p.summary,
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `- ${k}: ${v}`),
    "",
    ...productQuestions.flatMap((f) => [`**${f.question}**`, "", f.answer, ""]),
  ]
}

function guideFullText(): string[] {
  const lines = ["## Buyer guides: full text", ""]
  for (const g of guides) {
    lines.push(`### ${g.title}`, "", `URL: ${url(`/guides/${g.slug}`)} · Updated ${g.dateModified}`, "", g.description, "")
    for (const section of g.sections) {
      lines.push(`#### ${section.heading}`, "", ...section.paragraphs.flatMap((p) => [p, ""]))
      if (section.list) lines.push(...section.list.map((item) => `- ${item}`), "")
      if (section.table) {
        const t = section.table
        lines.push(`| ${t.columns.join(" | ")} |`, `| ${t.columns.map(() => "---").join(" | ")} |`)
        lines.push(...t.rows.map((row) => `| ${row.join(" | ")} |`), "")
      }
    }
    for (const f of g.faqs ?? []) lines.push(`**${f.question}**`, "", f.answer, "")
    if (g.sources?.length) lines.push("Sources:", "", ...g.sources.map((src) => `- [${src.label}](${src.href})`), "")
  }
  return lines
}

export function llmsFullTxt(): string {
  const lines = [...header(), "", ...mainPages(), "", "## Products", ""]
  for (const c of productCategories) {
    lines.push(`### ${c.name}`, "", c.intro, "", `Category page: ${url(categoryHref(c.slug))}`, "")
    for (const p of productsDatabase.filter((p) => p.category === c.slug)) lines.push(...productDetail(p))
  }
  lines.push(...industriesAndGuides(), "", ...guideFullText(), "## Buyer FAQs", "")
  for (const f of faqs) lines.push(`### ${f.question}`, "", f.answer, "")
  return lines.join("\n")
}
