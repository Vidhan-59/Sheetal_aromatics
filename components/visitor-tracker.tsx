"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function VisitorTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastLoggedRef = useRef<string>("")

  useEffect(() => {
    // Avoid running on local prerender passes or if path is missing
    if (!pathname) return

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
