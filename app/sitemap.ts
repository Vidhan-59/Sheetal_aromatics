import type { MetadataRoute } from "next"
import { BASE_URL, productImageUrl } from "@/lib/seo"
import { productCategories, productsDatabase } from "@/lib/products-data"
import { industries } from "@/lib/industries"
import { guides } from "@/lib/guides"
import { siteConfig } from "@/lib/site-config"

/**
 * Every URL here is a real, indexable page. Filter permutations and the API
 * route are deliberately excluded — see robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // A real content date rather than the build time: Google ignores lastmod values that change on every deploy.
  const updated = new Date(siteConfig.contentUpdated)
  const legalUpdated = new Date("2026-11-12")

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL },
    { url: `${BASE_URL}/products` },
    { url: `${BASE_URL}/about` },
    { url: `${BASE_URL}/export` },
    { url: `${BASE_URL}/chemical-supplier-ahmedabad-gujarat` },
    { url: `${BASE_URL}/private-label` },
    { url: `${BASE_URL}/request-a-quote` },
    { url: `${BASE_URL}/contact` },
    { url: `${BASE_URL}/faq` },
    { url: `${BASE_URL}/industries` },
    { url: `${BASE_URL}/guides` },
    // Legal pages were last revised with the analytics-consent update.
    { url: `${BASE_URL}/privacy-policy`, lastModified: legalUpdated },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: legalUpdated },
    { url: `${BASE_URL}/cookie-policy`, lastModified: legalUpdated },
    { url: `${BASE_URL}/website-security`, lastModified: legalUpdated },
  ]

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${BASE_URL}/products/${category.slug}`,
  }))

  const productPages: MetadataRoute.Sitemap = productsDatabase.map((product) => {
    const image = productImageUrl(product)
    return {
      url: `${BASE_URL}/products/${product.category}/${product.slug}`,
      // Image sitemap entry, so product photos and structures are discoverable in Google Images.
      ...(image ? { images: [image] } : {}),
    }
  })

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
  }))

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.dateModified),
  }))

  return [...staticPages, ...categoryPages, ...industryPages, ...productPages, ...guidePages].map((entry) => ({
    lastModified: updated,
    ...entry,
  }))
}
