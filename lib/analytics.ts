/**
 * Conversion tracking. Google Analytics 4 is loaded only after the visitor has
 * accepted analytics cookies; until then every call here is a no-op.
 *
 * The measurement ID is the company's GA4 web stream ("Sheetal Aromatics
 * website"). It is public by design (it appears in every page that loads GA),
 * so it is the default here; NEXT_PUBLIC_GA_MEASUREMENT_ID (or NEXT_PUBLIC_GA_ID)
 * in Vercel overrides it, and setting either to "off" disables analytics.
 */

const DEFAULT_GA_MEASUREMENT_ID = "G-Y9H1FPN5JL"
const configuredId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? process.env.NEXT_PUBLIC_GA_ID
export const GA_MEASUREMENT_ID = configuredId === "off" ? "" : configuredId || DEFAULT_GA_MEASUREMENT_ID

/**
 * Microsoft Clarity (heatmaps and session recordings), project "Sheetal
 * Aromatics". Loaded behind the same consent as GA4. Clarity masks form input
 * by default; keep masking on "Balanced" or "Strict" in Clarity's settings.
 * NEXT_PUBLIC_CLARITY_PROJECT_ID overrides it; "off" disables Clarity.
 */
const DEFAULT_CLARITY_PROJECT_ID = "zenhxzyfy8"
const configuredClarity = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
export const CLARITY_PROJECT_ID =
  configuredClarity === "off" ? "" : configuredClarity || DEFAULT_CLARITY_PROJECT_ID

export const gaEnabled = GA_MEASUREMENT_ID.length > 0
export const clarityEnabled = CLARITY_PROJECT_ID.length > 0
/** True when any consent-gated analytics tool is configured (shows the cookie banner). */
export const analyticsEnabled = gaEnabled || clarityEnabled

/** Human-readable list for policy copy, e.g. "Google Analytics and Microsoft Clarity". */
export const analyticsToolNames = [gaEnabled && "Google Analytics", clarityEnabled && "Microsoft Clarity"]
  .filter(Boolean)
  .join(" and ")

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
  if (value === "denied") {
    // Withdrawing consent after the tools have loaded: stop further collection and clear their cookies.
    if (GA_MEASUREMENT_ID) {
      ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true
    }
    const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void }).clarity
    clarity?.("consent", false)
    const domain = window.location.hostname.replace(/^www\./, "")
    for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
      if (name === "_ga" || name.startsWith("_ga_") || name === "_clck" || name === "_clsk") {
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
