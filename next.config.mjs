/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Lint is run separately; a lint warning should not block a deploy.
    ignoreDuringBuilds: true,
  },
  images: {
    // Product imagery is drawn as inline SVG, so the image optimiser is unused.
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,

  async redirects() {
    return [
      // The Ayurvedic herb and powder ranges are now one category with an
      // on-page group filter. Product slugs were preserved, so detail pages
      // map one-to-one.
      { source: "/products/ayurvedic-herbs", destination: "/products/ayurvedic-products", permanent: true },
      { source: "/products/ayurvedic-powders", destination: "/products/ayurvedic-products", permanent: true },
      {
        source: "/products/ayurvedic-herbs/:slug",
        destination: "/products/ayurvedic-products/:slug",
        permanent: true,
      },
      {
        source: "/products/ayurvedic-powders/:slug",
        destination: "/products/ayurvedic-products/:slug",
        permanent: true,
      },

      // Product slugs that changed when identifiers were normalised.
      {
        source: "/products/pharma-intermediates/mercapto-benzimidazole",
        destination: "/products/pharma-intermediates/2-mercapto-benzimidazole",
        permanent: true,
      },
      {
        source: "/products/pharma-intermediates/diphenyl-bromo-butyronitrile",
        destination: "/products/pharma-intermediates/2-2-diphenyl-4-bromo-butyronitrile",
        permanent: true,
      },
      {
        source: "/products/pharma-intermediates/phenyl-butyric-acid",
        destination: "/products/pharma-intermediates/2-phenyl-butyric-acid",
        permanent: true,
      },

      // Legacy/alternate paths.
      { source: "/terms-of-service", destination: "/terms-and-conditions", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/quote", destination: "/request-a-quote", permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        // The enquiry endpoint must never be cached.
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ]
  },
}

export default nextConfig
