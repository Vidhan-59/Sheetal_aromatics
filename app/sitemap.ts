import type { MetadataRoute } from "next"
import { productsDatabase } from "@/lib/products-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sheetalaromatics.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  // Product category pages
  const categories = [
    "aromatic-chemicals",
    "essential-oils",
    "ayurvedic-herbs",
    "ayurvedic-powders",
    "metals",
    "pharma-intermediates",
  ]

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Individual product pages (if you have them)
  const productPages = productsDatabase.map((product) => ({
    url: `${baseUrl}/products/${product.category.toLowerCase().replace(/\s+/g, "-")}/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
