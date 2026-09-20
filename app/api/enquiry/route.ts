import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"

import { siteConfig } from "@/lib/site-config"

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

function buildTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, GMAIL_USER, GMAIL_APP_PASSWORD } = process.env

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    return {
      transporter: nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 587),
        secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      }),
      from: process.env.CONTACT_FROM ?? SMTP_USER,
    }
  }

  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    return {
      transporter: nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
      }),
      from: process.env.CONTACT_FROM ?? GMAIL_USER,
    }
  }

  return null
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

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone || "—"],
    ["Country", data.country || "—"],
    ["Product", data.product || "—"],
    ["Quantity required", data.quantity || "—"],
    ["Required specification", data.specification || "—"],
  ]

  const subject = sanitizeHeader(
    `${data.kind === "quote" ? "Quote request" : "Enquiry"} — ${data.product || "General"} — ${data.name}${
      data.company ? ` (${data.company})` : ""
    }`,
  )

  const text = [
    `New ${data.kind === "quote" ? "quote request" : "enquiry"} from ${siteConfig.domain}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    data.message,
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n")

  const html = `
    <h2 style="font:600 16px system-ui,sans-serif;margin:0 0 12px">New ${
      data.kind === "quote" ? "quote request" : "enquiry"
    } from ${escapeHtml(siteConfig.domain)}</h2>
    <table style="font:14px system-ui,sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 14px 4px 0;color:#555;vertical-align:top">${escapeHtml(
              label,
            )}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font:14px system-ui,sans-serif;margin:16px 0 4px;color:#555">Message</p>
    <p style="font:14px/1.6 system-ui,sans-serif;white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
  `

  const mail = buildTransport()

  if (!mail) {
    // No credentials configured — log rather than lose the enquiry, and tell
    // the visitor honestly instead of showing a false success message.
    console.error("[enquiry] No mail transport configured. Enquiry not delivered:\n" + text)
    return NextResponse.json(
      {
        ok: false,
        error: `The enquiry form is not connected to email yet. Please write to ${siteConfig.contact.email} and we will respond.`,
      },
      { status: 503 },
    )
  }

  try {
    await mail.transporter.sendMail({
      from: `"${siteConfig.name} Website" <${mail.from}>`,
      to: process.env.CONTACT_TO ?? siteConfig.contact.email,
      replyTo: sanitizeHeader(data.email),
      subject,
      text,
      html,
    })
  } catch (error) {
    console.error("[enquiry] Failed to send:", error)
    return NextResponse.json(
      { ok: false, error: `We could not send your enquiry. Please email ${siteConfig.contact.email} directly.` },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you — your enquiry has been received. Our team will respond by email.",
  })
}
