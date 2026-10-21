"use client"

import { useEffect, useState } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

/** The active Lenis instance, so other components can scroll through it. */
let lenis: Lenis | null = null

/** Smoothly scrolls to the top, through Lenis when it is running. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: "smooth" })
}

/**
 * Inertial smooth scrolling for wheel and trackpad, including in-page anchor
 * links (offset for the sticky header). Skipped entirely for visitors who
 * prefer reduced motion; touch devices keep native scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Same-page anchor links (e.g. "Request Product Quote" → #enquiry): glide there,
    // clear of the sticky header, instead of the browser's instant jump.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = (event.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null
      if (!link || link.target === "_blank") return
      const url = new URL(link.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return
      event.preventDefault()
      // Re-measure first: images and lazy content may have changed the page height since load.
      lenis?.resize()
      // The header offset comes from the CSS scroll-padding-top on <html>, which Lenis honours.
      lenis?.scrollTo(target)
      history.pushState(null, "", url.hash)
    }
    document.addEventListener("click", onClick)

    // Pause while a dialog or drawer has locked page scroll (Radix sets this attribute).
    const observer = new MutationObserver(() => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis?.stop()
      else lenis?.start()
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] })

    return () => {
      document.removeEventListener("click", onClick)
      observer.disconnect()
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return null
}

/** Floating "back to top" button, shown after the first screen of scrolling. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-20 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-forest-300 hover:text-primary lg:bottom-8 lg:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp aria-hidden="true" className="h-4 w-4" />
    </button>
  )
}
