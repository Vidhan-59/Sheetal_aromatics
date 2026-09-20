import type { Metadata } from "next"
import {
  siteConfig,
  streetAddress,
  geo,
  mapsLink,
  yearsOfExperience,
} from "@/lib/site-config"
import {
  categoryName,
  productCategories,
  type Product,
} from "@/lib/products-data"

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
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  index = true,
  ogImage: ogImageInput,
}: PageMetaInput): Metadata {
  const url = `${BASE_URL}${path === "/" ? "" : path}`
  const ogImage = ogImageInput ?? `${BASE_URL}/opengraph-image`

  // Titles that already name the company are marked absolute, otherwise the
  // root template appends the brand a second time.
  const resolvedTitle = title.includes(siteConfig.name) ? { absolute: title } : title

  return {
    title: resolvedTitle,
    description,
    keywords,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_IN",
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
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
  hasMap: mapsLink,
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
    areaServed: "Worldwide",
    availableLanguage: ["en", "hi", "gu"],
  },
  {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phoneSecondary.e164,
    email: siteConfig.contact.email,
    contactType: "sales",
    areaServed: "Worldwide",
    availableLanguage: ["en", "hi", "gu"],
  },
]

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
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo/sheetal-aromatics-logo.svg`,
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
    hasMap: mapsLink,
    knowsAbout: productCategories.map((c) => c.name),
    identifier: siteConfig.registrations.map((r) => ({
      "@type": "PropertyValue",
      name: r.label.replace(/\.$/, ""),
      value: r.value,
    })),
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
 * Product schema. Deliberately omits `offers`, `sku`, `aggregateRating` and
 * `review` — none of that information is available, and Google treats invented
 * values as spam. Verified chemical identifiers are emitted as
 * `additionalProperty` entries.
 */
export function productSchema(product: Product) {
  const properties = [
    product.casNumber && { name: "CAS Number", value: product.casNumber },
    product.molecularFormula && { name: "Molecular Formula", value: product.molecularFormula },
    product.molecularWeight && { name: "Molecular Weight", value: product.molecularWeight },
    product.physicalForm && { name: "Physical Form", value: product.physicalForm },
    product.appearance && { name: "Appearance", value: product.appearance },
  ].filter(Boolean) as { name: string; value: string }[]

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/products/${product.category}/${product.slug}#product`,
    name: product.name,
    description: product.summary,
    category: categoryName(product.category),
    url: `${BASE_URL}/products/${product.category}/${product.slug}`,
    ...(product.synonyms?.length ? { alternateName: product.synonyms } : {}),
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@id": `${BASE_URL}/#organization` },
    additionalProperty: properties.map((p) => ({
      "@type": "PropertyValue",
      name: p.name,
      value: p.value,
    })),
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

export function collectionSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${BASE_URL}${path}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
  }
}

export const experienceLine = `${yearsOfExperience}+ years`
