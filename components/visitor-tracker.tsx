"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Optional first-party page-view log (POST /api/log-visit). Off unless
 * NEXT_PUBLIC_VISIT_LOGGING is "true": the log route writes to local disk,
 * which works on a VPS or in development but not on Vercel's read-only
 * filesystem, where every beacon would only start a failing function.
 */
const visitLoggingEnabled = process.env.NEXT_PUBLIC_VISIT_LOGGING === "true"

export function VisitorTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastLoggedRef = useRef<string>("")

  useEffect(() => {
    // Avoid running on local prerender passes or if path is missing
    if (!visitLoggingEnabled || !pathname) return

    const fullPath = searchParams && searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname

    // Avoid duplicate logging of the same route if state re-renders
    if (lastLoggedRef.current === fullPath) return
    lastLoggedRef.current = fullPath

    try {
      const payload = JSON.stringify({
        path: fullPath,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      })

      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon("/api/log-visit", new Blob([payload], { type: "application/json" }))
      } else {
        fetch("/api/log-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // Non-intrusive: silent failure so visitor experience is never impacted
    }
  }, [pathname, searchParams])

  return null
}
