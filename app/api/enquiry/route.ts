import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"
import { Resend } from "resend"

import { addressLines, siteConfig, whatsappLink } from "@/lib/site-config"
import { logEnquiry } from "@/lib/logger"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/* ------------------------------ Validation ------------------------------- */

const enquirySchema = z.object({
  kind: z.enum(["quote", "general"]).default("quote"),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid business email").max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  product: z.string().trim().max(200).optional().or(z.literal("")),
  quantity: z.string().trim().max(120).optional().or(z.literal("")),
  specification: z.string().trim().max(2000).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a few details about your requirement").max(4000),
  /** Site path the form was submitted from, so the team knows which page produced the lead. */
  page: z.string().trim().max(300).optional().or(z.literal("")),
  /**
   * Honeypot — real users never see this field, so anything in it means a bot.
   * It is accepted by the schema on purpose: rejecting it here would return a
   * validation error that tells a script exactly which field gave it away.
   * The handler silently accepts these submissions instead.
   */
  website: z.string().max(500).optional(),
  /** Milliseconds the form was on screen before submission. */
  elapsed: z.number().int().nonnegative().optional(),
})

type Enquiry = z.infer<typeof enquirySchema>

/* ------------------------------ Rate limiting ---------------------------- */

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

/**
 * Per-process, in-memory throttle. Enough to stop casual form abuse on a
 * single-instance deployment; swap for a shared store if the site is ever run
 * across multiple instances.
 */
function rateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)

  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  }
  return false
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  return (forwarded?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown").trim()
}

/* --------------------------------- Mail ---------------------------------- */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** Stops header injection via values that end up in Subject / Reply-To. */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 200)
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value
}

/** Short, human-quotable reference shown to the buyer and in both emails, e.g. SA-260930-K7QX. */
function makeReference(now: Date): string {
  const ymd = now.toISOString().slice(2, 10).replace(/-/g, "")
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let suffix = ""
  for (let i = 0; i < 4; i++) suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  return `SA-${ymd}-${suffix}`
}

interface OutgoingMail {
  from: string
  to: string
  replyTo?: string
  subject: string
  text: string
  html: string
}

interface Mailer {
  /** Bare sender address, e.g. quotes@sheetalaromatics.com. */
  from: string
  /** True when the sender is Resend's shared test address, which can only mail the account owner. */
  testSender: boolean
  send(mail: OutgoingMail): Promise<void>
}

/**
 * Picks the first configured provider: Resend (API key), then any SMTP server,
 * then Gmail with an App Password.
 */
function buildTransport(): Mailer | null {
  const { RESEND_API_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, GMAIL_USER, GMAIL_APP_PASSWORD } =
    process.env

  if (RESEND_API_KEY) {
    const resend = new Resend(RESEND_API_KEY)
    // onboarding@resend.dev works before a domain is verified, but only for mail to the Resend account owner.
    const from = process.env.RESEND_FROM ?? process.env.CONTACT_FROM ?? "onboarding@resend.dev"
    return {
      from,
      testSender: from.endsWith("@resend.dev"),
      async send(mail) {
        // The SDK reports API failures in `error` rather than throwing.
        const { error } = await resend.emails.send(mail)
        if (error) throw new Error(`Resend ${error.name}: ${error.message}`)
      },
    }
  }

  const smtp = SMTP_HOST && SMTP_USER && SMTP_PASS
  if (smtp || (GMAIL_USER && GMAIL_APP_PASSWORD)) {
    const transporter = smtp
      ? nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT ?? 587),
          secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        })
      : nodemailer.createTransport({
          service: "gmail",
          // Google shows App Passwords in groups of four; accept them pasted with spaces.
          auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD!.replace(/\s+/g, "") },
        })
    return {
      from: process.env.CONTACT_FROM ?? (smtp ? SMTP_USER! : GMAIL_USER!),
      testSender: false,
      async send(mail) {
        await transporter.sendMail(mail)
      },
    }
  }

  return null
}

/* ----------------------------- Email templates --------------------------- */

const BRAND = { ink: "#12432F", brass: "#A67A2E", muted: "#5B6B63", line: "#E3E8E5", paper: "#F6F8F7" }
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

/** Table-based shell so the layout survives Outlook and Gmail's style stripping. */
function emailShell(preheader: string, body: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.paper}">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:8px;overflow:hidden">
<tr><td style="background:${BRAND.ink};padding:20px 28px;font:italic 900 18px ${FONT};letter-spacing:.5px;color:#FF5A2B">SHEETAL AROMATICS
<div style="font:400 12px ${FONT};font-style:normal;letter-spacing:0;color:#C2DCCF;margin-top:4px">${escapeHtml(siteConfig.tagline)}</div></td></tr>
<tr><td style="padding:28px;font:15px/1.6 ${FONT};color:#1D2A24">${body}</td></tr>
<tr><td style="padding:18px 28px;background:${BRAND.paper};border-top:1px solid ${BRAND.line};font:12px/1.6 ${FONT};color:${BRAND.muted}">
${escapeHtml(siteConfig.name)} · ${addressLines.map(escapeHtml).join(", ")}<br>
<a href="${siteConfig.url}" style="color:${BRAND.ink}">${escapeHtml(siteConfig.domain)}</a> · ${escapeHtml(siteConfig.contact.phonePrimary.display)} · ${escapeHtml(siteConfig.contact.email)}
</td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

function detailsTable(rows: [string, string][]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 4px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:9px 14px 9px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.muted};font:13px ${FONT};vertical-align:top;white-space:nowrap">${escapeHtml(
        label,
      )}</td><td style="padding:9px 0;border-bottom:1px solid ${BRAND.line};font:14px/1.5 ${FONT};color:#1D2A24">${escapeHtml(
        value,
      )}</td></tr>`,
  )
  .join("\n")}
</table>`
}

function button(href: string, label: string, primary = true): string {
  const style = primary
    ? `background:${BRAND.ink};color:#ffffff;border:1px solid ${BRAND.ink}`
    : `background:#ffffff;color:${BRAND.ink};border:1px solid ${BRAND.ink}`
  return `<a href="${escapeHtml(href)}" style="display:inline-block;${style};padding:10px 18px;border-radius:6px;font:600 14px ${FONT};text-decoration:none;margin:0 8px 8px 0">${escapeHtml(label)}</a>`
}

/** Notification delivered to the company inbox. */
function teamEmail(data: Enquiry, reference: string, receivedAt: Date) {
  const label = data.kind === "quote" ? "quote request" : "enquiry"
  const pageUrl = data.page ? `${siteConfig.url}${data.page.startsWith("/") ? data.page : `/${data.page}`}` : ""
  const phoneDigits = (data.phone ?? "").replace(/\D/g, "")

  const rows: [string, string][] = [
    ["Reference", reference],
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone || "—"],
    ["Country", data.country || "—"],
    ["Product", data.product || "—"],
    ["Quantity required", data.quantity || "—"],
    ["Required specification", data.specification || "—"],
    ["Submitted from", pageUrl || "—"],
    ["Received", receivedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
  ]

  const subject = sanitizeHeader(
    `${data.kind === "quote" ? "Quote request" : "Enquiry"} ${reference} — ${data.product || "General"} — ${data.name}${
      data.company ? ` (${data.company})` : ""
    }`,
  )

  const replySubject = `Re: Your ${label} ${reference} — ${siteConfig.name}`
  const replyHref = `mailto:${data.email}?subject=${encodeURIComponent(replySubject)}`
  // Only offer WhatsApp when the number looks like it carries a country code.
  const whatsappHref = phoneDigits.length >= 10 ? `https://wa.me/${phoneDigits}` : ""

  const text = [
    `New ${label} from ${siteConfig.domain}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
    "",
    "Reply to this email to respond to the buyer directly.",
  ].join("\n")

  const html = emailShell(
    `${data.name}${data.company ? ` (${data.company})` : ""} — ${data.product || "General enquiry"}`,
    `<p style="margin:0 0 4px;font:600 12px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.brass}">New ${escapeHtml(
      label,
    )}</p>
<h1 style="margin:0 0 16px;font:600 22px/1.3 ${FONT};color:${BRAND.ink}">${escapeHtml(data.product || "General enquiry")}</h1>
${detailsTable(rows)}
<p style="margin:22px 0 6px;font:600 13px ${FONT};color:${BRAND.muted}">Message</p>
<div style="padding:14px 16px;background:${BRAND.paper};border-radius:6px;white-space:pre-wrap;font:14px/1.6 ${FONT}">${escapeHtml(
      data.message,
    )}</div>
<div style="margin-top:24px">${button(replyHref, "Reply to buyer")}${whatsappHref ? button(whatsappHref, "WhatsApp buyer", false) : ""}</div>
<p style="margin:12px 0 0;font:12px ${FONT};color:${BRAND.muted}">Pressing Reply in your mail app also goes straight to the buyer.</p>`,
  )

  return { subject, text, html }
}

/** Acknowledgement sent to the buyer. */
function customerEmail(data: Enquiry, reference: string) {
  const label = data.kind === "quote" ? "quote request" : "enquiry"
  // Short fields only, and trimmed: the free-text message is not echoed back so
  // the form cannot be used to relay arbitrary text to a third-party inbox.
  const rows: [string, string][] = [
    ["Reference", reference],
    ...(data.product ? ([["Product", truncate(data.product, 120)]] as [string, string][]) : []),
    ...(data.quantity ? ([["Quantity", truncate(data.quantity, 120)]] as [string, string][]) : []),
    ...(data.specification ? ([["Specification", truncate(data.specification, 300)]] as [string, string][]) : []),
  ]

  const subject = `We have received your ${label} — ${siteConfig.name} (Ref ${reference})`
  const whatsapp = whatsappLink(`Hello, my enquiry reference is ${reference}.`)

  const text = [
    `Dear ${data.name},`,
    "",
    `Thank you for contacting ${siteConfig.name}. We have received your ${label} and our team will review it and respond by email.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "If you have a specification sheet, drawing or any further detail, simply reply to this email.",
    "",
    `Phone / WhatsApp: ${siteConfig.contact.phonePrimary.display}`,
    `Email: ${siteConfig.contact.email}`,
    `Hours: ${siteConfig.businessHours.summary}`,
    "",
    "Regards,",
    siteConfig.name,
    siteConfig.url,
  ].join("\n")

  const html = emailShell(
    `Thank you — we have your ${label} (Ref ${reference}).`,
    `<h1 style="margin:0 0 14px;font:600 22px/1.3 ${FONT};color:${BRAND.ink}">Thank you, ${escapeHtml(
      truncate(data.name, 60),
    )}</h1>
<p style="margin:0 0 14px">We have received your ${escapeHtml(label)} and our team will review it and respond by email.</p>
${detailsTable(rows)}
<p style="margin:20px 0 14px">If you have a specification sheet, drawing or any further detail, simply reply to this email and it will reach our team.</p>
<div style="margin:6px 0 10px">${button(whatsapp, "Message us on WhatsApp")}${button(`${siteConfig.url}/products`, "Browse products", false)}</div>
<p style="margin:16px 0 0;font:13px/1.6 ${FONT};color:${BRAND.muted}">
Phone: ${escapeHtml(siteConfig.contact.phonePrimary.display)} · ${escapeHtml(siteConfig.contact.phoneSecondary.display)}<br>
Hours: ${escapeHtml(siteConfig.businessHours.summary)}</p>
<p style="margin:20px 0 0">Regards,<br><strong>${escapeHtml(siteConfig.name)}</strong></p>`,
  )

  return { subject, text, html }
}

/* --------------------------------- Handler ------------------------------- */

export async function POST(request: NextRequest) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from this connection. Please try again shortly, or email us directly." },
      { status: 429 },
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 })
  }

  const parsed = enquirySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 },
    )
  }

  const data = parsed.data

  // Silently accept obvious bot submissions so scripts get no useful signal.
  if (data.website || (typeof data.elapsed === "number" && data.elapsed < 2000)) {
    return NextResponse.json({ ok: true, message: "Thank you — your enquiry has been received." })
  }

  const receivedAt = new Date()
  const reference = makeReference(receivedAt)
  const team = teamEmail(data, reference, receivedAt)
  const clientIp = clientKey(request)

  const mail = buildTransport()

  if (!mail) {
    // No credentials configured — log immediately so the quote is NEVER lost, and tell
    // the visitor honestly instead of showing a false success message.
    console.error("[enquiry] No mail transport configured. Enquiry recorded in logs/enquiries.log:\n" + team.text)
    await logEnquiry({
      reference,
      kind: data.kind,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      country: data.country,
      product: data.product,
      quantity: data.quantity,
      specification: data.specification,
      message: data.message,
      page: data.page,
      ip: clientIp,
      emailDelivered: false,
      error: "No mail transport configured (set RESEND_API_KEY, SMTP_* or GMAIL_* in the environment)",
    })

    return NextResponse.json(
      {
        ok: false,
        error: `The enquiry form is not connected to email yet. Please write to ${siteConfig.contact.email} and we will respond. (Your quote Ref ${reference} has been logged)`,
      },
      { status: 503 },
    )
  }

  const inbox = process.env.CONTACT_TO ?? siteConfig.contact.email

  try {
    await mail.send({
      from: `${siteConfig.name} Website <${mail.from}>`,
      to: inbox,
      replyTo: sanitizeHeader(data.email),
      subject: team.subject,
      text: team.text,
      html: team.html,
    })

    await logEnquiry({
      reference,
      kind: data.kind,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      country: data.country,
      product: data.product,
      quantity: data.quantity,
      specification: data.specification,
      message: data.message,
      page: data.page,
      ip: clientIp,
      emailDelivered: true,
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error(`[enquiry] ${reference} failed to send:`, error)
    await logEnquiry({
      reference,
      kind: data.kind,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      country: data.country,
      product: data.product,
      quantity: data.quantity,
      specification: data.specification,
      message: data.message,
      page: data.page,
      ip: clientIp,
      emailDelivered: false,
      error: errMsg,
    })

    return NextResponse.json(
      { ok: false, error: `We could not send your enquiry. Please email ${siteConfig.contact.email} directly.` },
      { status: 502 },
    )
  }

  // The buyer's acknowledgement is best-effort: the enquiry has already reached
  // the team, so a failure here is logged but never reported as a failed send.
  let acknowledged = false
  // Skipped while on Resend's test sender, which cannot deliver to buyers' addresses.
  if (process.env.CONTACT_AUTOREPLY !== "false" && !mail.testSender) {
    const ack = customerEmail(data, reference)
    try {
      await mail.send({
        from: `${siteConfig.name} <${mail.from}>`,
        to: sanitizeHeader(data.email),
        replyTo: inbox,
        subject: ack.subject,
        text: ack.text,
        html: ack.html,
      })
      acknowledged = true
    } catch (error) {
      console.error(`[enquiry] ${reference} acknowledgement to buyer failed:`, error)
    }
  }

  return NextResponse.json({
    ok: true,
    reference,
    message: acknowledged
      ? "Thank you — your enquiry has been received. A confirmation has been sent to your email, and our team will respond shortly."
      : "Thank you — your enquiry has been received. Our team will respond by email.",
  })
}
