---
name: sheetal-growth-plan
description: Executes the Sheetal Aromatics growth plan — SEO fixes in this Next.js repo, product-page upgrades, buyer-guide content, Google Search Console / Business Profile setup, marketplace listings, B2B email and LinkedIn outreach, Meta Click-to-WhatsApp ads, export strategy and monthly KPI reporting. Use for any marketing, SEO, website-content, outreach, lead-generation or international-sales task for Sheetal Aromatics (sheetalaromatics.com), including "what should we do next", writing copy or emails for the business, or updating product pages.
---

# Sheetal Aromatics growth plan — agent playbook

You are helping a two-partner B2B chemical supplier in Ahmedabad (est. 2005) turn a technically strong new website into a steady flow of qualified domestic and international enquiries. This skill turns the *Sheetal Aromatics Growth Plan* (23 Oct 2026) into executable steps, with the live status of each item in this repository.

**Bottom line of the plan:** the website is in good shape; the business systems around it are not built yet. Order of work: **measure → make every claim true → get indexed → get listed → deepen product pages → outbound (email + LinkedIn) → content → paid test**. SEO compounds behind outbound; outbound brings international buyers this year.

## Step 0 — load context before doing anything

1. Read `BUSINESS-README.md` (repo root) — company facts, full catalogue, buyers, markets, website, SEO state, open decisions. It is the source of truth for business facts.
2. For website work, also skim `README.md` (developer guide) and `docs/SEO-REPORT.md`.
3. Open the reference file for the workstream you are on:
   - `references/seo-playbook.md` — keyword map, title/meta patterns, product-page template, page-by-page specs, content calendar, listings
   - `references/outreach-playbook.md` — email streams and sequences, newsletter, LinkedIn routine and scripts, Meta Ads setup, WhatsApp greeting, country email rules
   - `references/international-and-ops.md` — market matrix, regulatory watch-list, export kit, credentials, government schemes, trade fairs, sales ops, KPIs and the monthly report template

## Guardrails (non-negotiable)

These protect the business from false claims, legal risk and search penalties. If a task conflicts with one, stop and tell the user.

1. **Never invent facts.** No prices, MOQ, stock, lead times, specifications, grades, certifications, capacities, customers, testimonials, ratings, reviews or countries served. If a fact is missing, write a placeholder like `{verify: typical assay}` and list it as a question for the owner.
2. **Use the confirmed business facts exactly** (owner, 25 Oct 2026): the firm does **trading + custom manufacturing** — never call it a manufacturer of the whole range, and claim manufacture of a specific product only if it is marked `madeInHouse`; export reach is **5+ countries** (never "50+"); the address is **Tal. Daskroi**. Other open decisions stay open until answered.
3. **No health claims** for Ayurvedic products — never "treats", "cures", "boosts", "improves immunity". Specifications and test data only.
4. **Dangerous goods** (sodium metal, and anything hazardous) are never promoted in Meta ads. Metals and selenium/iodine stay out of paid social.
5. **No fake structured data** — no invented `aggregateRating`, `review` or `offers`/prices to win rich results. "Missing offers" warnings in Search Console are not penalties.
6. **No thin-content patterns** — no auto-generated "{product} supplier in {city}" pages, no country pages without real shipping experience, no machine-translated pages, no hreflang until real translations exist, no AI-written articles published without a knowledgeable human review.
7. **Don't change URL slugs** (they are clean). The only planned URL change is the Shilajit merge, with 301/308 redirects.
8. **White-hat links only** — no paid link packages, PBNs, link exchanges, comment spam or automated directory blasts.
9. **Email law & reputation** — separate cold-outreach domains from the main domain; verify addresses (bounce < 2%); one-click unsubscribe on marketing mail; no cold email to Germany or Canada; corporate-only in the UK; documented legitimate interest in the EU.
10. **LinkedIn is manual** — no automation tools (prohibited by LinkedIn; risks restriction). ~70 requests/week maximum.
11. **Secrets** — API keys and passwords live only in `.env.local` (git-ignored) and Vercel env vars. Never print, commit or paste them into copy.
12. **Don't block AI crawlers**; don't remove the http→https apex hop (HSTS preload needs it).

## Status board (as of 25 Oct 2026 — update this table as items close)

Legend: ✅ done · 🟡 code ready, needs config/account · ⬜ pending · ⛔ blocked on owner decision

### Measurement & indexing
| Item | Status | Notes |
|---|---|---|
| GA4 tracking code + events (`generate_lead`, `click_to_call`, `email_click`, `whatsapp_click`) | 🟡 | Built in `components/analytics.tsx`, `lib/analytics.ts`, `components/quote-form.tsx`. Needs a GA4 property and `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel (note: **not** `NEXT_PUBLIC_GA_ID` as the plan's sample code says) |
| Cookie policy reflects GA | ✅ | `app/cookie-policy/page.tsx` switches automatically |
| Consent Mode v2 for EU/UK | ⬜ | Needed before emailing/advertising to Europe — see seo-playbook §Technical |
| Search Console verification | 🟡 | `GOOGLE_SITE_VERIFICATION` env var supported; a DNS TXT token reportedly exists |
| Sitemap submitted, top-25 URLs inspected | ⬜ | Owner action in GSC |
| Bing Webmaster import + IndexNow | 🟡 | `BING_SITE_VERIFICATION` supported; IndexNow key file `public/0f97b13c852662cc3c4259cb4f7334d1.txt` added — after each deploy run `npx tsx scripts/indexnow.mts`. Bing import from GSC still to do |
| llms.txt for AI assistants | ✅ | `/llms.txt` (site map) and `/llms-full.txt` (all product data + FAQs), generated from the catalogue by `lib/llms.ts`. Not a Google feature — nothing to submit in Search Console |
| Meta Pixel | ⬜ | Only when Meta Ads start |

### Trust & consistency
| Item | Status | Notes |
|---|---|---|
| "Six vs seven product groups" in FAQ | ✅ | Fixed (seven) |
| Export reach | ✅ | Now "5+ countries" (`exportCountries` in `lib/site-config.ts`); list the countries on /export once the owner names them |
| "500+ products" | 🟡 | Kept as the owner's trading-portfolio figure; consider "500+ products available on request" since 88 have pages |
| Business model wording + schema | ✅ | "Trading & custom manufacturing" in tagline, description, home, about, header, footer; custom-manufacturing FAQ added; `productSchema` claims `manufacturer` only when `madeInHouse` |
| Address | ✅ | "Tal. Daskroi" — mirror it exactly on GBP and directories |
| Domain email (sales@/export@) + SPF/DKIM/DMARC | ⬜ | GoDaddy DNS + Google Workspace/Zoho; then replace Gmail in `lib/site-config.ts` |
| Resend domain verification (buyer confirmations) | ⬜ | Then set `RESEND_FROM` |
| Real photos, certifications, named export countries | ⛔ | Owner to supply |

### Website / technical SEO
| Item | Status | Notes |
|---|---|---|
| Canonical www, sitemap, robots, schema, unique titles, alt text, 0 broken links | ✅ | Verified by crawl of 116 URLs (27 Oct) |
| Open Graph + Twitter cards on every page | ✅ | `pageMetadata()` in `lib/seo.ts`: brand in shared titles, per-product share images, guides typed `article` with dates |
| LocalBusiness, Article, ItemList schema; industries + guides pages | ✅ | |
| Products loading skeleton (`app/products/loading.tsx`) | ✅ | Deleted (25 Oct) |
| Full product list server-rendered on `/products` | ✅ | "Full product list" section — all product links in the initial HTML |
| Merge Shilajit 3/5/7% into one page | ✅ | `shilajit-powder`; old URLs 308-redirect (`next.config.mjs`) |
| Product appearance image for every product | ✅ | All 86: 43 photos + 43 AI-generated illustrative (Figma/Canva, captioned as illustrative). Nasottar is shown as dried turpeth root — confirm with the owner. Optional upgrades of 10 representative plant photos are in `scripts/product-image-queue.json`; add new ones with `npx tsx scripts/add-product-images.mts <manifest.json>` |
| Ambient motion (hero molecular field, Ken Burns, parallax, image reveals) | ✅ | `components/molecular-field.tsx`, `components/motion.tsx`, motion CSS in `app/globals.css`; all respect reduced motion |
| Product `manufacturer` only where true; `madeInHouse` flag | ✅ | Flag exists on `Product`; no product is flagged yet — ask which (if any) are made in-house |
| Organization `sameAs` (LinkedIn, directories) | ⬜ | After profiles exist; `lib/seo.ts` |
| Product title pattern for international intent | ⬜ | See seo-playbook §Titles — needs owner OK |
| 20 priority product pages upgraded | ⛔ | Needs typical specs/COAs, packing, HS codes from owner |
| Category copy (200–400 words) + comparison tables | ⬜ | Data already in product records |
| favicon.ico | ✅ | `app/favicon.ico` (16/32/48) |
| WhatsApp button in mobile sticky bar | ✅ | `MobileQuoteBar` in `components/site-header.tsx` |
| "Chemical trader in Gujarat" targeting | ✅ | Home title/H1/eyebrow, local section, featured FAQ, About/Contact/Export/Products titles |
| Form: buyer type, port/Incoterm, file upload, marketing consent | ⬜ | `components/quote-form.tsx` + `app/api/enquiry/route.ts` schema |
| Persistent lead store | ⬜ | `lib/logger.ts` writes to disk, which doesn't persist on Vercel |

### Off-site & marketing
| Item | Status |
|---|---|
| LinkedIn company page + partner profiles | ⬜ |
| Google Business Profile optimisation + reviews | ⬜ |
| Listings: IndiaMART, TradeIndia, GlobalLinker/FIEO, CPHI Online, Echemi/ChemicalBook, JustDial | ⬜ |
| RCMC (CHEMEXCIL; SHEFEXIL/AYUSHEXCIL), D-U-N-S, ISO 9001 / FSSAI / Halal as relevant | ⬜ |
| Export kit (spec sheets, SDS, profile PDF, price sheet, sample policy) | ⛔ |
| Outreach domains bought, authenticated, warming up | ⬜ |
| Prospect lists for 3 beachhead markets | ⬜ |
| Email sequences live + newsletter | ⬜ |
| LinkedIn routine (70/week, 3 posts/week) + CRM sheet | ⬜ |
| 12 articles published (4 guides exist) | ⬜ |
| Meta Click-to-WhatsApp test | ⬜ |
| CRM pipeline, 4-hour response SLA, quote template | ⬜ |

## Workstreams — how to execute each

Work top to bottom unless the user asks for something specific. Each workstream lists the steps, who does them, and how to verify.

### W1 · Measurement (P0)
1. Owner creates a GA4 property → copy `G-XXXX` → add `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel → redeploy.
2. In GA4: Admin → Events → mark `generate_lead`, `whatsapp_click`, `email_click`, `click_to_call` as key events. Admin → Product links → link Search Console.
3. GSC: submit `https://www.sheetalaromatics.com/sitemap.xml`; URL Inspection → Request indexing (≈10/day): home, 7 categories, /export, /request-a-quote, then the 20 priority products.
4. Bing Webmaster Tools → "Import from Google Search Console". For IndexNow: generate a key, add `public/<key>.txt` containing the key, and POST changed URLs to `https://api.indexnow.org/indexnow` after deploys.
5. Record baselines in the KPI sheet (references/international-and-ops.md §KPIs).
**Verify:** submit a test quote on the live site → GA4 Realtime shows `generate_lead`.

### W2 · Trust & consistency (P0)
1. Ask the owner the open questions (bottom of this file). Do not proceed on blocked items without answers.
2. Apply answers in `lib/site-config.ts` (tagline, shortDescription, address, `productPortfolio`, `exportCountries`, email) and in copy that repeats them (`app/page.tsx`, `app/about/page.tsx`, `components/site-footer.tsx`, `lib/faqs.ts`, `app/export/page.tsx`). Grep for the old strings to catch every instance.
3. Domain email DNS at GoDaddy (Google Workspace example): MX `smtp.google.com`; SPF TXT `v=spf1 include:_spf.google.com ~all`; DKIM 2048-bit from Admin console; replace DMARC with `v=DMARC1; p=none; rua=mailto:dmarc@sheetalaromatics.com; fo=1`, move to `p=quarantine` after 2–4 clean weeks. Keep a **single** SPF record combining all senders (add Resend/newsletter includes as needed). Zoho alternative in seo-playbook.
**Verify:** an email from sales@ to Gmail shows SPF=PASS and DKIM=PASS in "Show original"; grep shows no remaining "gmail.com" in public copy once switched.

### W3 · Technical fixes in this repo (P1)
Follow `references/seo-playbook.md` §Technical for code. Summary:
1. Delete `app/products/loading.tsx`; if `/products` uses `useSearchParams`, wrap only that client component in `<Suspense fallback={null}>` and render the full product list on the server.
2. Shilajit: create one product `shilajit-powder` in `lib/products-data.ts` with a grade table (3/5/7% fulvic acid), map its image in `lib/product-images.ts`, remove the three old entries, add redirects for `/products/ayurvedic-products/shilajit-powder-{3,5,7}` in `next.config.mjs`.
3. Add optional fields to the `Product` interface: `madeInHouse?: boolean`, `hsCode?`, `assay?`, `packing?`, `grades?`, `faqs?: {q, a}[]`; render them on the product page and in `productSchema` (`additionalProperty`, `manufacturer` only when `madeInHouse`). Add FAQPage schema only from real FAQs.
4. favicon, sticky-bar WhatsApp, form fields + consent checkbox (store consent with the enquiry), Consent Mode v2.
**Verify after every change:** `npx tsc --noEmit`, `npm run build`, then on the production build: every sitemap URL returns 200, one H1, self-canonical, unique titles, JSON-LD parses, no broken internal links (the crawl approach in `docs/SEO-REPORT.md` §5). For `/products`: `curl -s <url>/products | grep -o 'href="/products/[a-z-]*/[a-z0-9-]*"' | sort -u | wc -l` ≥ number of products.

### W4 · Product-page upgrades (P1, the biggest on-page lever)
1. Get from the owner, per priority product: typical COA values, grades supplied, packing, HS code, UN number/class if DG, shelf life, sample size, documents available.
2. Build each page to the template in seo-playbook §Product page: key specs (labelled "typical"), grades, packing & shipping, 150–300 unique words of applications, documents, "what determines the price", 3–5 product FAQs, related products.
3. Retitle using the agreed pattern (seo-playbook §Titles; 12 ready-made titles there). Use both spellings (tetrabutylammonium / tetrabutyl ammonium; sulphate / sulfate) in synonyms and body.
4. Two pages per week alongside one article per week.
**Priority 20:** TBAB, TEBAC, TBAHS, MTPPB, ETPB, BTPPC, TBAI, BTBAC, 5-methoxy-2-mercaptobenzimidazole, diphenylacetonitrile, diphenylacetic acid, Nerolin (Yara Yara), methyl salicylate, benzyl benzoate, benzyl acetate, benzyl alcohol, sodium benzoate, potassium sorbate, ashwagandha root powder, Shilajit (merged).

### W5 · Content (P1)
1. Publish the 12-article calendar in seo-playbook §Content calendar (≈1/week). Each: written or reviewed by someone who knows the chemistry, real numbers, links to 3–5 product pages in the body, author byline (a partner) and "last reviewed" date.
2. Add guides in `lib/guides.ts` (same shape as existing entries); they appear in the sitemap, nav (Resources menu) and industry pages automatically. Update `dateModified` when edited.
**Verify:** build passes; the guide's `relatedProducts` slugs exist; title + brand ≤ ~65 characters; description ≤ 158.

### W6 · Listings, entity & backlinks (P1)
Week 1 LinkedIn company page + partner profiles + GBP · Week 2 IndiaMART, TradeIndia, GlobalLinker/FIEO · Week 3 CPHI Online, Pharmaoffer, Echemi/ChemicalBook/LookChem · Week 4 JustDial, Dial4Trade, Indian Yellow Pages · Month 2 CHEMEXCIL/SHEFEXIL/AYUSHEXCIL directory, GCCI · Month 3 Knowde, Kompass, Europages, Go4WorldBusiness, one guest technical article. Use the identical NAP string everywhere; link each listing to the matching product/category page; add profile URLs to Organization `sameAs`.

### W7 · Google Business Profile (P1)
Primary category "Chemical wholesaler" (trading); "Chemical manufacturer" as a secondary category (custom manufacturing) · products (7 categories + top 15) linking with `?utm_source=google&utm_medium=organic&utm_campaign=gbp_product` · real photos (~4/month) · 750-character factual description · weekly posts · review link to 20–30 domestic customers by WhatsApp, reply to every review, never incentivise.

### W8 · Email marketing · W9 · LinkedIn · W10 · Meta Ads
Follow `references/outreach-playbook.md`. Fill every `{placeholder}` from research and claim only what is true; mark `{only if true}` items for owner confirmation before sending.

### W11 · International & sales ops
Follow `references/international-and-ops.md`: three hero lines × three or four beachhead markets, the regulatory watch-list, export kit, credentials, MAS/TRACE/RoDTEP/ECGC, trade fairs, CRM stages, response SLA, quote template.

## 7 / 30 / 90-day checklist

**Days 1–7** — [ ] GA4 + key events + GSC link · [ ] domain email + SPF/DKIM/DMARC, Gmail replaced · [ ] contradictions fixed (needs decisions) · [ ] sitemap + top-25 indexing + Bing · [ ] LinkedIn page + partner profiles · [ ] GBP category, products, photos, review requests · [ ] baselines recorded

**Days 8–30** — [ ] remove skeleton, SSR /products, Shilajit merge · [ ] retitle products + schema fixes · [ ] first 10 priority pages upgraded · [ ] six core listings live · [ ] LinkedIn routine running · [ ] outreach domains warming · [ ] export kit built · [ ] form improvements + sticky WhatsApp · [ ] RCMC applied

**Days 31–90** — [ ] email sequences to 3 beachhead markets · [ ] Meta test → retargeting · [ ] 12 articles · [ ] remaining 10 priority pages · [ ] monthly newsletter · [ ] CPHI India visit (23–25 Nov 2026) · [ ] GSC CTR rewrites · [ ] international directories + guest article

## How to report progress

At the end of each working session, give the user: what changed (files / accounts), what was verified and how, what is blocked and on whom, and the next three actions. Monthly, fill the one-page report in `references/international-and-ops.md` §Monthly report. Judge SEO over quarters; judge outbound only after 200+ contacts per segment; move effort from the channel with the highest cost per qualified lead to the lowest.

## Decisions needed from the owner

Ask these (once, together) before working on blocked items:
1. ✅ Answered: trading + custom manufacturing. Follow-up: are any catalogue products manufactured in-house (to mark `madeInHouse`)? What custom-manufacturing capabilities can be described (chemistries, batch sizes, lead times)?
2. ✅ Answered: 5+ export countries. Follow-up: which countries (for /export and outreach proof)? Is "500+ products" best phrased as "available on request"?
3. Certifications held today (ISO, FSSAI, GMP, Halal, Kosher, RCMC, organic)? Copies to publish.
4. Typical specs (recent COAs), grades and packing for the 20 priority products; HS codes from the customs broker.
5. ✅ Answered: Tal. Daskroi.
6. Who runs LinkedIn + email week to week (~1 h/day) — a partner or a new hire?
7. Access: Search Console, GA4, GBP, GoDaddy DNS, Vercel, Resend, the repository.
8. Confirm the four food & pharma ingredients (sodium benzoate, potassium sorbate, calcium propionate, sorbitol 70%) are supplied, and in which grades.
