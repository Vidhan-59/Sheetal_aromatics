/**
 * Conversion tracking. Google Analytics 4 is loaded only when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set in the environment AND the visitor has
 * accepted analytics cookies; otherwise every call here is a no-op, so tracking
 * can be switched on from Vercel without a code change.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ""
export const analyticsEnabled = GA_MEASUREMENT_ID.length > 0

export type AnalyticsConsent = "granted" | "denied"

const CONSENT_KEY = "sa-analytics-consent"
/** Dispatched on window to reopen the cookie choice (footer "Cookie settings"). */
export const COOKIE_SETTINGS_EVENT = "sa:cookie-settings"

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY)
    return value === "granted" || value === "denied" ? value : null
  } catch {
    return null
  }
}

export function storeAnalyticsConsent(value: AnalyticsConsent): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Storage blocked (private mode): the choice simply lasts for this page view.
  }
  if (value === "denied" && GA_MEASUREMENT_ID) {
    // Withdrawing consent after GA has loaded: stop further hits and clear its cookies.
    ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true
    const domain = window.location.hostname.replace(/^www\./, "")
    for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
      if (name === "_ga" || name.startsWith("_ga_")) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`
        document.cookie = `${name}=; Max-Age=0; path=/`
      }
    }
  }
}

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  gtag?.("event", name, { page_path: window.location.pathname, ...params })
}
