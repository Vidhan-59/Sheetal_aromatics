/**
 * Site navigation, built from the catalogue so menus stay in step with the
 * data: a new category, industry or guide appears in the header automatically.
 * Used by the desktop mega menus and the mobile drawer.
 */

import { countByCategory, getProductBySlug, productCategories, productHref, productsDatabase } from "@/lib/products-data"
import { industries, industryHref } from "@/lib/industries"
import { guides } from "@/lib/guides"

export interface NavItem {
  label: string
  href: string
  description?: string
  /** Short right-aligned detail, e.g. a product count or CAS number. */
  meta?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export interface NavMenu {
  id: string
  label: string
  /** Overview page for the whole menu. */
  href: string
  overview: { label: string; description: string }
  /** Main column(s) — rendered as a two-column grid. */
  primary: NavSection
  /** Optional narrow side column. */
  secondary?: NavSection
  /** Show the company's phone, email and hours in the side column. */
  showContact?: boolean
}

/** Frequently requested products, featured in the Products menu. */
const popularProducts = [
  "benzyl-alcohol",
  "sodium-benzoate",
  "benzyl-triethyl-ammonium-chloride",
  "tetrabutyl-ammonium-bromide",
  "sorbitol-70-solution",
  "menthol",
]

export const navMenus: NavMenu[] = [
  {
    id: "products",
    label: "Products",
    href: "/products",
    overview: {
      label: `All ${productsDatabase.length} products`,
      description: "Search by product name, CAS number or application.",
    },
    primary: {
      title: "Product categories",
      items: productCategories.map((category) => ({
        label: category.name,
        href: `/products/${category.slug}`,
        description: category.tagline,
        meta: String(countByCategory(category.slug)),
      })),
    },
    secondary: {
      title: "Popular products",
      items: popularProducts
        .map(getProductBySlug)
        .filter((p) => p !== undefined)
        .map((product) => ({
          label: product.name,
          href: productHref(product),
          meta: product.casNumber ? `CAS ${product.casNumber}` : undefined,
        })),
    },
  },
  {
    id: "industries",
    label: "Industries",
    href: "/industries",
    overview: {
      label: "All industries",
      description: "Materials grouped by the industries that use them.",
    },
    primary: {
      title: "Industries we supply",
      items: industries.map((industry) => ({
        label: industry.name,
        href: industryHref(industry),
        description: industry.summary,
      })),
    },
  },
  {
    id: "resources",
    label: "Resources",
    href: "/guides",
    overview: {
      label: "All buyer guides",
      description: "Practical reading for procurement and technical teams.",
    },
    primary: {
      title: "Buyer guides",
      items: guides.map((guide) => ({
        label: guide.title,
        href: `/guides/${guide.slug}`,
        meta: `${guide.readingMinutes} min`,
      })),
    },
    secondary: {
      title: "Help",
      items: [
        { label: "Buyer FAQs", href: "/faq", description: "Grades, documents, packing and export" },
        { label: "Request a Quote", href: "/request-a-quote", description: "Send your specification" },
      ],
    },
  },
  {
    id: "company",
    label: "Company",
    href: "/about",
    showContact: true,
    overview: {
      label: "About Sheetal Aromatics",
      description: "A partnership firm in Ahmedabad, established 2005.",
    },
    primary: {
      title: "Company",
      items: [
        { label: "About Us", href: "/about", description: "Our history, principles and partners" },
        { label: "Global Supply & Export", href: "/export", description: "How we handle international orders" },
        { label: "Contact & Location", href: "/contact", description: "Office, phone, WhatsApp and map" },
      ],
    },
  },
]

/** Top-level links with no menu. */
export const navLinks: NavItem[] = [{ label: "Contact", href: "/contact" }]
