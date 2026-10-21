/**
 * Conversion tracking. Google Analytics 4 is loaded only when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set in the environment; without it every
 * call here is a no-op, so tracking can be switched on from Vercel without a
 * code change.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ""
export const analyticsEnabled = GA_MEASUREMENT_ID.length > 0

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  gtag?.("event", name, { page_path: window.location.pathname, ...params })
}
