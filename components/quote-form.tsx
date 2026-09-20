"use client"

import { useId, useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categoryName, productsDatabase } from "@/lib/products-data"
import { siteConfig } from "@/lib/site-config"

type Kind = "quote" | "general"

interface QuoteFormProps {
  /** Pre-fills the product field, e.g. from a product page. */
  defaultProduct?: string
  defaultMessage?: string
  kind?: Kind
  className?: string
}

const initial = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  product: "",
  quantity: "",
  specification: "",
  message: "",
  website: "",
}

export function QuoteForm({ defaultProduct = "", defaultMessage = "", kind = "quote", className }: QuoteFormProps) {
  const uid = useId()
  const mountedAt = useRef(Date.now())
  const [values, setValues] = useState({ ...initial, product: defaultProduct, message: defaultMessage })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [feedback, setFeedback] = useState("")

  function update(field: keyof typeof initial, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setFeedback("")

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind, elapsed: Date.now() - mountedAt.current }),
      })
      const result = await response.json()

      if (response.ok && result.ok) {
        setStatus("sent")
        setFeedback(result.message)
        setValues({ ...initial, product: defaultProduct })
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
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    )
  }

  const field =
    "h-11 w-full rounded-md border border-border bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest-400 focus:ring-2 focus:ring-ring/25 disabled:opacity-60"
  const labelClass = "block text-sm font-medium text-foreground"

  return (
    <form onSubmit={onSubmit} className={cn("space-y-5", className)} noValidate={false}>
      {/* Honeypot: hidden from users and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
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
          />
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
          />
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
          />
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
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-country`}>
            Country
          </label>
          <input
            id={`${uid}-country`}
            className={cn(field, "mt-1.5")}
            autoComplete="country-name"
            value={values.country}
            onChange={(e) => update("country", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`${uid}-product`}>
            Product
          </label>
          <input
            id={`${uid}-product`}
            className={cn(field, "mt-1.5")}
            list={`${uid}-products`}
            placeholder="Start typing, or describe what you need"
            value={values.product}
            onChange={(e) => update("product", e.target.value)}
          />
          {/* datalist takes flat options — optgroup is not supported inside it */}
          <datalist id={`${uid}-products`}>
            {productsDatabase.map((p) => (
              <option key={p.slug} value={p.name}>
                {categoryName(p.category)}
              </option>
            ))}
          </datalist>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-quantity`}>
            Quantity required
          </label>
          <input
            id={`${uid}-quantity`}
            className={cn(field, "mt-1.5")}
            placeholder="e.g. 500 kg, 1 MT, 20 drums"
            value={values.quantity}
            onChange={(e) => update("quantity", e.target.value)}
          />
        </div>
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
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor={`${uid}-message`}>
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          rows={5}
          required
          minLength={10}
          className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest-400 focus:ring-2 focus:ring-ring/25"
          placeholder="Tell us about your requirement, intended application and destination."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {feedback}
        </p>
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
              {kind === "quote" ? "Request a Quote" : "Send Enquiry"}
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
