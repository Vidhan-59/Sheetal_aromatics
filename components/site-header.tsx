"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, ChevronDown, Clock, Mail, Menu, Phone, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/brand/logo"
import { ProductQuickSearch } from "@/components/product-quick-search"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { navLinks, navMenus, type NavItem, type NavMenu } from "@/lib/navigation"

/** A menu counts as active when the current page is its overview or one of its links. */
function menuIsActive(menu: NavMenu, pathname: string) {
  const hrefs = [menu.href, ...menu.primary.items.map((i) => i.href), ...(menu.secondary?.items ?? []).map((i) => i.href)]
  return hrefs.some((href) => pathname === href || pathname.startsWith(`${href}/`))
}

export function SiteHeader() {
  const pathname = usePathname()
  const [openId, setOpenId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setOpenId(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null)
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenId(null)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [])

  // Condensed header and reading-progress line, updated at most once per frame.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const openMenu = (id: string) => {
    window.clearTimeout(closeTimer.current)
    setOpenId(id)
  }
  // A short delay stops the menu closing when the pointer briefly leaves it.
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenId(null), 160)
  }

  const linkActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border/70 bg-background/80 shadow-[0_10px_30px_-18px_rgb(10_36_26_/_0.35)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85",
      )}
    >
      {/* Utility bar — folds away once the page is scrolled */}
      <div
        className={cn(
          "hidden transition-[grid-template-rows] duration-300 ease-out lg:grid",
          scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-b border-border bg-forest-900 text-forest-100">
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
                  Established {siteConfig.establishedYear} · Ahmedabad, India · Manufacturing, Export &amp; Supply
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "relative mx-auto flex max-w-7xl items-center gap-4 px-4 transition-[padding] duration-300 sm:px-6 lg:gap-6 lg:px-8",
          scrolled ? "py-2.5 lg:py-3" : "py-3 lg:py-4",
        )}
      >
        <Logo size="md" showTagline={false} className="shrink-0" />

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-0.5 lg:flex"
          onMouseLeave={scheduleClose}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenId(null)
          }}
        >
          {navMenus.map((menu) => {
            const open = openId === menu.id
            return (
              <div key={menu.id} onMouseEnter={() => openMenu(menu.id)}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`nav-panel-${menu.id}`}
                  onClick={() => setOpenId(open ? null : menu.id)}
                  className={cn(
                    "relative inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors duration-200",
                    open ? "bg-secondary text-foreground" : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                    menuIsActive(menu, pathname) && "text-primary",
                  )}
                >
                  {menu.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
                  />
                  {menuIsActive(menu, pathname) && (
                    <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent" />
                  )}
                </button>
                <MenuPanel menu={menu} open={open} />
              </div>
            )
          })}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={linkActive(link.href) ? "page" : undefined}
              onMouseEnter={scheduleClose}
              className={cn(
                "relative inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors duration-200",
                linkActive(link.href) ? "text-primary" : "text-foreground/80 hover:bg-secondary hover:text-foreground",
              )}
            >
              {link.label}
              {linkActive(link.href) && (
                <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <ProductQuickSearch className="hidden w-56 xl:block" />

        <Button asChild className="hidden shadow-sm transition-shadow hover:shadow-md lg:inline-flex">
          <Link href="/request-a-quote">Request a Quote</Link>
        </Button>

        {/* Mobile */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" data-lenis-prevent className="flex w-full flex-col overflow-y-auto p-0 sm:max-w-sm">
              <SheetHeader className="border-b border-border px-5 py-4 text-left">
                <SheetTitle className="text-base">Menu</SheetTitle>
              </SheetHeader>

              <div className="px-5 pt-5">
                <ProductQuickSearch />
              </div>

              <nav aria-label="Mobile" className="flex-1 px-3 py-4">
                <ul className="space-y-1">
                  <li>
                    <MobileLink href="/" label="Home" active={pathname === "/"} />
                  </li>
                  {navMenus.map((menu) => (
                    <li key={menu.id}>
                      <MobileSection menu={menu} pathname={pathname} />
                    </li>
                  ))}
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <MobileLink href={link.href} label={link.label} active={linkActive(link.href)} />
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

      {/* Reading progress, along the header's bottom edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full origin-left bg-gradient-to-r from-forest-500 via-brass-500 to-brass-400 will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </header>
  )
}

/* ------------------------------ Desktop panel ------------------------------ */

function MenuPanel({ menu, open }: { menu: NavMenu; open: boolean }) {
  return (
    <div
      id={`nav-panel-${menu.id}`}
      className={cn(
        "absolute inset-x-4 top-full z-50 pt-2 transition-[opacity,transform,visibility] duration-200 ease-out sm:inset-x-6 lg:inset-x-8",
        open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1.5 opacity-0",
      )}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-popover shadow-[0_24px_60px_-24px_rgb(10_36_26_/_0.45)]">
        <div className="grid grid-cols-[1fr_19rem]">
          <div className="p-4">
            <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {menu.primary.title}
            </p>
            <ul className={cn("grid gap-1", menu.primary.items.length > 3 ? "grid-cols-2" : "grid-cols-1")}>
              {menu.primary.items.map((item, i) => (
                <li
                  key={item.href}
                  className={cn("transition-[opacity,transform] duration-300 ease-out", open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}
                  style={{ transitionDelay: open ? `${Math.min(i, 8) * 18}ms` : "0ms" }}
                >
                  <PanelLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col border-l border-border bg-muted p-5">
            {menu.secondary && (
              <div className="mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {menu.secondary.title}
                </p>
                <ul className="mt-3 space-y-0.5">
                  {menu.secondary.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-baseline justify-between gap-3 rounded-md px-2 py-1.5 -mx-2 text-sm transition-colors hover:bg-background"
                      >
                        <span className="font-medium text-foreground group-hover:text-primary">{item.label}</span>
                        {item.meta && (
                          <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-muted-foreground">{item.meta}</span>
                        )}
                      </Link>
                      {item.description && (
                        <p className="-mt-0.5 mb-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {menu.showContact && (
              <div className="mb-5 space-y-2.5 text-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Talk to us</p>
                <a href={`tel:${siteConfig.contact.phonePrimary.e164}`} className="flex items-center gap-2 hover:text-primary">
                  <Phone aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                  {siteConfig.contact.phonePrimary.display}
                </a>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 break-all hover:text-primary">
                  <Mail aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                  {siteConfig.contact.email}
                </a>
                <p className="flex items-start gap-2 text-muted-foreground">
                  <Clock aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  {siteConfig.businessHours.summary}
                </p>
              </div>
            )}

            <Link
              href={menu.href}
              className="group mt-auto block rounded-lg border border-border bg-background p-4 pt-3.5 transition-[border-color,box-shadow] duration-200 hover:border-forest-300 hover:shadow-sm"
            >
              <span className="flex items-center justify-between gap-2 text-sm font-semibold text-primary">
                {menu.overview.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{menu.overview.description}</span>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}

function PanelLink({ item }: { item: NavItem }) {
  return (
    <Link href={item.href} className="group block rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-secondary">
      <span className="flex items-baseline justify-between gap-3">
        <span className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
          {item.label}
        </span>
        {item.meta && <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{item.meta}</span>}
      </span>
      {item.description && (
        <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.description}</span>
      )}
    </Link>
  )
}

/* ------------------------------- Mobile drawer ----------------------------- */

function MobileLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-md px-3 py-2.5 text-base font-medium transition-colors",
        active ? "bg-secondary text-primary" : "hover:bg-secondary",
      )}
    >
      {label}
    </Link>
  )
}

function MobileSection({ menu, pathname }: { menu: NavMenu; pathname: string }) {
  const active = menuIsActive(menu, pathname)
  const [expanded, setExpanded] = useState(active)
  const items = [...menu.primary.items, ...(menu.secondary?.items ?? []).filter((i) => !menu.primary.items.some((p) => p.href === i.href))]

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-base font-medium transition-colors hover:bg-secondary",
          active && "text-primary",
        )}
      >
        {menu.label}
        <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")} />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ul className="mb-2 ml-3 space-y-0.5 border-l border-border pl-3 pt-1">
            <li>
              <Link href={menu.href} className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary">
                {menu.overview.label}
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </li>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={expanded ? undefined : -1}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary",
                    pathname === item.href ? "bg-secondary text-primary" : "text-foreground/85",
                  )}
                >
                  <span className="line-clamp-1">{item.label}</span>
                  {item.meta && !item.meta.startsWith("CAS") && (
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{item.meta}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/** Sticky enquiry bar shown on small screens only. */
export function MobileQuoteBar() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 py-2.5 backdrop-blur-xl lg:hidden">
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
