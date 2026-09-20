"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/brand/logo"
import { ProductQuickSearch } from "@/components/product-quick-search"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { countByCategory, productCategories } from "@/lib/products-data"

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products", hasMenu: true },
  { href: "/export", label: "Export" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setProductsOpen(false)
  }, [pathname])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setProductsOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      {/* Utility bar */}
      <div className="hidden border-b border-border bg-forest-900 text-forest-100 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 text-[13px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.contact.phonePrimary.e164}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5 text-brass-400" />
              {siteConfig.contact.phonePrimary.display}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail aria-hidden="true" className="h-3.5 w-3.5 text-brass-400" />
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-forest-100/75">
              Established {siteConfig.establishedYear} · Ahmedabad, India · Export &amp; domestic supply
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:gap-8 lg:px-8 lg:py-4">
        <Logo size="md" showTagline={false} className="shrink-0" />

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            item.hasMenu ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <Link
                  href={item.href}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  onFocus={() => setProductsOpen(true)}
                  className={cn(
                    "inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("h-3.5 w-3.5 transition-transform duration-200", productsOpen && "rotate-180")}
                  />
                </Link>

                {productsOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-[46rem] -translate-x-1/2 pt-2">
                    <div className="overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {productCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/products/${category.slug}`}
                            className="group rounded-md p-3 transition-colors hover:bg-secondary"
                          >
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                                {category.name}
                              </span>
                              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                                {countByCategory(category.slug)}
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{category.tagline}</p>
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-border bg-muted px-5 py-3">
                        <p className="text-xs text-muted-foreground">
                          Specifications, packing and documentation are confirmed per enquiry.
                        </p>
                        <Link href="/products" className="link-underline text-sm">
                          All products
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
                  isActive(item.href) ? "text-primary" : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <ProductQuickSearch className="hidden w-64 xl:block" />

        <Button asChild size="default" className="hidden lg:inline-flex">
          <Link href="/request-a-quote">Request a Quote</Link>
        </Button>

        {/* Mobile */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-sm">
              <SheetHeader className="border-b border-border px-5 py-4 text-left">
                <SheetTitle className="text-base">Menu</SheetTitle>
              </SheetHeader>

              <div className="px-5 py-5">
                <ProductQuickSearch />
              </div>

              <nav aria-label="Mobile" className="px-5 pb-4">
                <ul className="space-y-1">
                  {primaryNav
                    .filter((i) => !i.hasMenu)
                    .map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                            isActive(item.href) ? "bg-secondary text-primary" : "hover:bg-secondary",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </ul>

                <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Products
                </p>
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link href="/products" className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-secondary">
                      All Products
                    </Link>
                  </li>
                  {productCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/products/${category.slug}`}
                        className="flex items-center justify-between rounded-md px-3 py-2.5 text-base hover:bg-secondary"
                      >
                        {category.name}
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {countByCategory(category.slug)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-3 border-t border-border px-5 py-5">
                <Button asChild className="w-full" size="lg">
                  <Link href="/request-a-quote">Request a Quote</Link>
                </Button>
                <a
                  href={`tel:${siteConfig.contact.phonePrimary.e164}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-accent" />
                  {siteConfig.contact.phonePrimary.display}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 break-all text-sm text-muted-foreground"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-accent" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

/** Sticky enquiry bar shown on small screens only. */
export function MobileQuoteBar() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-2.5 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <Button asChild className="flex-1" size="default">
          <Link href="/request-a-quote">Request a Quote</Link>
        </Button>
        <Button asChild variant="outline" size="icon" aria-label="Call Sheetal Aromatics">
          <a href={`tel:${siteConfig.contact.phonePrimary.e164}`}>
            <Phone className="h-4 w-4" />
          </a>
        </Button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide enquiry bar"
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
