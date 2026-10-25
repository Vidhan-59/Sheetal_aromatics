# SEO playbook — Sheetal Aromatics

Keyword map, page specifications, code changes for this repository, content calendar and listings. No search volumes are stated anywhere: none were available. Pull them from Google Ads → Keyword Planner (locations: India + beachhead countries) and, after 60–90 days, from Search Console → Performance → Queries.

## Contents
- Keyword map (location · industry · product · modifiers · international)
- Titles & meta descriptions (patterns + 12 ready-made)
- Page-by-page specifications
- Product page template
- Technical changes for this repo
- Domain email DNS (Workspace / Zoho)
- Content calendar (12 articles)
- Competitors & gaps
- Listings and backlinks

---

## Keyword map

Competition labels describe what actually ranked in checks (Oct 2026): *marketplace-heavy* = hard, *manufacturer pages* = moderate, *nothing relevant* = open.

### A · Location
| Cluster | Intent | Competition | Lead value | Target page | Priority |
|---|---|---|---|---|---|
| aromatic chemicals supplier Ahmedabad / aroma chemical dealers Ahmedabad | Commercial, local | Directories (TradeIndia, Dial4Trade, GlobalLinker) | High (domestic) | Home + GBP | High |
| chemical suppliers / traders in Ahmedabad | Local, broad | D&B, TradeIndia — hard, broad | Medium | GBP (Maps pack) + Contact | Medium |
| chemical exporter Gujarat / chemical exporters from India | Commercial | Directories, large firms | Medium | /export | Medium |
| specialty chemical supplier India | Broad | Very hard | Low | Home (passive) | Low |

### B · Industry
| Cluster | Competition | Lead value | Target page | Priority |
|---|---|---|---|---|
| phase transfer catalyst manufacturer/supplier India · quaternary ammonium salts supplier | TradeIndia (Tatva Chintan), IndiaMART | Very high | /products/phase-transfer-catalysts | High |
| aroma chemicals supplier India · fragrance ingredients supplier India | TradeIndia, IndiaMART, large makers | High | /products/aromatic-chemicals + /industries/fragrance-and-flavour | High |
| pharma intermediates supplier India · API intermediates Gujarat | CPHI Online, Pharmaoffer, ChemicalBook | Very high | /products/pharma-intermediates + /industries/pharmaceutical | High |
| Wittig reagent supplier · phosphonium salt manufacturer India | Thin; catalogue sites | High | Phosphonium section on the PTC category page | High |
| food preservatives supplier India · sodium benzoate distributor | TradeIndia-dominated | Medium | /products/food-pharma-ingredients | Medium |
| bulk essential oils exporter India | GlobalLinker (5 of top results) | Medium | /products/essential-oils | Medium |
| Ayurvedic raw material exporter · herbal powder bulk supplier India | GlobalLinker-dominated | Medium | /products/ayurvedic-products | Medium |

### C · Product (priority) — target `{full name} + {abbreviation} + CAS` with modifiers
| Product | CAS | Name variants to include | Observed results | Priority |
|---|---|---|---|---|
| Tetrabutylammonium bromide | 1643-19-2 | TBAB, tetra-n-butylammonium bromide | Marketplaces only | High |
| Benzyltriethylammonium chloride | 56-37-1 | TEBAC, TEBA, BTEAC | "TEBAC" alone returns unrelated firms | High |
| Tetrabutylammonium hydrogen sulfate | 32503-27-8 | TBAHS, TBAHSO4, ion-pair reagent HPLC | Catalogue sites | High |
| Methyltriphenylphosphonium bromide | 1779-49-3 | MTPPB, Wittig reagent | Catalogue sites | High |
| Ethyltriphenylphosphonium bromide | 1530-32-1 | ETPB, epoxy curing catalyst | Catalogue sites | High |
| Benzyltriphenylphosphonium chloride | 1100-88-5 | BTPPC, FKM cure accelerator | Catalogue sites | Medium |
| 5-Methoxy-2-mercaptobenzimidazole | 37052-78-1 | 2-mercapto-5-methoxybenzimidazole, omeprazole intermediate | No Indian supplier site | High |
| Diphenylacetonitrile | 86-29-3 | diphenyl acetonitrile, benzhydryl cyanide | Patents, ChemicalBook | High |
| Nerolin (Yara Yara) | 93-04-9 | 2-methoxynaphthalene, methyl β-naphthyl ether | "Yara Yara" alone = fertiliser company | High |
| Methyl salicylate | 119-36-8 | oil of wintergreen (synthetic), USP/IP | Mixed | Medium |
| Benzyl benzoate / acetate / alcohol | 120-51-4 · 140-11-4 · 100-51-6 | IP/BP/USP, perfumery grade | TradeIndia ~8 of 10 | Medium |
| Sodium benzoate · potassium sorbate · calcium propionate | 532-32-1 · 24634-61-5 · 4075-81-4 | E211, E202, E282, food grade, FCC | TradeIndia, GlobalLinker | Medium |
| Ashwagandha root powder · Shilajit powder | — | Withania somnifera root, withanolides %, fulvic acid % | GlobalLinker | Medium |
| Selenium metal powder · iodine resublimed | 7782-49-2 · 7553-56-2 | 99.9% / 99.99%, mesh | Not checked | Low–Med |

Spelling: chemists write "tetrabutylammonium" as one word (site uses "Tetrabutyl Ammonium"); US buyers write "sulfate" (site uses "sulphate"). Include both in synonyms and body copy.

### D · Buyer-intent modifiers (use in titles, H2s, FAQs)
- Procurement: `{product} manufacturer India`, `bulk supplier / 25 kg drum`, `price per kg`, `COA / SDS / MSDS`, `HS code`
- Technical: `{product} uses / applications`, `specification / assay`, `TBAB vs TEBAC`, `{product} for HPLC / for epoxy curing`, `pharma grade vs technical grade`
- Price queries: don't publish a price list you can't maintain. Add an H2 "What determines the price of {product}" (grade, assay, pack size, volume, Incoterm) ending in the quote form.

### E · International
Overseas buyers search product + "supplier" / "manufacturer India" / "from India" — so international SEO = product-page quality + clear English, not country pages.
| Cluster | Target page | Priority |
|---|---|---|
| import chemicals from India / Indian chemical supplier for {UAE · Kenya · Vietnam} | /export + guide "Importing chemicals from India" | Medium |
| {product} supplier India to UAE | Product FAQ "Do you ship to the UAE?" — only if true | Low |
| REACH only representative India · TSCA import from India | New compliance guide | Medium |

---

## Titles & meta descriptions

The root layout appends ` | Sheetal Aromatics` to every title unless the title already contains the brand. Override per product via `seo: { title, description }` in `lib/products-data.ts`; otherwise `productSeoTitle()` / `productSeoDescription()` generate them.

**Current default:** `{Name} Supplier in Ahmedabad | CAS {cas}` (local intent).
**Plan's recommended product pattern (needs owner OK):** `{Full name} ({ABBR}) CAS {cas} Supplier India` — international intent; keep "Ahmedabad" in body copy, homepage, categories and GBP. Meta pattern: `{ABBR} / {Full name} (CAS {cas}), {assay}% {form}, for {top 2 applications}. {Packing}. COA & SDS on request. Exported from India.` (only real assay/packing).

### Ready-made titles for the first 12 product pages
| Slug | Title | Meta description |
|---|---|---|
| tetrabutyl-ammonium-bromide | Tetrabutylammonium Bromide (TBAB) CAS 1643-19-2 Supplier India | TBAB (tetrabutylammonium bromide, CAS 1643-19-2), a benchmark phase transfer catalyst for alkylation and substitution. COA & SDS on request. Export from India. |
| benzyl-triethyl-ammonium-chloride | Benzyltriethylammonium Chloride (TEBAC) CAS 56-37-1 \| India | TEBAC / BTEAC (benzyltriethylammonium chloride, CAS 56-37-1) phase transfer catalyst for agrochemical and pharma synthesis. Specs, COA, export from India. |
| tetrabutyl-ammonium-hydrogen-sulphate | Tetrabutylammonium Hydrogen Sulfate (TBAHS) Supplier India | TBAHS (CAS 32503-27-8) for phase transfer catalysis and HPLC ion-pair chromatography. Grades, COA and SDS on request. Supplied from India. |
| methyl-triphenyl-phosphonium-bromide | Methyltriphenylphosphonium Bromide CAS 1779-49-3 Supplier | MTPPB (CAS 1779-49-3), the standard Wittig methylenation reagent precursor. Specs, packing and COA on request. Exported from India. |
| ethyl-triphenyl-phosphonium-bromide | Ethyltriphenylphosphonium Bromide (ETPB) CAS 1530-32-1 \| India | ETPB (CAS 1530-32-1) for Wittig olefination and as an epoxy resin curing catalyst. COA & SDS on request. Supplier and exporter, India. |
| 2-mercapto-5-methoxybenzimidazole | 5-Methoxy-2-Mercaptobenzimidazole CAS 37052-78-1 Supplier | 2-Mercapto-5-methoxybenzimidazole (CAS 37052-78-1), a benzimidazole intermediate used in proton-pump-inhibitor synthesis. Specs & COA on request. India. |
| diphenyl-acetonitrile | Diphenylacetonitrile CAS 86-29-3 Supplier & Exporter, India | Diphenylacetonitrile (diphenyl acetonitrile, CAS 86-29-3) pharmaceutical intermediate. Assay, packing, COA and SDS on request. Export from India. |
| yara-yara-crystal | Nerolin (Yara Yara) 2-Methoxynaphthalene CAS 93-04-9 | Nerolin / Yara Yara crystals (2-methoxynaphthalene, CAS 93-04-9), an orange-blossom note for soaps and detergents. Specs & COA on request. India. |
| methyl-salicylate | Methyl Salicylate CAS 119-36-8 Supplier & Exporter, India | Methyl salicylate (CAS 119-36-8) for topical, oral-care and flavour use. Grade on request (IP/BP/USP/technical). COA & SDS available. Export from India. |
| benzyl-benzoate | Benzyl Benzoate CAS 120-51-4 Supplier & Exporter, India | Benzyl benzoate (CAS 120-51-4) as a perfumery fixative, solvent and pharmaceutical ingredient. Grades, packing, COA on request. Supplied from India. |
| sodium-benzoate | Sodium Benzoate (E211) CAS 532-32-1 Supplier, Gujarat India | Sodium benzoate (E211, CAS 532-32-1) powder/granules for beverages, food, pharma and personal care. 25 kg bags. COA on request. Ahmedabad, India. |
| shilajit-powder (merged) | Shilajit Powder Bulk Supplier India \| 3%, 5%, 7% Fulvic Acid | Bulk shilajit powder standardised to 3%, 5% or 7% fulvic acid for supplement manufacturers. Heavy-metal test reports on request. Export from India. |

Remove any detail that isn't true for actual supply ("25 kg bags", "heavy-metal reports", specific grades) before publishing.

---

## Page-by-page specifications

| Page | Title | Key changes |
|---|---|---|
| **Home** `/` | Keep: *Aromatic Chemicals Supplier & Exporter, Ahmedabad \| Sheetal Aromatics* | Meta: "Since 2005: aroma chemicals, phase transfer catalysts (TBAB, TEBAC), pharma intermediates, essential oils and Ayurvedic botanicals. COA & SDS on request. Ahmedabad, India." H2s to cover: product range · PTCs · aroma chemicals · documents (COA, SDS, CoO) · certifications · export process · industries · FAQs. Add documents strip, certifications strip, 3–4 real photos, one named testimonial (with permission). Export reach is 5+ countries (done); name them once listed. Position as trading + custom manufacturing |
| **About** `/about` | About Sheetal Aromatics \| Chemical Supplier in Ahmedabad Since 2005 | Partner bios (years in trade, expertise, LinkedIn), facility facts (storage, QC, testing-lab partner), real milestone years, certificates, team photo. Schema: AboutPage + Person per partner (`worksFor` → #organization, `sameAs` → LinkedIn) |
| **Export** `/export` | Chemical Exporter from India: Process, Documents & Shipping \| Sheetal Aromatics | H2s: export process · documents · packing · ports, Incoterms & payment · samples & trial lots · dangerous goods · countries we ship to · compliance support (REACH OR, TSCA, Halal/Kosher where held). Replace "we do not publish a map of countries" with a factual list |
| **Category** (e.g. PTC) | Phase Transfer Catalysts Supplier India \| TBAB, TEBAC, TBAHS | 200–400 words of category copy above the grid; comparison table (Abbreviation · Full name · CAS · Form · Typical use); H2 quaternary ammonium salts; H2 phosphonium salts & Wittig reagents; H2 how to choose (link guide); H2 packing & documents; H2 FAQs. Other examples: *Aroma Chemicals Supplier India \| Benzyl Esters, Nerolin, Methyl Salicylate* · *Pharma Intermediates Supplier India \| Benzimidazoles, Diphenyl Nitriles* · *Food Preservatives Supplier \| Sodium Benzoate, Potassium Sorbate, Calcium Propionate* |
| **Industries** `/industries/*` | Keep | Add a "Typical buyer questions" block per industry; pharma "DMF/CEP support" only if real |
| **RFQ / Contact** | Request a Quote: Chemicals, Catalysts & Botanicals \| Sheetal Aromatics | Fields: buyer type (manufacturer/distributor/importer/lab), destination port + Incoterm, annual volume (optional), file upload, unticked consent checkbox ("Send me occasional supply updates (unsubscribe anytime)"). Thank-you: typical reply time (only if committed) + WhatsApp button. Replace Gmail with sales@/export@ once live |
| **Guides** | Keep | Author byline (partner + one-line bio), "last reviewed" date, 3–5 in-body product links; Article schema `author` → Person |

---

## Product page template

H1 `{Full name} ({ABBR})`, alternate spelling as subtitle. Sections (H2):
1. **Key specifications** — assay, appearance, moisture (KF), melting point, residue on ignition, routine impurity limits — from typical COAs, labelled "typical".
2. **Grades available** — technical / pharma (IP/BP/USP/EP) / food (FCC) — only those supplied.
3. **Packing & shipping** — e.g. 25 kg HDPE or fibre drum with liner; HS code; UN number + hazard class if DG; storage; shelf life.
4. **Applications** — 150–300 unique words (reactions, end uses, typical dosage ranges where well established).
5. **Documents** — COA per lot, GHS SDS, method of analysis, CoO; "Request" buttons → quote form pre-filled.
6. **What determines the price** — grade, volume, packing, Incoterm → quote form.
7. **FAQs** — 3–5 product-specific (MOQ, sample, lead time, shelf life, alternatives) — answers must be true.
8. **Related products** — same chemistry and same application (already automatic).

Schema: Product with `additionalProperty` (CAS, HS code, typical assay, packing); `manufacturer` only for in-house products; no ratings/prices. Own-photo alt text pattern: "25 kg fibre drums of {product} packed for export at Sheetal Aromatics, Ahmedabad".

---

## Technical changes for this repo

### Remove the products loading skeleton & SSR the list
- Delete `app/products/loading.tsx` (pages are statically prerendered; the skeleton only hides content behind JS streaming).
- `app/products/page.tsx` renders `components/product-explorer.tsx` (client). Keep the explorer for search/filter, but also server-render a full linked list (per category: product name + CAS) so every product link is in the initial HTML. If the explorer uses `useSearchParams`, wrap just it in `<Suspense fallback={null}>`.
- Verify: `curl -s https://www.sheetalaromatics.com/products | grep -o 'href="/products/[a-z-]*/[a-z0-9-]*"' | sort -u | wc -l` ≥ product count.

### Shilajit consolidation (`next.config.mjs` is ESM)
```js
// inside async redirects() { return [ ... ] }
...["3", "5", "7"].map((g) => ({
  source: `/products/ayurvedic-products/shilajit-powder-${g}`,
  destination: "/products/ayurvedic-products/shilajit-powder",
  permanent: true,
})),
```
Then: one `shilajit-powder` product with a grades table; image mapping in `lib/product-images.ts` (the shared `shilajit` photo); remove the three old entries. Sitemap and quote-form product list update automatically.

### Structured data corrections (`lib/seo.ts`)
- `organizationSchema`: add LinkedIn and directory profile URLs to `sameAs` (keep the Maps link); switch `email` to sales@ once the mailbox exists; keep GST/IEC `identifier`.
- `productSchema`: add `alternateName` variants; `manufacturer` only when `product.madeInHouse`; `additionalProperty` for HS code, typical assay, packing when present.

### Consent Mode v2 (before GA loads) — add to `components/analytics.tsx`
```tsx
<Script id="consent-default" strategy="beforeInteractive">{`
  window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}
  gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',
    region:['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']});
  gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
`}</Script>
```
Plus a small banner that calls `gtag('consent','update',{...})` on accept. Note: `beforeInteractive` scripts must be placed in the root layout.

### Meta Pixel (only when ads start) — `components/meta-pixel.tsx`, loaded when `NEXT_PUBLIC_META_PIXEL_ID` is set
Standard `fbq('init', id); fbq('track','PageView')` snippet via `next/script` `afterInteractive`. Fire `fbq('track','Lead',{content_name: product})` next to the existing `trackEvent("generate_lead")` in `components/quote-form.tsx`, and `fbq('track','Contact')` in the click listener in `components/analytics.tsx`. Disclose in the cookie policy.

### Small fixes
- `app/favicon.ico` 48×48 (Next serves it automatically).
- `MobileQuoteBar` (`components/site-header.tsx`): add a WhatsApp icon button → `whatsappLink(...)` from `lib/site-config.ts`.
- Sitemap lastmod: currently `siteConfig.contentUpdated`; ideally per-product `updatedAt`.
- IndexNow: `public/<key>.txt` + POST to `https://api.indexnow.org/indexnow` with `host`, `key`, `keyLocation`, `urlList`. Google doesn't use IndexNow — use sitemap + URL Inspection.

### Don't
Change slugs · add hreflang/translations · remove the apex→www hop · fake ratings/prices · block AI crawlers.

---

## Domain email DNS (GoDaddy)

| Record | Google Workspace | Zoho Mail (.in) |
|---|---|---|
| MX | `@ MX 1 smtp.google.com` | `@ MX 10 mx.zoho.in · 20 mx2.zoho.in · 50 mx3.zoho.in` |
| SPF (TXT @) | `v=spf1 include:_spf.google.com ~all` | `v=spf1 include:zohomail.in ~all` |
| DKIM | 2048-bit key from Admin → Gmail → Authenticate email | Admin → Domains → DKIM |
| DMARC | Replace with `v=DMARC1; p=none; rua=mailto:dmarc@sheetalaromatics.com; fo=1` → `p=quarantine` after 2–4 clean weeks | same |

One SPF record only; merge includes for Resend and any newsletter tool. Do this **before** sending anything from the domain (the current `p=quarantine` with no SPF junks mail).

---

## Content calendar (12 articles, 90 days)

Each: reviewed by someone who knows the chemistry, real numbers, 3–5 in-body product links, partner byline.

| Wk | Title | Target keyword · intent | Outline | Links to | Goal |
|---|---|---|---|---|---|
| 1–2 | TBAB uses in organic synthesis and industry | tbab uses · info→commercial | What TBAB is; alkylation, N-/O-alkylation, oxidation; ionic-liquid & electrolyte uses; grades & moisture; packing | TBAB, TBAI, TEBAC, PTC guide | PTC leads |
| 2 | TBAHS as an HPLC ion-pair reagent | tbahs hplc · technical | Ion-pair principle; purity/UV-cutoff; HPLC vs synthesis grade; storage | TBAHS, TBAB | Lab & QC buyers |
| 3 | Phosphonium salts as epoxy and FKM curing accelerators | ethyltriphenylphosphonium bromide epoxy | ETPB/ETPI in epoxy; BTPPC in fluoroelastomers; selection; handling | ETPB, ETPI, BTPPC | Polymer buyers |
| 4 | Wittig reagents buyer's guide: MTPPB, ETPB, methoxymethyl salts | wittig reagent supplier · commercial | Which salt for which olefination; moisture sensitivity; spec checklist | MTPPB, MMTPPC, ETPB | Pharma/fine chem |
| 5 | Nerolin (Yara Yara) in soaps and detergents | nerolin yara yara · commercial | Odour profile; why soap makers use it; crystal vs powder; specs | Yara Yara, benzyl acetate, indole | Soap makers (India, Africa, ME) |
| 6 | Benzyl esters compared: acetate, propionate, butyrate, benzoate | benzyl acetate vs benzyl benzoate | Odour, volatility, fixative role, uses, grades | 4 benzyl esters, benzyl alcohol | F&F houses |
| 7 | How to read a certificate of analysis for aroma chemicals | coa aroma chemicals | GC assay, refractive index, specific gravity, acid value; red flags | Quotation checklist, aroma pages | Trust; email support |
| 8 | HS codes for common aromatic & specialty chemicals exported from India | hs code tbab | Table by product (customs broker to verify); 8-digit codes; duty lookup | Many product pages, /export | Link magnet |
| 9 | Shipping dangerous goods from India: UN numbers, IMDG, packing | ship dangerous goods from india | Classes, UN packaging, DG declaration, air vs sea | Sodium metal, iodine, /export | Export trust |
| 10 | EU REACH and US TSCA for buyers importing from India | reach only representative india | Importer duty ≥1 t/yr, Only Representative, SDS at any tonnage, UK REACH timelines, TSCA certification | /export, PTC & aroma | EU/US enquiries |
| 11 | Ashwagandha root powder: specs importers ask for, 2026 regulatory status | ashwagandha powder bulk supplier | Root vs leaf; withanolide %; heavy metals, microbials, pesticides; EU restrictions; US testing | Ashwagandha, powder | Non-EU botanical leads |
| 12 | Qualifying a new chemical supplier from India: sample → trial lot → contract | chemical supplier qualification | Documents, sample approval, retained samples, audits, payment terms | RFQ, checklist, /export | First-time importers |

---

## Competitors & gaps (observed Oct 2026, independent index — indicative)

| Competitor | Overlap | Strength | Weakness to beat |
|---|---|---|---|
| Tatva Chintan (Ankleshwar) | PTCs | 150+ products, certifications page | One table, no per-product pages, no schema |
| Muby Chemicals | Benzyl alcohol, food ingredients | Benchmark depth: CAS, HS, EINECS, spec tables, MSDS; many certificates | Dated design, keyword stuffing, no WhatsApp |
| Jayshree Aromatics | Benzyl esters, sodium benzoate | Kosher, Halal, FSSAI, ISO, EOU, 25+ countries | Thin product data |
| Element Chemilink | TBAB, TEBAC, TBAHS | Ranks via IndiaMART storefront alone | No website |
| Shreeji Pharma, Kadillac Chemicals | Trader / benzyl derivatives | — | Generic thin pages |

Gaps to take: information depth (match Muby with better UX + schema) · open SERPs for intermediates and phosphonium salts · marketplace presence (mandatory) · content (no competitor blogs) · certificates (close with real ones).

---

## Listings and backlinks (white-hat)

| Source | Type | When |
|---|---|---|
| Google Business Profile, LinkedIn company page, partner profiles | Entity | Week 1 |
| IndiaMART · TradeIndia | B2B marketplace | Week 2 |
| GlobalLinker / FIEO | Export directory (botanicals, essential oils) | Week 2 |
| CPHI Online · Pharmaoffer | Pharma marketplace | Week 3 |
| Echemi · ChemicalBook · LookChem | CAS directories | Week 3 |
| JustDial · Dial4Trade · Indian Yellow Pages | Local citations | Week 4 |
| CHEMEXCIL / SHEFEXIL / AYUSHEXCIL directory | Association (.in, RCMC, fair support) | Month 2 |
| Gujarat Chamber of Commerce (GCCI) | Association | Month 2 |
| Knowde · Kompass · Europages · Go4WorldBusiness | International directories | Month 3 |
| Guest technical article (Indian Chemical News, trade magazines) | Editorial | Month 3 |
| Customers & logistics partners listing us | Relationship | Ongoing |

Also: free D-U-N-S number; partner LinkedIn profiles listing Sheetal Aromatics as current company; identical NAP everywhere.
