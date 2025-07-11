import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { to, subject, content, from } = await request.json()

  if (!to || !subject || !content || !from) {
    return NextResponse.json({ success: false, error: "Missing required email fields" }, { status: 400 })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Limitless Webmail <${from}>`, // Use the 'from' address provided by the client
      to: [to],
      subject: subject,
      html: `<p>${content.replace(/\n/g, "<br>")}</p>`, // Basic HTML conversion for newlines
    })

    if (error) {
      console.error("Resend email error:", error)
      return NextResponse.json({ success: false, error: error.message || "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Email sent successfully!", data })
  } catch (error) {
    console.error("Send email API error:", error)
    return NextResponse.json({ success: false, error: "An unexpected error occurred." }, { status: 500 })
  }
}
