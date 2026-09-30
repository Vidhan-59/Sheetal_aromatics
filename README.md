# Sheetal Aromatics — website

B2B product discovery and quotation site for Sheetal Aromatics, a partnership
firm in Ahmedabad, Gujarat supplying aromatic chemicals, essential oils,
Ayurvedic products, metals, pharma intermediates and phase transfer catalysts
to domestic and export customers since 2005.

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

The quotation and contact forms POST to `/api/enquiry`. Each enquiry gets a
reference number (e.g. `SA-260930-K7QX`) and sends two emails:

1. **To the company inbox** (`CONTACT_TO`, default `sheetalaromatics@gmail.com`):
   every field, the page the form was sent from, and *Reply to buyer* /
   *WhatsApp buyer* buttons. Pressing Reply goes straight to the buyer.
2. **To the buyer**: a branded confirmation quoting the reference, product,
   quantity and specification, with the company's contact details. It is sent
   only after the company email is delivered, and never echoes the buyer's
   free-text message. Turn it off with `CONTACT_AUTOREPLY=false`.

### Connecting Gmail

1. Sign in to the `sheetalaromatics@gmail.com` Google account and turn on
   2-Step Verification (Google Account → Security).
2. Open <https://myaccount.google.com/apppasswords>, create an app password
   named "Website", and copy the 16-character code.
3. Paste it after `GMAIL_APP_PASSWORD=` in `.env.local` (spaces are fine) and
   restart `npm run dev`.
4. In production, add the same `GMAIL_USER`, `GMAIL_APP_PASSWORD` and
   `CONTACT_TO` variables in the hosting dashboard (e.g. Vercel → Project →
   Settings → Environment Variables) and redeploy.

Any other SMTP provider works too — see `.env.example`.

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

To give the product an image, see **Product imagery** below. Categories are
defined in the same file (`productCategories`); a new category also needs a
colour palette in `components/product-visual.tsx`.

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

Every product shows one of three kinds of image, chosen so the picture is
always accurate. The mapping lives in **`lib/product-images.ts`** and is
rendered by `components/product-image.tsx`.

| Kind | Used for | Source |
| --- | --- | --- |
| Chemical structure (SVG) | Single substances with a verified CAS number | Drawn in the site palette from the PubChem record — `public/images/structures/` |
| Photograph (WebP) | Herbs, powders, essential oils, metals | Freely licensed photos from Wikimedia Commons — `public/images/products/` |
| Drawn illustration | Anything without either | Generated by `components/product-visual.tsx` |

Photos are credited under the image on each product page and on
`/image-credits` (linked in the footer), as their CC BY / CC BY-SA licences
require. Photos that show the source plant or a comparable material rather
than the exact traded form are marked `representative` and captioned as such.

**Adding a structure** for a new chemical:

```bash
python scripts/draw-structure.py <product-slug> <CAS-number> <category-slug>
```

It checks the CAS number against PubChem, writes the SVG and prints the line to
add to `lib/product-images.ts`.

**Adding a photo:** save a 4:3 crop as `public/images/products/<slug>.webp`
(1200×900) and `<slug>-600.webp` (600×450), plus a 600×450 JPEG at
`public/images/products/og/<slug>.jpg` for the share card, then add an entry
with the author, licence and source link to `lib/product-images.ts`. Only use
photos you own or that carry a licence allowing commercial use (CC0, public
domain, CC BY, CC BY-SA).

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
  image-credits/                        Photo credits and licences
  products/                             Catalogue overview + search
  products/[category]/                  Category pages (static)
  products/[category]/[slug]/           Product pages (static) + OG image
  privacy-policy/ terms-and-conditions/ cookie-policy/
  api/enquiry/route.ts                  Form handler
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
components/                             Site components (ui/ is shadcn)
scripts/draw-structure.py               Draws a chemical structure SVG from a CAS number
lib/
  site-config.ts                        Company facts — single source of truth
  products-data.ts                      Catalogue + search + SEO copy
  product-images.ts                     Product photo / structure mapping and credits
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
- JSON-LD: Organization, WebSite, BreadcrumbList, Product (with image, licence
  and CAS `productID`), FAQPage, and CollectionPage with an ItemList of the
  category's products. `offers`, `sku`, `aggregateRating` and `review` are
  omitted because that data does not exist
- Image sitemap entries for every product photo and structure, with
  descriptive alt text on every image
- Open Graph and Twitter cards, with a generated per-product share card that
  includes the product's photo or structure
- Permanent redirects in `next.config.mjs` preserve the old Ayurvedic herb and
  powder URLs and renamed product slugs

After the first deploy: submit the sitemap in Google Search Console and add the
verification token to `app/layout.tsx` under `metadata.verification`.

---

## Deployment

Any Node host that runs Next.js works. On Vercel: import the repository, add
the environment variables from `.env.example`, deploy. `/api/enquiry` needs a
Node runtime — a purely static export will not send email.
