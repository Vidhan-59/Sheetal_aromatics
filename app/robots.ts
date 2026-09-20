import type { MetadataRoute } from "next"
import { BASE_URL } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /products carries client-side filter state in the query string.
        // Blocking the parameterised form keeps one canonical catalogue URL.
        disallow: ["/api/", "/products?*"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
