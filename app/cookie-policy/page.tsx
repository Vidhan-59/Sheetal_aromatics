import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { analyticsEnabled } from "@/lib/analytics"

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: analyticsEnabled
    ? `What this website stores in your browser, including the Google Analytics cookies ${siteConfig.name} uses to measure visits.`
    : `What this website stores in your browser. ${siteConfig.name} sets no advertising or analytics cookies.`,
  path: "/cookie-policy",
})

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookie-policy"
      updated="September 2026"
      intro={
        analyticsEnabled
          ? "This site sets no advertising cookies. It uses Google Analytics to understand how visitors find and use the site, as described below."
          : "A short page, because there is not much to report: this site sets no advertising or analytics cookies."
      }
    >
      <section>
        <h2>What we store</h2>
        <p>
          The only thing this site stores in your browser is a small preference recording whether you chose the light
          or dark appearance, so the site looks the same when you return. It contains no identifier and is not shared
          with anyone.
        </p>
      </section>

      <section>
        <h2>What we do not do</h2>
        <ul>
          <li>No advertising or retargeting cookies.</li>
          <li>No cross-site tracking or profiling.</li>
          <li>No selling or sharing of browsing data.</li>
        </ul>
        {!analyticsEnabled && (
          <p>
            Because nothing here requires consent, this site does not interrupt you with a cookie banner.
          </p>
        )}
      </section>

      {analyticsEnabled && (
        <section>
          <h2>Analytics</h2>
          <p>
            We use Google Analytics to count visits and see which pages and enquiry options are used, so we can
            improve the site. Google Analytics sets first-party cookies (named _ga and _ga_*) that last up to two
            years. The data is aggregated and is not used for advertising. You can block these cookies in your browser
            settings or with the Google Analytics opt-out browser add-on.
          </p>
        </section>
      )}

      <section>
        <h2>Third-party content</h2>
        <p>
          The contact page embeds a Google Maps frame. If you load that page, Google may set its own cookies through
          that frame under its own policies. The rest of the site loads no third-party embeds. Web fonts are served
          from this site&apos;s own domain rather than from a font provider.
        </p>
      </section>

      <section>
        <h2>Clearing it</h2>
        <p>
          You can clear site data for this domain at any time through your browser settings. The site will continue to
          work; it will simply forget your appearance preference.
        </p>
      </section>
    </LegalPage>
  )
}
