import { type NextRequest, NextResponse } from "next/server"
import { logVisit } from "@/lib/logger"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    let body = { path: "/", referrer: "" }
    try {
      body = await request.json()
    } catch {
      // Body may be empty if called via beacon or generic ping
    }

    const forwarded = request.headers.get("x-forwarded-for")
    const ip = (
      forwarded?.split(",")[0] ??
      request.headers.get("x-real-ip") ??
      request.headers.get("cf-connecting-ip") ??
      "127.0.0.1"
    ).trim()

    const userAgent = request.headers.get("user-agent") ?? "unknown"
    const referrer = body.referrer || request.headers.get("referer") || "direct"
    const path = body.path || request.nextUrl.pathname || "/"

    await logVisit({
      ip,
      path,
      referrer,
      userAgent,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[log-visit] Error recording visit:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
