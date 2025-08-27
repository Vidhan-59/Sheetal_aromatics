import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    let emailContent = ""
    let subject = ""

    switch (type) {
      case "contact":
        subject = `Contact Form Submission from ${data.name}`
        emailContent = `
New contact form submission:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Company: ${data.company || "Not provided"}
Message: ${data.message}

Submitted at: ${new Date().toLocaleString()}
        `
        break

      case "quote":
        subject = `Quote Request from ${data.name}`
        emailContent = `
New quote request:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Company: ${data.company || "Not provided"}
Products: ${data.products}
Quantity: ${data.quantity}
Urgency: ${data.urgency}
Requirements: ${data.requirements}

Submitted at: ${new Date().toLocaleString()}
        `
        break

      case "inquiry":
        subject = `General Inquiry from ${data.name || "Website Visitor"}`
        emailContent = `
New inquiry:

${data.message || JSON.stringify(data, null, 2)}

Submitted at: ${new Date().toLocaleString()}
        `
        break

      default:
        subject = "New Website Submission"
        emailContent = JSON.stringify(data, null, 2)
    }

    // Option 1: Using Resend (recommended)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = require("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: "website@sheetalaromatics.com",
        to: "sheetalaromatics@gmail.com",
        subject: subject,
        text: emailContent,
      })
    }
    // Option 2: Using Nodemailer with Gmail
    else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const nodemailer = require("nodemailer")

      const transporter = nodemailer.createTransporter({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: "sheetalaromatics@gmail.com",
        subject: subject,
        text: emailContent,
      })
    }
    // Option 3: Using SendGrid
    else if (process.env.SENDGRID_API_KEY) {
      const sgMail = require("@sendgrid/mail")
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      await sgMail.send({
        to: "sheetalaromatics@gmail.com",
        from: "website@sheetalaromatics.com",
        subject: subject,
        text: emailContent,
      })
    } else {
      // Fallback: Log to console for development
      console.log("Email would be sent:", { subject, emailContent })
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email sending failed:", error)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}
