import type { MetadataRoute } from "next"
import { BASE_URL } from "@/lib/seo"
import { productCategories, productsDatabase } from "@/lib/products-data"

/**
 * Every URL here is a real, indexable page. Filter permutations and the API
 * route are deliberately excluded — see robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/products`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/export`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE_URL}/request-a-quote`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${BASE_URL}/products/${category.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const productPages: MetadataRoute.Sitemap = productsDatabase.map((product) => ({
    url: `${BASE_URL}/products/${product.category}/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...productPages].map((entry) => ({
    ...entry,
    lastModified: now,
  }))
}
