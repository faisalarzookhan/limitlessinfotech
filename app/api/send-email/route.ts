import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Resend } from "resend" // Assuming Resend is installed and configured
import { validateEmail, validateString } from "@/lib/validation"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, text, from = "onboarding@resend.dev" } = await request.json()

    // Basic validation
    if (!validateEmail(to)) {
      return NextResponse.json({ error: "A valid 'to' email address is required." }, { status: 400 })
    }
    if (!validateString(subject, 1, 255)) {
      return NextResponse.json({ error: "Subject is required and must be between 1-255 characters." }, { status: 400 })
    }
    if (!html && !text) {
      return NextResponse.json({ error: "Either HTML or plain text body is required." }, { status: 400 })
    }

    // In a real application, you would use an actual email sending service.
    // This example uses Resend, but you could use Nodemailer with SMTP, SendGrid, Mailgun, etc.

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Skipping actual email sending.")
      return NextResponse.json({
        success: true,
        message: "Email sending simulated (RESEND_API_KEY not set).",
        mockData: { to, subject, html, text, from },
      })
    }

    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      html: html,
      text: text,
    })

    if (error) {
      console.error("Resend email error:", error)
      return NextResponse.json({ error: error.message || "Failed to send email." }, { status: 500 })
    }

    console.log("Email sent successfully via Resend:", data)
    return NextResponse.json({ success: true, message: "Email sent successfully!", data })
  } catch (error) {
    console.error("Send email API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
