"use client"

import Link from "next/link"
import Script from "next/script"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  analyticsEnabled,
  COOKIE_SETTINGS_EVENT,
  GA_MEASUREMENT_ID,
  readAnalyticsConsent,
  storeAnalyticsConsent,
  trackEvent,
  type AnalyticsConsent,
} from "@/lib/analytics"

/**
 * Loads GA4 only when it is configured AND the visitor has accepted analytics
 * cookies, and records the contact actions that matter for a B2B site:
 * click-to-call, email and WhatsApp. Quote submissions are tracked by the form
 * itself as `generate_lead`. Without a measurement ID nothing renders at all.
 */
export function Analytics() {
  // undefined = not read yet (server render / first paint), null = not decided.
  const [consent, setConsent] = useState<AnalyticsConsent | null | undefined>(undefined)

  useEffect(() => {
    if (!analyticsEnabled) return
    setConsent(readAnalyticsConsent())
    const reopen = () => setConsent(null)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  useEffect(() => {
    if (consent !== "granted") return
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href") ?? ""
      if (href.startsWith("tel:")) trackEvent("click_to_call", { link_url: href })
      else if (href.startsWith("mailto:")) trackEvent("email_click", { link_url: href.split("?")[0] })
      else if (href.includes("mail.google.com/mail")) trackEvent("email_click", { link_url: "gmail_compose" })
      else if (href.includes("wa.me/")) trackEvent("whatsapp_click", { link_url: href.split("?")[0] })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [consent])

  if (!analyticsEnabled) return null

  function decide(value: AnalyticsConsent) {
    storeAnalyticsConsent(value)
    setConsent(value)
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-4 bottom-[5.25rem] z-50 mx-auto max-w-xl rounded-lg border border-border bg-card p-5 shadow-lg lg:bottom-6"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            We would like to use Google Analytics cookies to see how buyers find and use this site. No advertising
            cookies, and nothing is set unless you accept.{" "}
            <Link href="/cookie-policy" className="underline underline-offset-2 hover:text-foreground">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => decide("granted")}>
              Accept analytics
            </Button>
            <Button size="sm" variant="outline" onClick={() => decide("denied")}>
              Decline
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

/** Footer link that reopens the cookie choice. Renders nothing when analytics is off. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!analyticsEnabled) return null
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}>
      Cookie settings
    </button>
  )
}
