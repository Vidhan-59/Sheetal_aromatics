import type { Metadata } from "next"
import {
  siteConfig,
  streetAddress,
  geo,
  mapsShortLink,
  yearsOfExperience,
} from "@/lib/site-config"
import {
  productCategories,
  productHref,
  type Product,
} from "@/lib/products-data"
import { productImageAlt, productImageFor, productStructureFor } from "@/lib/product-images"
import { productOverview } from "@/lib/product-content"

export const BASE_URL = siteConfig.url

/* --------------------------------- Metadata ------------------------------ */

interface PageMetaInput {
  title: string
  description: string
  /** Site-root-relative path, e.g. "/products/metals". */
  path: string
  keywords?: string[]
  /** Set false for thin utility pages that should stay out of the index. */
  index?: boolean
  /** Absolute or root-relative override; defaults to the site-wide OG card. */
  ogImage?: string
  /** Marks the page as an article (guides) so shares and crawlers get its dates. */
  article?: { publishedTime: string; modifiedTime: string }
  /** Use the title exactly as given, without the " | Sheetal Aromatics" template suffix. */
  absoluteTitle?: boolean
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  index = true,
  ogImage: ogImageInput,
  article,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = `${BASE_URL}${path === "/" ? "" : path}`
  const ogImage = ogImageInput ?? `${BASE_URL}/opengraph-image`

  // Titles that already name the company are marked absolute, otherwise the
  // root template appends the brand a second time.
  const namesBrand = title.includes(siteConfig.name)
  const resolvedTitle = namesBrand || absoluteTitle ? { absolute: title } : title
  // Link previews (WhatsApp, LinkedIn) show only og:title, so it carries the brand too.
  const shareTitle = namesBrand ? title : `${title} | ${siteConfig.name}`
  const ogType = article
    ? { type: "article" as const, publishedTime: article.publishedTime, modifiedTime: article.modifiedTime }
    : { type: "website" as const }

  return {
    title: resolvedTitle,
    description,
    keywords,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
      : { index: false, follow: true },
    openGraph: {
      ...ogType,
      siteName: siteConfig.name,
      locale: "en_IN",
      url,
      title: shareTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: shareTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [ogImage],
    },
  }
}

/* ------------------------------ Structured data -------------------------- */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress,
  addressLocality: siteConfig.address.city,
  postalCode: siteConfig.address.postalCode,
  addressRegion: siteConfig.address.state,
  addressCountry: siteConfig.address.countryCode,
}

/**
 * The office as a Place, with the coordinates from the company's own Google
 * Maps pin. Referenced from the Organization node as its `location`, which is
 * where opening hours and geo belong — they are not valid on Organization.
 */
const officePlace = {
  "@type": "Place",
  "@id": `${BASE_URL}/#office`,
  name: `${siteConfig.name} — office`,
  address: postalAddress,
  geo: {
    "@type": "GeoCoordinates",
    latitude: geo.latitude,
    longitude: geo.longitude,
  },
  hasMap: mapsShortLink,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
}

const contactPoints = [
  {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phonePrimary.e164,
    email: siteConfig.contact.email,
    contactType: "sales",
    availableLanguage: ["en", "hi", "gu"],
  },
  {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phoneSecondary.e164,
    email: siteConfig.contact.email,
    contactType: "sales",
    availableLanguage: ["en", "hi", "gu"],
  },
]

/** Company map link plus every confirmed official profile (LinkedIn etc.). */
const sameAs = [mapsShortLink, ...siteConfig.social.map((s) => s.href)]

const gstin = siteConfig.registrations.find((r) => r.label.startsWith("GST"))?.value

/** The partners, as published on the About page. */
const partnerPeople = siteConfig.partners.map((p) => ({
  "@type": "Person",
  name: p.name,
  jobTitle: p.role,
  worksFor: { "@id": `${BASE_URL}/#organization` },
}))

/**
 * Organization graph for the site root. Only facts the business has published
 * are included — no ratings, revenue, employee counts or certifications.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: BASE_URL,
    // Raster logo: Google's logo guidelines need a crawlable image of at least 112×112.
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/icon-512.png`,
      width: 512,
      height: 512,
      caption: `${siteConfig.name} logo`,
    },
    image: `${BASE_URL}/opengraph-image`,
    description: siteConfig.shortDescription,
    foundingDate: String(siteConfig.establishedYear),
    slogan: siteConfig.tagline,
    address: postalAddress,
    location: officePlace,
    contactPoint: contactPoints,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phonePrimary.e164,
    hasMap: mapsShortLink,
    sameAs,
    // No areaServed here: the company exports to 5+ countries, so an India-only
    // list would describe it as a domestic supplier. The home-market list stays
    // on the LocalBusiness node (the Ahmedabad office) only.
    ...(gstin ? { taxID: gstin } : {}),
    member: partnerPeople,
    knowsAbout: [
      ...productCategories.map((c) => c.name),
      "Chemical trading",
      "Chemical export from India",
      "Export documentation and dangerous-goods packing",
      "Custom chemical manufacturing",
      "Private label chemical supply",
      "Custom chemical packaging",
    ],
    identifier: siteConfig.registrations.map((r) => ({
      "@type": "PropertyValue",
      name: r.label.replace(/\.$/, ""),
      value: r.value,
    })),
  }
}

/**
 * Home market of the Ahmedabad office (LocalBusiness only). The firm exports to
 * 5+ countries (siteConfig.exportCountries); add Country nodes for them here and
 * on the export Service once the owner names them. "Worldwide" is never claimed.
 */
const areaServed = [
  { "@type": "City", name: "Ahmedabad" },
  { "@type": "State", name: "Gujarat" },
  { "@type": "Country", name: "India" },
]

/**
 * LocalBusiness node for the Ahmedabad office — the verified address, phone,
 * hours and map pin qualify it. Emitted on the home and contact pages and
 * linked to the Organization rather than duplicating it.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    url: BASE_URL,
    image: `${BASE_URL}/opengraph-image`,
    logo: `${BASE_URL}/icon-512.png`,
    telephone: siteConfig.contact.phonePrimary.e164,
    contactPoint: contactPoints,
    email: siteConfig.contact.email,
    address: postalAddress,
    geo: officePlace.geo,
    hasMap: mapsShortLink,
    openingHoursSpecification: officePlace.openingHoursSpecification,
    areaServed,
    foundingDate: String(siteConfig.establishedYear),
    ...(gstin ? { taxID: gstin } : {}),
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    sameAs,
  }
}

/** Article markup for buyer guides. Authored by the company; no invented people or reviews. */
export function articleSchema(article: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified: string
  image?: string
  /** URLs of the primary sources the article cites. */
  citations?: string[]
}) {
  const url = `${BASE_URL}${article.path}`
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/opengraph-image`,
    inLanguage: "en",
    author: { "@id": `${BASE_URL}/#organization` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    ...(article.citations?.length ? { citation: article.citations } : {}),
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en",
    // No SearchAction: Google retired the sitelinks search box (Nov 2024) and
    // /products?q= is disallowed in robots.txt.
  }
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href === "/" ? "" : item.href}`,
    })),
  }
}

/**
 * ImageObject for a product's photo or structure. Photos carry their licence
 * and credit so Google Images can show the "Licensable" details correctly.
 */
export function productImageSchema(product: Product) {
  const image = productImageFor(product.slug)
  if (!image) return undefined

  // Images made for the site (illustrations, structure drawings) carry the terms on /image-credits.
  const ownImageRights = {
    creator: { "@id": `${BASE_URL}/#organization` },
    creditText: siteConfig.name,
    copyrightNotice: `© ${siteConfig.name}`,
    copyrightHolder: { "@id": `${BASE_URL}/#organization` },
    license: `${BASE_URL}/image-credits#our-images`,
    acquireLicensePage: `${BASE_URL}/contact`,
  }

  if (image.kind === "structure") {
    return {
      "@type": "ImageObject",
      contentUrl: `${BASE_URL}${image.src}`,
      url: `${BASE_URL}${image.src}`,
      encodingFormat: "image/svg+xml",
      width: 800,
      height: 600,
      caption: productImageAlt(product, image),
      isBasedOn: `https://pubchem.ncbi.nlm.nih.gov/compound/${image.pubchemCid}`,
      ...ownImageRights,
    }
  }

  if (image.kind === "generated") {
    // Illustrative image created for the site; labelled as such, owned by the company.
    return {
      "@type": "ImageObject",
      contentUrl: `${BASE_URL}${image.src}`,
      url: `${BASE_URL}${image.src}`,
      encodingFormat: "image/webp",
      width: 1200,
      height: 900,
      caption: productImageAlt(product, image),
      description: `Illustrative image of ${product.name} showing its typical appearance (AI-generated, not a photograph of supplied material).`,
      ...ownImageRights,
    }
  }

  return {
    "@type": "ImageObject",
    contentUrl: `${BASE_URL}${image.src}`,
    url: `${BASE_URL}${image.src}`,
    encodingFormat: "image/webp",
    width: 1200,
    height: 900,
    caption: productImageAlt(product, image),
    creditText: image.credit.author,
    creator: { "@type": "Person", name: image.credit.author },
    copyrightNotice: `© ${image.credit.author}, ${image.credit.license}`,
    license: image.credit.licenseUrl ?? image.credit.sourceUrl,
    acquireLicensePage: image.credit.sourceUrl,
  }
}

/** Absolute URL of a product's primary image, for sitemaps and share metadata. */
export function productImageUrl(product: Product): string | undefined {
  const image = productImageFor(product.slug)
  return image ? `${BASE_URL}${image.src}` : undefined
}

/**
 * Structured data for a product page.
 *
 * Deliberately not schema.org/Product: Google's product snippets require a
 * price, review or rating, and this quote-only catalogue publishes none (and
 * never invents them), so every Product node was reported as an invalid item.
 * Chemicals, oils and metals are described as a ChemicalSubstance, with the CAS
 * number as an identifier and the PubChem record in sameAs; botanical raw
 * materials as a plain Thing. Search engines and AI assistants still get the
 * identity, synonyms, uses and image, without a rich-result error on 87 pages.
 */
export function productSchema(product: Product) {
  const image = productImageSchema(product)
  const url = `${BASE_URL}/products/${product.category}/${product.slug}`
  const botanical = product.category === "ayurvedic-products"
  const pubchem = product.pubchemCid ?? productStructureFor(product.slug)?.pubchemCid
  const pubchemUrl = pubchem ? `https://pubchem.ncbi.nlm.nih.gov/compound/${pubchem}` : undefined

  const identifiers = [
    product.casNumber && { "@type": "PropertyValue", propertyID: "CAS", value: product.casNumber },
    product.hsCode && { "@type": "PropertyValue", propertyID: "HS code", value: product.hsCode },
    product.unNumber && { "@type": "PropertyValue", propertyID: "UN number", value: product.unNumber },
  ].filter(Boolean)

  const substance = {
    "@type": botanical ? "Thing" : "ChemicalSubstance",
    "@id": `${url}#substance`,
    name: product.name,
    description: productOverview(product) ?? product.summary,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    ...(image ? { image } : {}),
    ...(product.synonyms?.length ? { alternateName: product.synonyms } : {}),
    ...(identifiers.length ? { identifier: identifiers.length === 1 ? identifiers[0] : identifiers } : {}),
    ...(!botanical && product.molecularFormula ? { chemicalComposition: product.molecularFormula } : {}),
    // Formula and weight belong on a MolecularEntity; additionalProperty is not
    // defined for ChemicalSubstance or Thing.
    ...(!botanical && product.molecularFormula
      ? {
          hasBioChemEntityPart: {
            "@type": "MolecularEntity",
            name: product.name,
            molecularFormula: product.molecularFormula,
            ...(product.molecularWeight ? { molecularWeight: product.molecularWeight } : {}),
            ...(pubchemUrl ? { sameAs: pubchemUrl } : {}),
          },
        }
      : {}),
    ...(!botanical && product.applications.length
      ? { potentialUse: product.applications.map((use) => ({ "@type": "DefinedTerm", name: use })) }
      : {}),
    ...(pubchemUrl ? { sameAs: [pubchemUrl] } : {}),
    subjectOf: { "@id": `${url}#webpage` },
  }

  const page = {
    "@type": "ItemPage",
    "@id": `${url}#webpage`,
    url,
    name: product.seo?.title ?? product.name,
    inLanguage: "en",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntity: { "@id": `${url}#substance` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    dateModified: siteConfig.contentUpdated,
  }

  // States who sells it to whom — true for every listed product — without a
  // price or availability (quote-only catalogue; never invented). Not attached to
  // a schema.org/Product, so Google's merchant-listing checks do not apply.
  const offer = {
    "@type": "Offer",
    "@id": `${url}#offer`,
    url,
    itemOffered: { "@id": `${url}#substance` },
    offeredBy: { "@id": `${BASE_URL}/#organization` },
    businessFunction: "http://purl.org/goodrelations/v1#Sell",
    eligibleCustomerType: "http://purl.org/goodrelations/v1#Business",
  }

  return { "@context": "https://schema.org", "@graph": [page, substance, offer] }
}

/**
 * Export service node for /export: what the company does for overseas buyers,
 * in the words used on the page. Countries are added once the owner names them.
 */
export function exportServiceSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/export#service`,
    name: "Chemical export from India",
    serviceType: "Chemical export from India",
    description,
    url: `${BASE_URL}/export`,
    provider: { "@id": `${BASE_URL}/#organization` },
    audience: { "@type": "BusinessAudience", audienceType: "Importers, distributors and manufacturers outside India" },
    category: productCategories.map((c) => c.name),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

export function collectionSchema(
  name: string,
  description: string,
  path: string,
  /** Products, or any other listed pages (guides, industries) as { name, href }. */
  items?: (Product | { name: string; href: string })[],
) {
  const url = `${BASE_URL}${path}`
  const entries = (items ?? []).map((item) => ({
    name: item.name,
    href: "href" in item ? item.href : productHref(item),
  }))
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    inLanguage: "en",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    // The page is about its topic; the company is its publisher.
    about: { "@type": "Thing", name },
    publisher: { "@id": `${BASE_URL}/#organization` },
    ...(entries.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: entries.length,
            itemListElement: entries.map((entry, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${BASE_URL}${entry.href}`,
              name: entry.name,
            })),
          },
        }
      : {}),
  }
}

/** AboutPage / ContactPage node, so the page type and its subject are explicit. */
export function webPageSchema(type: "AboutPage" | "ContactPage", page: { name: string; description: string; path: string }) {
  const url = `${BASE_URL}${page.path}`
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    name: page.name,
    description: page.description,
    url,
    inLanguage: "en",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    mainEntity: { "@id": `${BASE_URL}/#organization` },
  }
}

export const experienceLine = `${yearsOfExperience}+ years`
