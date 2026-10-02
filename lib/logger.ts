import fs from "fs"
import path from "path"

const LOGS_DIR = path.join(process.cwd(), "logs")

function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true })
  }
}

export interface VisitLogEntry {
  timestamp?: string
  ip: string
  path: string
  referrer?: string
  userAgent?: string
}

export interface EnquiryLogEntry {
  timestamp?: string
  reference: string
  kind: string
  name: string
  company?: string
  email: string
  phone?: string
  country?: string
  product?: string
  quantity?: string
  specification?: string
  message: string
  ip: string
  page?: string
  emailDelivered: boolean
  error?: string
}

export async function logVisit(entry: VisitLogEntry): Promise<void> {
  try {
    ensureLogsDir()
    const now = new Date()
    const timeStr = now.toISOString()
    const readableTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })

    // 1. Human-readable line in visitors.log
    const humanLine = `[${readableTime} IST] IP: ${entry.ip || "unknown"} | PATH: ${entry.path || "/"} | REFERRER: ${entry.referrer || "direct"} | UA: ${entry.userAgent || "unknown"}\n`
    await fs.promises.appendFile(path.join(LOGS_DIR, "visitors.log"), humanLine, "utf-8")

    // 2. Structured JSON in visitors.jsonl
    const jsonLine = JSON.stringify({
      timestamp: timeStr,
      readableTime,
      ...entry,
    }) + "\n"
    await fs.promises.appendFile(path.join(LOGS_DIR, "visitors.jsonl"), jsonLine, "utf-8")
  } catch (err) {
    console.error("[logger] Failed to write visit log:", err)
  }
}

export async function logEnquiry(entry: EnquiryLogEntry): Promise<void> {
  try {
    ensureLogsDir()
    const now = new Date()
    const timeStr = now.toISOString()
    const readableTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })

    const humanBlock = [
      `--------------------------------------------------------------------------------`,
      `[${readableTime} IST] ENQUIRY / QUOTE: Ref ${entry.reference} (${entry.kind.toUpperCase()})`,
      `Status: ${entry.emailDelivered ? "EMAIL DELIVERED TO SHEETALAROMATICS@GMAIL.COM" : "PENDING EMAIL TRANSPORT / LOGGED"}`,
      `Name: ${entry.name}`,
      `Company: ${entry.company || "N/A"}`,
      `Email: ${entry.email}`,
      `Phone: ${entry.phone || "N/A"}`,
      `Country: ${entry.country || "N/A"}`,
      `Product: ${entry.product || "N/A"}`,
      `Quantity: ${entry.quantity || "N/A"}`,
      `Specification: ${entry.specification || "N/A"}`,
      `Page: ${entry.page || "N/A"}`,
      `IP: ${entry.ip}`,
      `Message:`,
      entry.message,
      ...(entry.error ? [`Error: ${entry.error}`] : []),
      `--------------------------------------------------------------------------------\n`,
    ].join("\n")

    await fs.promises.appendFile(path.join(LOGS_DIR, "enquiries.log"), humanBlock, "utf-8")

    const jsonLine = JSON.stringify({
      timestamp: timeStr,
      readableTime,
      ...entry,
    }) + "\n"
    await fs.promises.appendFile(path.join(LOGS_DIR, "enquiries.jsonl"), jsonLine, "utf-8")
  } catch (err) {
    console.error("[logger] Failed to write enquiry log:", err)
  }
}
