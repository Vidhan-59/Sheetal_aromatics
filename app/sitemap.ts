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

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/products`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/export`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE_URL}/request-a-quote`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/industries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${BASE_URL}/products/${category.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const productPages: MetadataRoute.Sitemap = productsDatabase.map((product) => {
    const image = productImageUrl(product)
    return {
      url: `${BASE_URL}/products/${product.category}/${product.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      // Image sitemap entry, so product photos and structures are discoverable in Google Images.
      ...(image ? { images: [image] } : {}),
    }
  })

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
    lastModified: new Date(guide.dateModified),
  }))

  return [...staticPages, ...categoryPages, ...industryPages, ...productPages, ...guidePages].map((entry) => ({
    lastModified: updated,
    ...entry,
  }))
}
