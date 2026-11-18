import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This project sits several folders deep inside a OneDrive tree, so Next's
  // workspace-root inference is ambiguous. Pinning it keeps serverless file
  // tracing correct on Vercel.
  outputFileTracingRoot: projectRoot,

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
      // The three Shilajit grade pages (3/5/7% fulvic acid) were merged into one page listing all grades.
      ...["3", "5", "7"].map((grade) => ({
        source: `/products/ayurvedic-products/shilajit-powder-${grade}`,
        destination: "/products/ayurvedic-products/shilajit-powder",
        permanent: true,
      })),
      // Spelling corrected from "Benhydryl".
      {
        source: "/products/pharma-intermediates/benhydryl-thioacetamide",
        destination: "/products/pharma-intermediates/benzhydryl-thioacetamide",
        permanent: true,
      },

      // Legacy/alternate paths.
      { source: "/terms-of-service", destination: "/terms-and-conditions", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/quote", destination: "/request-a-quote", permanent: true },
    ]
  },

  async rewrites() {
    // iOS and some crawlers request these fixed paths regardless of the <link rel="apple-touch-icon">
    // tag. Served in place (not redirected) because not every client follows a redirect for icons.
    return [
      { source: "/apple-touch-icon.png", destination: "/apple-icon.png" },
      { source: "/apple-touch-icon-precomposed.png", destination: "/apple-icon.png" },
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
          // Report-only first: browsers log violations without blocking anything. Switch the key to
          // Content-Security-Policy once the console stays clean. 'unsafe-inline' is needed for the
          // inline scripts Next.js uses to stream page data.
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.clarity.ms",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com",
              "font-src 'self'",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com",
              "frame-src https://www.google.com https://maps.google.com",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              // (upgrade-insecure-requests is omitted: browsers ignore it in report-only mode and log an error.)
            ].join("; "),
          },
        ],
      },
      {
        source: "/:dir(images|media|logo)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" }],
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
