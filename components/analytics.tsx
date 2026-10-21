"use client"

import Script from "next/script"
import { useEffect } from "react"

import { analyticsEnabled, GA_MEASUREMENT_ID, trackEvent } from "@/lib/analytics"

/**
 * Loads GA4 (only when configured) and records the contact actions that matter
 * for a B2B site: click-to-call, email and WhatsApp. Quote submissions are
 * tracked by the form itself as `generate_lead`.
 */
export function Analytics() {
  useEffect(() => {
    if (!analyticsEnabled) return
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href") ?? ""
      if (href.startsWith("tel:")) trackEvent("click_to_call", { link_url: href })
      else if (href.startsWith("mailto:")) trackEvent("email_click", { link_url: href.split("?")[0] })
      else if (href.includes("wa.me/")) trackEvent("whatsapp_click", { link_url: href.split("?")[0] })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  if (!analyticsEnabled) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  )
}
