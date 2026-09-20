# Sheetal Aromatics — website

B2B product discovery and quotation site for Sheetal Aromatics, a partnership
firm in Ahmedabad, Gujarat supplying aromatic chemicals, essential oils,
Ayurvedic products, metals and pharma intermediates to domestic and export
customers since 2005.

Production domain: **https://sheetalaromatics.com**

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build
npm start            # serves the production build on port 3000
```

Requires Node 18.18+ (Node 20 LTS recommended).

---

## Enquiry email

The quotation and contact forms POST to `/api/enquiry`. Copy `.env.example` to
`.env.local` and configure either SMTP or Gmail credentials — see the comments
in that file.

If no transport is configured the endpoint returns a clear error asking the
visitor to email the company directly and logs the enquiry server-side. It
never reports success for a message it did not send.

The endpoint validates input with Zod, throttles to 5 submissions per IP per
10 minutes, carries a honeypot field plus a minimum fill time, escapes all
values rendered into the HTML email, and strips newlines from anything used in
a mail header.

---

## Adding or editing products

Everything is driven by **`lib/products-data.ts`**. Append one object to
`productsDatabase` and the product automatically gets:

- its own page at `/products/<category>/<slug>`
- a sitemap entry, canonical URL, metadata and a social share card
- Product structured data
- inclusion in search, category filters and related-product lists

```ts
{
  slug: "example-product",
  name: "Example Product",
  category: "aromatic-chemicals",
  summary: "One line used on cards and in search results.",
  casNumber: "000-00-0",          // omit if not verified
  molecularFormula: "C9H10O2",    // omit if not verified
  physicalForm: "Liquid",
  applications: ["Perfumery", "Flavours"],
  keywords: ["example", "ester"],
}
```

Only include a field when the value is verified. Any field left out simply does
not render — the specification table shows "confirmed on enquiry" instead.

Company facts (address, phone, email, GST, IEC, partners, hours) live in
**`lib/site-config.ts`** and are used everywhere, including structured data.
Change them in one place.

---

## Content accuracy rules

The site deliberately does **not** state:

- price, MOQ, stock or lead time
- certifications (ISO / GMP / HACCP / REACH / FDA or any other)
- production capacity, facilities, employee or customer counts
- countries served, customer names, testimonials or ratings

Where a buyer would expect one of these, the UI says the information is
confirmed on enquiry. `casNumber`, `molecularFormula` and `molecularWeight` are
public chemical identifiers, not claims about supplied material. Product
`technicalNote` text is general published context about a substance and is
labelled as such on the page.

If the company later obtains certifications or wants to publish export
markets, add them to `lib/site-config.ts` and surface them — the layouts have
room for it.

---

## Product imagery

Products are illustrated by `components/product-visual.tsx`, which draws an
SVG from the product's own record: the physical form it is supplied in, its
category, its characteristic material colour, and its molecular formula where
one is held. Each product gets a stable, distinct illustration.

This was chosen over stock photography deliberately — a generic laboratory
photo attached to a specific chemical misrepresents it, and correct
photographs of 69 different materials are not available. The illustrations are
accurate, licence-free, roughly 2 kB each and differentiate the five
categories at a glance.

To move to real photography later, add a `photo` field to `Product` and render
it in place of `<ProductVisual />` in `components/product-card.tsx` and the
product page. Nothing else needs to change.

---

## Brand assets

| File | Use |
| --- | --- |
| `public/logo/sheetal-aromatics-logo.svg` | Full lockup, redrawn from the company artwork |
| `public/logo/sheetal-aromatics-mark.svg` | Hexagon mark only |
| `components/brand/logo.tsx` | In-app logo (mark as vector paths, wordmark in Archivo) |
| `public/icon.svg`, `icon-192.png`, `icon-512.png`, `apple-icon.png` | Favicons and app icons |
| `app/opengraph-image.tsx` | Site-wide social share card |
| `app/products/[category]/[slug]/opengraph-image.tsx` | Per-product share card |

Brand colours are fixed in the mark and must not follow the interface theme:
wordmark `#CC3300`, hexagons `#6C6CFF`. Interface colours are tokens in
`app/globals.css` (deep forest green, warm off-white, brass accent).

---

## Structure

```
app/
  page.tsx                              Home
  about/ export/ contact/ faq/          Company pages
  request-a-quote/                      RFQ form
  products/                             Catalogue overview + search
  products/[category]/                  Category pages (static)
  products/[category]/[slug]/           Product pages (static) + OG image
  privacy-policy/ terms-and-conditions/ cookie-policy/
  api/enquiry/route.ts                  Form handler
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
components/                             Site components (ui/ is shadcn)
lib/
  site-config.ts                        Company facts — single source of truth
  products-data.ts                      Catalogue + search + SEO copy
  faqs.ts                               FAQ content (also used for FAQ schema)
  seo.ts                                Metadata helpers and JSON-LD
```

Stack: Next.js 15 (App Router), React 19, Tailwind CSS v4, shadcn/ui,
TypeScript, Nodemailer.

---

## SEO

- One `<h1>` per page, correct heading order
- Unique title, description and canonical on every indexable page
- `sitemap.xml` generated from the catalogue; `robots.txt` excludes `/api/`
  and the parameterised `/products?…` filter URLs
- JSON-LD: Organization, WebSite, BreadcrumbList, Product, FAQPage,
  CollectionPage. `offers`, `sku`, `aggregateRating` and `review` are omitted
  because that data does not exist
- Open Graph and Twitter cards, with a generated per-product image
- Permanent redirects in `next.config.mjs` preserve the old Ayurvedic herb and
  powder URLs and three renamed product slugs

After the first deploy: submit the sitemap in Google Search Console and add the
verification token to `app/layout.tsx` under `metadata.verification`.

---

## Deployment

Any Node host that runs Next.js works. On Vercel: import the repository, add
the environment variables from `.env.example`, deploy. `/api/enquiry` needs a
Node runtime — a purely static export will not send email.
