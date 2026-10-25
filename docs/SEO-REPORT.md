# SEO audit & implementation report — Sheetal Aromatics

Date: 21 October 2026 · Stack: Next.js 15 (App Router, static generation) on Vercel

---

## 1. Issues found in the original site

| Priority | Issue | Impact |
| --- | --- | --- |
| **Critical** | Live site serves on `www.sheetalaromatics.com` and redirects the bare domain to it, but every canonical tag, the sitemap, robots.txt and all structured data pointed to `https://sheetalaromatics.com` (no www). | Every canonical URL pointed at a redirect — conflicting signals that slow or prevent indexing of the preferred URLs. |
| High | Root layout set `canonical` to the homepage for every route. Any page without its own canonical would be declared a duplicate of the homepage. | Latent duplicate-content risk. |
| High | No Google Search Console / Bing verification, no analytics, no conversion tracking. | No way to measure impressions, queries or leads. |
| High | Homepage H1 ("Chemical, aromatic and natural product manufacturing & global supply") and title carried none of the terms buyers search (aromatic chemicals, supplier, Ahmedabad). | Weak relevance for the core local and commercial queries. |
| High | No industry, application or buyer-guide content; products only reachable through categories. | Few entry points for informational and industry-led searches; thin internal linking. |
| Medium | Food / pharma raw materials named as priorities (sodium benzoate, potassium sorbate, calcium propionate, sorbitol 70%) had no pages. | Missed high-intent product searches. |
| Medium | Sitemap `lastmod` was the build time on every deploy. | Google ignores lastmod that changes on every build. |
| Medium | No LocalBusiness markup despite a verified address, phone, hours and map pin. | Weaker local-pack signals for Ahmedabad / Gujarat. |
| Medium | Organization logo was SVG. | Google's logo guidelines want a crawlable raster image. |
| Low | Generic product title template (`X Supplier & Exporter`) with no location. | Lower relevance for "X supplier in Ahmedabad" queries. |
| Note | `lib/logger.ts` writes enquiry/visitor logs to `logs/` on disk. Vercel's filesystem is read-only, so **in production these logs are silently not written** (the code catches the error). Emails still send. | Lead records exist only in email in production. |

Already in good shape (kept): one H1 per page, unique titles, per-page canonicals via `pageMetadata()`, breadcrumbs + BreadcrumbList, Product / FAQPage / CollectionPage schema, image sitemap, per-product share cards, 404 handling, legacy redirects, mobile layout, static rendering (fully crawlable HTML).

---

## 2. Files created or modified

**Created**
- `lib/industries.ts` — 7 industries, product mapping, cross-links
- `lib/guides.ts` — 4 buyer guides
- `lib/analytics.ts`, `components/analytics.tsx` — optional GA4 + conversion events
- `app/industries/page.tsx`, `app/industries/[slug]/page.tsx`
- `app/guides/page.tsx`, `app/guides/[slug]/page.tsx`
- `public/images/structures/{sodium-benzoate,potassium-sorbate,calcium-propionate,sorbitol-70-solution}.svg`
- `docs/SEO-REPORT.md` (this file)

**Modified**
- `lib/site-config.ts` — canonical origin → `https://www.sheetalaromatics.com` (overridable via `NEXT_PUBLIC_SITE_URL`); `productPortfolio` (500+), `exportCountries` (5+, corrected from 50+ on 25 Oct), `contentUpdated`
- `app/layout.tsx` — removed root canonical; Search Console / Bing verification via env; new default title; GA component
- `lib/seo.ts` — `localBusinessSchema()`, `articleSchema()`, raster logo, `sameAs`, `areaServed`
- `lib/products-data.ts` — new *Food & Pharma Ingredients* category + 4 products; location-aware category titles; new product title/description templates; search synonyms (E211, E202, E282, E420); shortened 3 over-long titles
- `app/page.tsx` — keyword-led H1 and title, 500+/50+ stats, LocalBusiness JSON-LD, "Ahmedabad · India · Export" section linking all industries
- `app/contact/page.tsx` — LocalBusiness JSON-LD
- `app/products/[category]/[slug]/page.tsx` — "Industries served" links, "Request specifications" (WhatsApp) and "Discuss bulk requirements" (call) CTAs
- `app/sitemap.ts` — industries + guides, stable lastmod
- `components/site-header.tsx`, `components/site-footer.tsx` — Industries and Buyer Guides links
- `components/quote-form.tsx` — `generate_lead` event on successful submission
- `app/cookie-policy/page.tsx` — discloses GA cookies automatically when GA is enabled
- `components/product-visual.tsx`, `lib/product-images.ts`, `scripts/draw-structure.py` — new category palette and structures
- `.env.example` — documented new variables

---

## 3. SEO changes implemented

- **Preferred domain fixed**: canonicals, sitemap, robots `Host`/`Sitemap`, Open Graph and JSON-LD all use `https://www.sheetalaromatics.com`.
- **New content (11 pages)**: 7 industry pages (Pharmaceutical, Food & Beverage, Fragrance & Flavour, Cosmetics & Personal Care, Ayurveda & Nutraceuticals, Chemical & Agrochemical Synthesis, Industrial) with hand-written briefs, "what to include in your enquiry" checklists and product lists drawn from the catalogue; 4 buyer guides (quotation checklist, phase transfer catalyst selection, food preservatives compared, importing chemicals from India).
- **New products (4)** in a new *Food & Pharma Ingredients* category, identifiers verified on PubChem: Sodium Benzoate (532-32-1), Potassium Sorbate (24634-61-5), Calcium Propionate (4075-81-4), Sorbitol 70% Solution (50-70-4).
- **Structured data**: LocalBusiness (home, contact), Article (guides), CollectionPage + ItemList (industries), raster logo, `sameAs` (company Google Maps link), `areaServed`.
- **On-page**: homepage H1/title/description, category titles with Ahmedabad/Gujarat, product titles now "X Supplier in Ahmedabad | CAS …" (length-guarded), descriptions mention "since 2005".
- **Internal linking**: product ↔ industry ↔ guide cross-links; header and footer links; homepage industry grid.
- **Conversion**: specification and bulk-requirement CTAs on every product page; GA4 events for quote submissions, calls, email and WhatsApp clicks.
- **Measurement hooks**: Search Console / Bing verification and GA4 switched on by environment variables — no code change needed.

---

## 4. Keyword map

Search volumes are **not** included — see §9. Keywords are grouped by intent and mapped to the page best placed to rank for them.

### Homepage — `/`
aromatic chemicals supplier Ahmedabad · aromatic chemical trader Ahmedabad · chemical supplier Ahmedabad · chemical exporter Gujarat · chemical traders in Ahmedabad Gujarat · B2B chemical trading company India

### Categories
| Page | Primary | Secondary / long-tail |
| --- | --- | --- |
| `/products/aromatic-chemicals` | aromatic chemicals supplier in Ahmedabad | aroma chemicals exporter India, fragrance chemicals supplier |
| `/products/essential-oils` | essential oil supplier Ahmedabad | essential oil exporter India, bulk essential oils |
| `/products/ayurvedic-products` | Ayurvedic raw material supplier Ahmedabad | Ayurvedic herbs exporter, herbal powder supplier India |
| `/products/pharma-intermediates` | pharma intermediates supplier Ahmedabad | pharmaceutical raw material supplier Ahmedabad |
| `/products/phase-transfer-catalysts` | phase transfer catalyst supplier India | quaternary ammonium salt supplier, TBAB supplier |
| `/products/food-pharma-ingredients` | food grade chemical supplier Gujarat | food ingredient supplier India, food preservative supplier |
| `/products/metals` | selenium metal supplier India | iodine supplier, sodium metal supplier |

### Industries
| Page | Target |
| --- | --- |
| `/industries/pharmaceutical` | pharmaceutical raw material suppliers in Ahmedabad / exporters India |
| `/industries/food-and-beverage` | food ingredient suppliers from India, food-grade chemical suppliers Gujarat |
| `/industries/fragrance-and-flavour` | aroma chemicals for perfumery, aromatic chemical exporters from India |
| `/industries/cosmetics-and-personal-care` | cosmetic ingredient supplier India |
| `/industries/ayurveda-and-nutraceuticals` | Ayurvedic raw material suppliers in Ahmedabad |
| `/industries/chemical-synthesis` | phase transfer catalyst supplier, fine chemical intermediates India |
| `/industries/industrial` | industrial chemical suppliers in Ahmedabad, bulk chemical suppliers Gujarat |

### Priority products
| Product page | Target |
| --- | --- |
| Benzyl Alcohol | benzyl alcohol suppliers in Ahmedabad · benzyl alcohol CAS 100-51-6 |
| Sodium Benzoate | sodium benzoate suppliers in Gujarat · E211 supplier |
| Potassium Sorbate | potassium sorbate suppliers in India · E202 |
| Calcium Propionate | calcium propionate suppliers in Gujarat · E282 |
| Sorbitol 70% Solution | sorbitol 70% suppliers in Ahmedabad · sorbitol solution supplier |
| Benzyl Triethyl Ammonium Chloride | TEBAC supplier India · CAS 56-37-1 |
| Tetrabutyl Ammonium Bromide | TBAB supplier India |
| Menthol / Benzyl Acetate / Clove Oil | "[product] supplier Ahmedabad", "[product] exporter India", "[product] CAS …" |

Every product page also targets its CAS number and listed synonyms.

### Guides (informational → commercial)
sodium benzoate vs potassium sorbate · phase transfer catalyst selection / TEBAC vs TBAB · chemical quotation checklist · importing chemicals from India documents

### Location
Ahmedabad and Gujarat are targeted on the homepage, contact page, category and product titles. **No city or country landing pages were created** — there are no offices elsewhere, and pages without genuine local content would be doorway pages.

---

## 5. Technical checks and results (local production build, 21 Oct 2026)

| Check | Result |
| --- | --- |
| `tsc --noEmit` | ✅ pass |
| `next build` | ✅ pass — 214 static pages |
| ESLint | ⚠️ not run — ESLint is not installed in the project (`npm run lint` would prompt to install) |
| Sitemap | ✅ 118 URLs, all on `https://www.sheetalaromatics.com`, all return 200, none noindexed; 81 image entries, 0 broken; single stable lastmod |
| robots.txt | ✅ allows all pages; blocks `/api/` and `/products?*` filter URLs; Host and Sitemap on www |
| Canonicals | ✅ all 118 pages self-canonical to their sitemap URL |
| H1 | ✅ exactly one per page (118/118) |
| Titles | ✅ unique across all pages; product/category/industry/guide titles ≤ 72 characters with brand |
| Meta descriptions | ✅ present and ≥ 50 characters on every page |
| Structured data | ✅ all JSON-LD parses: Organization, WebSite, BreadcrumbList (117), Product (88), CollectionPage (17), Article (4), FAQPage (2), LocalBusiness (2) |
| Internal links | ✅ 169 unique internal URLs checked, 0 broken |
| Images | ✅ every `<img>` has alt text |
| 404 | ✅ returns 404 with `noindex` |
| Redirects | ✅ legacy slug returns 308 to its new URL |
| Mobile | ✅ no horizontal overflow at 375 px on home, industries, guide, category and product pages |
| Live site (read-only check) | ✅ `sheetalaromatics.com` redirects to `https://www.sheetalaromatics.com/`; old sitemap/robots were on the non-www origin (fixed in this change) |

**Not verified**: Google Rich Results Test / Schema validator (needs the deployed URL), Core Web Vitals field data (needs CrUX / Search Console after deploy), live indexing status.

---

## 6. Manual tasks needing your access or approval

1. **Deploy** — commit and push; Vercel builds from `main`.
2. **Vercel → Settings → Domains** — keep `www.sheetalaromatics.com` as primary with the bare domain redirecting (308) to it. If you ever switch the primary, set `NEXT_PUBLIC_SITE_URL` to match.
3. **Google Search Console** — see §7. Add the token as `GOOGLE_SITE_VERIFICATION` in Vercel and redeploy.
4. **Google Analytics 4** — create a GA4 property, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel, redeploy. Mark `generate_lead`, `click_to_call`, `whatsapp_click` and `email_click` as key events.
5. **Confirm business facts** (nothing below was invented — please confirm or correct):
   - ✅ Positioning resolved (25 Oct): trading + custom manufacturing — copy, tagline and schema aligned.
   - The 4 new food/pharma products are supplied, and in which grades (food / IP / BP / USP).
   - ✅ Export reach resolved: 5+ countries (homepage corrected). Still useful: the full product list (only 88 have pages) and the names of the export countries.
6. **Enquiry/visitor logs** — move `lib/logger.ts` to a persistent store (e.g. a database or Vercel Blob) if you need records beyond email; disk writes do not persist on Vercel. The visitor log records IP addresses, so mention it in the privacy policy.
7. **Resend** — verify `sheetalaromatics.com` in Resend so buyers receive confirmation emails.
8. **Google Business Profile** — checklist below.

### Google Business Profile checklist
- Name exactly "Sheetal Aromatics" (no keyword stuffing); address and phone identical to the website footer (NAP consistency).
- Primary category: *Chemical wholesaler* (or *Chemical manufacturer* if accurate); secondary: *Essential oils supplier*, *Ayurvedic medicine supplier*/similar where applicable.
- Website link: `https://www.sheetalaromatics.com/`; appointment/enquiry link: `/request-a-quote`.
- Hours: Mon–Sat 9:00–18:00; add holiday hours.
- Description: 750 characters on what you supply, since 2005, Ahmedabad, export.
- Products section: add top 10 products with photos linking to their pages.
- Photos: real office, warehouse, packing and team photos (not AI images).
- Ask genuine customers for reviews after delivery — no incentives, never write or buy reviews; reply to every review.
- Post monthly updates (new products, guides).

---

## 7. Google Search Console — submission & indexing checklist

1. Add a **Domain property** for `sheetalaromatics.com` (DNS TXT record — covers www and non-www). Alternatively a URL-prefix property for `https://www.sheetalaromatics.com/` verified with the HTML tag via `GOOGLE_SITE_VERIFICATION`.
2. Submit `https://www.sheetalaromatics.com/sitemap.xml` (Sitemaps report).
3. URL Inspection → *Request indexing* for: `/`, `/products`, each category, `/industries`, the 4 new product pages, and the guides.
4. After 3–7 days check **Pages** report: indexed vs not indexed. Expected "Page with redirect" for non-www URLs — that is correct.
5. Check **Enhancements**: Breadcrumbs, Product snippets (no errors expected; Product pages will not get price/rating rich results because no offers or reviews are published — by design), Logo.
6. Link GA4 to Search Console (GA4 → Admin → Product links).
7. Also add the site to **Bing Webmaster Tools** (import from GSC) and set `BING_SITE_VERIFICATION` if verifying by meta tag.
8. Monthly: review Performance by query and page; Core Web Vitals report; Manual actions & Security issues.

### Tracking plan
| Metric | Source |
| --- | --- |
| Organic impressions, clicks, CTR, position by query and page | Search Console → Performance |
| Indexed vs excluded pages | Search Console → Pages |
| Quote / enquiry submissions | GA4 `generate_lead` (with `product`, `form_kind`), plus the reference-numbered emails |
| Click-to-call, WhatsApp, email | GA4 `click_to_call`, `whatsapp_click`, `email_click` |
| Organic landing-page conversions | GA4 → Landing page report, filtered to Organic Search, key events |
| Queries generating qualified leads | Match the `page` field in each enquiry email to Search Console queries for that page |

---

## 8. 90-day roadmap

**Days 1–14 — foundations**
- Deploy; Search Console + Bing; submit sitemap; request indexing of priority pages.
- GA4 live with key events; Resend domain verification.
- Confirm positioning and the new products (§6.5); Google Business Profile completed.

**Days 15–45 — catalogue depth**
- Add pages for the most-requested of the remaining ~400 portfolio products (start with those named in buyer enquiries). Each needs verified CAS, synonyms and applications — 10–20 products per batch.
- Add real photographs of packing, drums and dispatch to the About and Export pages.
- If you hold certifications (ISO, GMP, FSSAI licence, etc.), add them with numbers — strong trust signals.

**Days 30–75 — content**
- Publish 2 guides per month on real buyer questions (e.g. "Sorbitol 70%: crystallising vs non-crystallising", "Benzyl alcohol grades: IP vs BP vs technical", "Essential oil documentation for export").
- Add an FAQ block to the 10 highest-traffic product pages using questions buyers actually ask your team.

**Days 45–90 — authority & local**
- Legitimate backlinks: industry associations (e.g. CHEMEXCIL membership listing, GCCI / local chambers), verified B2B directories (IndiaMART, TradeIndia, ExportersIndia — with consistent NAP), supplier listings on customers' sites, trade-show exhibitor pages, guest articles in Indian chemical trade publications.
- Encourage genuine Google reviews from repeat customers.
- Review Search Console: improve titles of pages with high impressions but low CTR; expand pages ranking positions 8–20.

---

## 9. Limitations

- **No keyword-volume or difficulty data**: no keyword tool (Google Keyword Planner, Ahrefs, Semrush) was available in this environment, so no volumes, difficulties or competitor rankings are stated. The keyword map is based on search intent and the product catalogue. Validate it with Keyword Planner or Search Console query data after 4–6 weeks.
- **No live ranking verification**: rankings and indexing can only be measured after deployment via Search Console.
- **Rich results**: Google Product rich results (price, rating) need offers or reviews; none are published because that data does not exist, so product pages are eligible for standard listings and breadcrumbs only.
- No promise of first-page rankings can be made; the changes remove technical blockers and add relevant, linked content so the site can compete for these searches.
