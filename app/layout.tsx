import type React from "react"
import type { Metadata, Viewport } from "next"
import { Archivo, Inter, Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader, MobileQuoteBar } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JsonLd } from "@/components/json-ld"
import { BASE_URL, organizationSchema, websiteSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
})

/** Wordmark only — the nearest webfont match to the original logo lettering. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["900"],
  style: ["italic"],
  variable: "--font-archivo",
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sheetal Aromatics | Chemical & Natural Product Supplier and Exporter, India",
    template: "%s | Sheetal Aromatics",
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: BASE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Chemicals",
  formatDetection: { telephone: true, address: false, email: true },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  alternates: { canonical: BASE_URL },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#12432F" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F0D" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document as JS-capable so scroll-reveal can hide content
            safely. Without JS the class never lands and everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="pb-16 lg:pb-0">
            {children}
          </main>
          <SiteFooter />
          <MobileQuoteBar />
        </ThemeProvider>
      </body>
    </html>
  )
}
