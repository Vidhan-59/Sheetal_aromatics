import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, products, quantity, urgency } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check for required environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("[v0] Missing Gmail configuration environment variables")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Create email content
    const emailContent = `
New Quote Request from Sheetal Aromatics Website

Customer Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Company: ${company || "Not provided"}

Quote Details:
- Products: ${products || "Not specified"}
- Quantity: ${quantity || "Not specified"}
- Urgency: ${urgency || "Standard"}

Message:
${message}

---
This email was sent from the Sheetal Aromatics website contact form.
Please respond to the customer at: ${email}
    `.trim()

    // Send email using Gmail
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "sheetalaromatics@gmail.com",
      subject: `New Quote Request from ${name} - ${products || "General Inquiry"}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, "<br>"),
    })

    console.log("[v0] Quote email sent successfully to sheetalaromatics@gmail.com")

    return NextResponse.json({
      success: true,
      message: "Quote request sent successfully! We will contact you within 24 hours.",
    })
  } catch (error) {
    console.error("[v0] Error sending quote email:", error)
    return NextResponse.json({ error: "Failed to send quote request. Please try again." }, { status: 500 })
  }
}
