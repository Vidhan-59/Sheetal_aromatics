import type { Metadata } from "next"

interface SEOMetadataProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  structuredData?: object
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage = "/og-image.jpg",
}: SEOMetadataProps): Metadata {
  const baseUrl = "https://sheetalaromatics.com"
  const fullTitle = title.includes("Sheetal Aromatics") ? title : `${title} | Sheetal Aromatics`

  return {
    title: fullTitle,
    description,
    keywords:
      keywords ||
      "aromatic chemicals, essential oils, ayurvedic herbs, pharmaceutical intermediates, chemical suppliers",
    authors: [{ name: "Sheetal Aromatics" }],
    creator: "Sheetal Aromatics",
    publisher: "Sheetal Aromatics",
    robots: "index, follow",
    canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      locale: "en_US",
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: "Sheetal Aromatics",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : baseUrl,
    },
  }
}

export function generateProductStructuredData(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Sheetal Aromatics",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sheetal Aromatics",
      url: "https://sheetalaromatics.com",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "Sheetal Aromatics",
      },
    },
    additionalProperty: [
      ...(product.casNumber
        ? [
            {
              "@type": "PropertyValue",
              name: "CAS Number",
              value: product.casNumber,
            },
          ]
        : []),
      ...(product.molecularFormula
        ? [
            {
              "@type": "PropertyValue",
              name: "Molecular Formula",
              value: product.molecularFormula,
            },
          ]
        : []),
      ...(product.purity
        ? [
            {
              "@type": "PropertyValue",
              name: "Purity",
              value: product.purity,
            },
          ]
        : []),
    ],
  }
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sheetal Aromatics",
    url: "https://sheetalaromatics.com",
    logo: "https://sheetalaromatics.com/logo.png",
    description:
      "Leading supplier of aromatic chemicals, essential oils, ayurvedic herbs, and pharmaceutical intermediates since 2005",
    foundingDate: "2005",
    founder: [
      {
        "@type": "Person",
        name: "Shailesh Shah",
      },
      {
        "@type": "Person",
        name: "Vidhan Shah",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9824169906",
      contactType: "customer service",
      email: "sheetalaromatics@gmail.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: ["https://sheetalaromatics.com"],
  }
}
