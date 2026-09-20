/**
 * Single source of truth for verified company information.
 *
 * Everything in this file is taken from information the business has already
 * published (previous site content, statutory registration numbers) or was
 * supplied directly by the company. Nothing here is estimated or inferred.
 * If a fact is not confirmed it is simply absent — pages are written so that
 * missing information degrades gracefully rather than being invented.
 */

export const siteConfig = {
  name: "Sheetal Aromatics",
  legalName: "Sheetal Aromatics",
  /** Constitution of the business. */
  legalForm: "Partnership Firm",
  url: "https://sheetalaromatics.com",
  domain: "sheetalaromatics.com",

  establishedYear: 2005,

  tagline: "Manufacturer of Aromatic & Organic Chemicals",
  shortDescription:
    "Aromatic chemicals, essential oils, Ayurvedic products, metals and pharma intermediates for B2B and export buyers. Ahmedabad, India — established 2005.",

  address: {
    line1: "A/7, Tirth Industrial Park 3A",
    line2: "Old Ahmedabad Bhavnagar Highway",
    line3: "Paldi Kankaj, Nr. Kamod Circle",
    line4: "Tal. Dasvroi",
    city: "Ahmedabad",
    postalCode: "382425",
    state: "Gujarat",
    country: "India",
    countryCode: "IN",
  },

  contact: {
    email: "sheetalaromatics@gmail.com",
    /** Primary number, also used for WhatsApp deep links. */
    phonePrimary: {
      display: "+91 98241 69906",
      e164: "+919824169906",
      digits: "919824169906",
      contactName: "Shailesh Shah",
    },
    phoneSecondary: {
      display: "+91 94260 05911",
      e164: "+919426005911",
      digits: "919426005911",
      contactName: "Vidhan Shah",
    },
  },

  businessHours: {
    summary: "Monday – Saturday, 9:00 AM – 6:00 PM IST",
    closed: "Sunday: Closed",
    /** schema.org openingHours format */
    schema: ["Mo-Sa 09:00-18:00"],
  },

  /** Statutory registration numbers already published by the business. */
  registrations: [
    { label: "GST No.", value: "24ABEFS0254K1Z9" },
    { label: "IEC No.", value: "0805014608" },
  ],

  partners: [
    { name: "Shailesh Shah", role: "Partner", phone: "+91 98241 69906" },
    { name: "Vidhan Shah", role: "Partner", phone: "+91 94260 05911" },
  ],

  /** No social profiles have been confirmed, so none are linked anywhere. */
  social: [] as { label: string; href: string }[],
} as const

export const addressLines = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  siteConfig.address.line3,
  `${siteConfig.address.line4}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`,
  `${siteConfig.address.state}, ${siteConfig.address.country}`,
]

export const addressSingleLine = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  siteConfig.address.line3,
  siteConfig.address.line4,
  `${siteConfig.address.city} ${siteConfig.address.postalCode}`,
  siteConfig.address.state,
  siteConfig.address.country,
].join(", ")

/** Street portion used for schema.org PostalAddress. */
export const streetAddress = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  siteConfig.address.line3,
  siteConfig.address.line4,
].join(", ")

export const yearsOfExperience = new Date().getFullYear() - siteConfig.establishedYear

/* -------------------------------------------------------------------------- */
/* Location                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Coordinates of the office pin, taken from the company's own Google Maps
 * link (https://maps.app.goo.gl/TjPKrPcCSKfzE6bz6), which resolves to
 * Tirth Industrial Park - 3, Paldi Kankaj, Ahmedabad 382425.
 *
 * Links are built from the coordinates rather than from a text search of the
 * address, so the pin cannot drift onto a different result.
 */
export const geo = { latitude: 22.9097292, longitude: 72.528589 }

const geoPair = `${geo.latitude},${geo.longitude}`

/** The short link the company shares directly; deep-links into the Maps app. */
export const mapsShortLink = "https://maps.app.goo.gl/TjPKrPcCSKfzE6bz6"

/** Opens the pin. */
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${geoPair}`

/** Opens turn-by-turn directions from wherever the visitor is. */
export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${geoPair}&travelmode=driving`

/** Embedded map frame on the contact page. */
export const mapsEmbed = `https://www.google.com/maps?q=${geoPair}&z=16&hl=en&output=embed`

export const mapsQuery = encodeURIComponent(`${siteConfig.name}, ${addressSingleLine}`)

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.contact.phonePrimary.digits}?text=${encodeURIComponent(message)}`
}

export function mailtoLink(subject: string, body?: string) {
  const params = new URLSearchParams({ subject })
  if (body) params.set("body", body)
  return `mailto:${siteConfig.contact.email}?${params.toString()}`
}

/** Standard enquiry wording reused by product pages, WhatsApp and mailto links. */
export function productEnquiryMessage(productName: string) {
  return `Hello, I am interested in purchasing ${productName}. Please share availability, specification, MOQ, packaging and quotation.`
}
