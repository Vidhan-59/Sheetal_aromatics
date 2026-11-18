"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { productEnquiryMessage, siteConfig, whatsappLink } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

type Kind = "quote" | "general" | "private-label"

export interface QuoteFormProps {
  /** Pre-fills the product field, e.g. from a product page. */
  defaultProduct?: string
  defaultMessage?: string
  kind?: Kind
  className?: string
  /** Pre-fill the product from ?product= after load, so the page itself can stay static. */
  prefillFromUrl?: boolean
}

interface QuoteFormClientProps extends QuoteFormProps {
  /** Suggestions for the product field; supplied by the server wrapper in quote-form.tsx. */
  productOptions: { name: string; group: string }[]
}

/** Main trading destinations, alphabetical. Anything else goes through "Other" plus a text field. */
const COUNTRIES = [
  "Argentina", "Australia", "Austria", "Bahrain", "Bangladesh", "Belgium", "Brazil", "Bulgaria", "Canada",
  "Chile", "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Ethiopia", "France", "Germany", "Ghana",
  "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Jordan",
  "Kenya", "Kuwait", "Malaysia", "Mexico", "Morocco", "Nepal", "Netherlands", "New Zealand", "Nigeria",
  "Norway", "Oman", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia",
  "Singapore", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan",
  "Tanzania", "Thailand", "Turkey", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Vietnam",
]
const OTHER_COUNTRY = "Other"
/** Must match the values accepted by the enquiry route. */
const INCOTERMS = ["EXW Ahmedabad", "FOB Indian port", "CFR", "CIF", "Not sure"]
const QUANTITY_UNITS = ["kg", "MT", "L", "drums"]

const initial = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  /** Free-text country, used when "Other" is selected. */
  countryOther: "",
  product: "",
  quantity: "",
  quantityUnit: "kg",
  incoterm: "",
  destination: "",
  specification: "",
  packaging: "",
  branding: "",
  message: "",
  website: "",
}

type Field = keyof typeof initial

export function QuoteFormClient({
  defaultProduct = "",
  defaultMessage = "",
  kind = "quote",
  className,
  productOptions,
  prefillFromUrl = false,
}: QuoteFormClientProps) {
  const uid = useId()
  const privateLabel = kind === "private-label"
  const quote = kind === "quote"
  const mountedAt = useRef(Date.now())
  /** What the form was pre-filled with, so a reset restores it and an untouched message can be spotted. */
  const prefill = useRef({ product: defaultProduct, message: defaultMessage })
  const [values, setValues] = useState({ ...initial, product: defaultProduct, message: defaultMessage })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [feedback, setFeedback] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [reference, setReference] = useState("")

  useEffect(() => {
    if (!prefillFromUrl) return
    const product = new URLSearchParams(window.location.search).get("product")?.slice(0, 200)
    if (!product) return
    const message = productEnquiryMessage(product)
    prefill.current = { product, message }
    setValues((prev) => ({ ...prev, product, message }))
  }, [prefillFromUrl])

  function update(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    // The server reports the "Other" country text under `country`.
    const key = field === "countryOther" ? "country" : field
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  function showFieldErrors(errors: Record<string, string>, summary: string) {
    setStatus("error")
    setFieldErrors(errors)
    setFeedback(Object.keys(errors).length > 1 ? "Please correct the highlighted fields." : summary)
    const first = Object.keys(errors)[0]
    if (first) document.getElementById(`${uid}-${first}`)?.focus()
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // A quote with the pre-filled message left as is and no quantity gives the team nothing to price.
    const untouched = prefill.current.message.trim() !== "" && values.message.trim() === prefill.current.message.trim()
    if (quote && untouched && !values.quantity.trim()) {
      const message = "Please add the quantity you need, or describe your requirement in the message"
      showFieldErrors({ quantity: message }, message)
      return
    }

    setStatus("sending")
    setFeedback("")
    setFieldErrors({})

    const { countryOther, ...rest } = values
    const country = values.country === OTHER_COUNTRY ? countryOther.trim() || OTHER_COUNTRY : values.country

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rest,
          country,
          quantityUnit: values.quantity.trim() ? values.quantityUnit : "",
          kind,
          page: window.location.pathname,
          elapsed: Date.now() - mountedAt.current,
        }),
      })
      const result = await response.json()

      if (response.ok && result.ok) {
        setStatus("sent")
        setFeedback(result.message)
        setReference(result.reference ?? "")
        // GA4's recommended lead event — the main organic conversion for this site.
        trackEvent("generate_lead", { form_kind: kind, product: values.product || "general" })
        setValues({ ...initial, ...prefill.current })
      } else if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        showFieldErrors(result.fieldErrors, result.error ?? "Please check the form and try again.")
      } else {
        setStatus("error")
        setFeedback(result.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setFeedback(`We could not reach the server. Please email ${siteConfig.contact.email} directly.`)
    }
  }

  if (status === "sent") {
    return (
      <div className={cn("card-quiet p-8 text-center", className)} role="status">
        <CheckCircle2 aria-hidden="true" className="mx-auto h-10 w-10 text-primary" />
        <h3 className="mt-4 text-lg font-semibold">Enquiry received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{feedback}</p>
        {reference && (
          <p className="mx-auto mt-4 inline-block rounded-md border border-border bg-muted px-3 py-1.5 text-sm">
            Your reference: <span className="font-mono font-semibold tabular-nums">{reference}</span>
          </p>
        )}
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    )
  }

  const field =
    "h-11 w-full rounded-md border border-input bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest-400 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 aria-invalid:border-destructive"
  const textarea =
    "mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest-400 focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
  const labelClass = "block text-sm font-medium text-foreground"

  /** aria-invalid / aria-describedby for a field the server (or the pre-submit check) flagged. */
  const errorProps = (key: string) =>
    fieldErrors[key] ? { "aria-invalid": true as const, "aria-describedby": `${uid}-${key}-error` } : {}
  const fieldError = (key: string) =>
    fieldErrors[key] ? (
      <p id={`${uid}-${key}-error`} className="mt-1.5 text-xs text-destructive">
        {fieldErrors[key]}
      </p>
    ) : null
  const hasFieldErrors = Object.keys(fieldErrors).length > 0

  return (
    <form
      onSubmit={onSubmit}
      aria-label={privateLabel ? "Private label enquiry" : quote ? "Request a quote" : "General enquiry"}
      className={cn("space-y-5", className)}
      noValidate={false}
    >
      {/* Honeypot: hidden from users and assistive tech, attractive to bots. `inert` also keeps
          AI browsing agents (which read the accessibility tree) from filling it in. No visible
          label, so no stray text ends up in the page content. */}
      <div aria-hidden="true" inert className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-label="Website"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-name`}>
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id={`${uid}-name`}
            className={cn(field, "mt-1.5")}
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            {...errorProps("name")}
          />
          {fieldError("name")}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${uid}-company`}>
            Company name
          </label>
          <input
            id={`${uid}-company`}
            className={cn(field, "mt-1.5")}
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            {...errorProps("company")}
          />
          {fieldError("company")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-email`}>
            Business email <span className="text-destructive">*</span>
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            className={cn(field, "mt-1.5")}
            required
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            {...errorProps("email")}
          />
          {fieldError("email")}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${uid}-phone`}>
            Phone / WhatsApp
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            className={cn(field, "mt-1.5")}
            autoComplete="tel"
            inputMode="tel"
            placeholder="Include country code"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            {...errorProps("phone")}
          />
          {fieldError("phone")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-country`}>
            Country {quote && <span className="text-destructive">*</span>}
          </label>
          <select
            id={`${uid}-country`}
            className={cn(field, "mt-1.5")}
            required={quote}
            autoComplete="country-name"
            value={values.country}
            onChange={(e) => update("country", e.target.value)}
            {...errorProps("country")}
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
            <option value={OTHER_COUNTRY}>Other</option>
          </select>
          {values.country === OTHER_COUNTRY && (
            <>
              <label className="sr-only" htmlFor={`${uid}-country-other`}>
                Country name
              </label>
              <input
                id={`${uid}-country-other`}
                className={cn(field, "mt-2")}
                required={quote}
                maxLength={80}
                placeholder="Your country"
                value={values.countryOther}
                onChange={(e) => update("countryOther", e.target.value)}
              />
            </>
          )}
          {fieldError("country")}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${uid}-product`}>
            {privateLabel ? "Product requirement" : "Product"}
          </label>
          <input
            id={`${uid}-product`}
            className={cn(field, "mt-1.5")}
            list={`${uid}-products`}
            placeholder="Start typing, or describe what you need"
            value={values.product}
            onChange={(e) => update("product", e.target.value)}
            {...errorProps("product")}
          />
          {/* datalist takes flat options — optgroup is not supported inside it. The category goes in
              `label` rather than as text, so the page text doesn't repeat category names 87 times. */}
          <datalist id={`${uid}-products`}>
            {productOptions.map((option) => (
              <option key={option.name} value={option.name} label={option.group} />
            ))}
          </datalist>
          {fieldError("product")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-quantity`}>
            {privateLabel ? "Estimated quantity" : "Quantity required"}
          </label>
          <div className="mt-1.5 flex gap-2">
            <input
              id={`${uid}-quantity`}
              className={cn(field, "min-w-0 flex-1")}
              placeholder="e.g. 500"
              value={values.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              {...errorProps("quantity")}
            />
            <label className="sr-only" htmlFor={`${uid}-quantity-unit`}>
              Quantity unit
            </label>
            <select
              id={`${uid}-quantity-unit`}
              className={cn(field, "w-24 shrink-0")}
              value={values.quantityUnit}
              onChange={(e) => update("quantityUnit", e.target.value)}
            >
              {QUANTITY_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          {fieldError("quantity")}
        </div>
        {privateLabel ? (
          <div>
            <label className={labelClass} htmlFor={`${uid}-packaging`}>
              Packaging preference
            </label>
            <input
              id={`${uid}-packaging`}
              className={cn(field, "mt-1.5")}
              placeholder="e.g. 1 kg jars, 25 kg bags, 200 L drums"
              value={values.packaging}
              onChange={(e) => update("packaging", e.target.value)}
              {...errorProps("packaging")}
            />
            {fieldError("packaging")}
          </div>
        ) : (
          <div>
            <label className={labelClass} htmlFor={`${uid}-specification`}>
              Required specification
            </label>
            <input
              id={`${uid}-specification`}
              className={cn(field, "mt-1.5")}
              placeholder="Grade, assay, packing"
              value={values.specification}
              onChange={(e) => update("specification", e.target.value)}
              {...errorProps("specification")}
            />
            {fieldError("specification")}
          </div>
        )}
      </div>

      {quote && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor={`${uid}-incoterm`}>
              Incoterm
            </label>
            <select
              id={`${uid}-incoterm`}
              className={cn(field, "mt-1.5")}
              value={values.incoterm}
              onChange={(e) => update("incoterm", e.target.value)}
              {...errorProps("incoterm")}
            >
              <option value="">Select (optional)</option>
              {INCOTERMS.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
            {fieldError("incoterm")}
          </div>
          <div>
            <label className={labelClass} htmlFor={`${uid}-destination`}>
              Destination port or city
            </label>
            <input
              id={`${uid}-destination`}
              className={cn(field, "mt-1.5")}
              maxLength={160}
              placeholder="e.g. Jebel Ali, Rotterdam, Houston"
              value={values.destination}
              onChange={(e) => update("destination", e.target.value)}
              {...errorProps("destination")}
            />
            {fieldError("destination")}
          </div>
        </div>
      )}

      {privateLabel && (
        <div>
          <label className={labelClass} htmlFor={`${uid}-branding`}>
            Branding requirements <span className="text-destructive">*</span>
          </label>
          <textarea
            id={`${uid}-branding`}
            rows={3}
            required
            minLength={10}
            className={textarea}
            placeholder="Your brand name, label content, languages and any regulatory text your market needs."
            value={values.branding}
            onChange={(e) => update("branding", e.target.value)}
            {...errorProps("branding")}
          />
          {fieldError("branding")}
        </div>
      )}

      <div>
        <label className={labelClass} htmlFor={`${uid}-message`}>
          {privateLabel ? "Additional details" : "Message"}
          {!privateLabel && <span className="text-destructive"> *</span>}
        </label>
        <textarea
          id={`${uid}-message`}
          rows={privateLabel ? 3 : 5}
          required={!privateLabel}
          minLength={privateLabel ? undefined : 10}
          className={textarea}
          placeholder={
            privateLabel
              ? "Target market, timelines, samples you need, or anything else we should know."
              : "Tell us about your requirement, intended application and destination."
          }
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          {...errorProps("message")}
        />
        {fieldError("message")}
      </div>

      {status === "error" && (
        <div role="alert" className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {feedback}
            {/* Delivery failures (not field errors): offer WhatsApp as the direct fallback. */}
            {!hasFieldErrors && (
              <>
                {" "}
                <a
                  href={whatsappLink("Hello, I tried to send an enquiry from your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2"
                >
                  Message us on WhatsApp
                </a>
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-4 w-4" />
              {quote ? "Request a Quote" : privateLabel ? "Send Private-Label Enquiry" : "Send Enquiry"}
            </>
          )}
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-xs">
          Your details are used only to answer this enquiry. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
