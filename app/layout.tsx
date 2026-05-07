import type React from "react"
import type { Metadata } from "next"
import { Lora, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { generateOrganizationStructuredData } from "@/components/seo-metadata"

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Sheetal Aromatics - Leaders in Aromatic Chemicals & Essential Oils Since 2005",
    template: "%s | Sheetal Aromatics",
  },
  description:
    "Trusted supplier of aromatic chemicals, essential oils, ayurvedic herbs, and pharma intermediates. Export quality products since 2005. Professional chemical solutions for global markets with 20+ years experience.",
  keywords: [
    "aromatic chemicals",
    "essential oils",
    "ayurvedic herbs",
    "pharma intermediates",
    "export quality",
    "Sheetal Aromatics",
    "chemical suppliers",
    "B2B chemicals",
    "pharmaceutical ingredients",
    "benzyl acetate",
    "benzyl alcohol",
    "lemongrass oil",
    "eucalyptus oil",
    "ashwagandha",
    "turmeric powder",
    "selenium metal",
    "citric acid",
    "menthol crystals",
    "chemical manufacturer India",
    "export chemicals",
    "pharmaceutical raw materials",
  ].join(", "),
  authors: [{ name: "Sheetal Aromatics", url: "https://sheetalaromatics.com" }],
  creator: "Sheetal Aromatics",
  publisher: "Sheetal Aromatics",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Sheetal Aromatics - Premium Chemical & Herbal Products Since 2005",
    description:
      "Leading supplier of aromatic chemicals and essential oils since 2005. Quality assured products for global export with 20+ years expertise.",
    type: "website",
    locale: "en_US",
    url: "https://sheetalaromatics.com",
    siteName: "Sheetal Aromatics",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sheetal Aromatics - Chemical and Herbal Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheetal Aromatics - Premium Chemical & Herbal Products",
    description:
      "Leading supplier of aromatic chemicals and essential oils since 2005. Quality assured products for global export.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://sheetalaromatics.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationData = generateOrganizationStructuredData()

  return (
    <html lang="en" className={`${lora.variable} ${inter.variable} bg-background`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2d5a48" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
