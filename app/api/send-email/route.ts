import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, content, from = "noreply@limitless.com" } = await request.json()

    if (!to || !subject || !content) {
      return NextResponse.json({ error: "Missing required fields: to, subject, content" }, { status: 400 })
    }

    const data = await resend.emails.send({
      from: `Limitless Infotech <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #1e40af 100%); color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #3b82f6, #06b6d4); padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">LIMITLESS INFOTECH</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">SOLUTION'S PVT LTD</p>
          </div>
          <div style="padding: 30px;">
            <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              ${content.replace(/\n/g, "<br>")}
            </div>
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center; font-size: 12px; opacity: 0.7;">
              <p>This email was sent from Limitless Infotech Solutions</p>
              <p>Where Innovation Meets Execution</p>
              <p style="margin-top: 10px;">
                <span style="background: rgba(59, 130, 246, 0.2); padding: 4px 8px; border-radius: 4px; margin: 0 5px;">🔐 Secure</span>
                <span style="background: rgba(251, 146, 60, 0.2); padding: 4px 8px; border-radius: 4px; margin: 0 5px;">🧬 Unique</span>
                <span style="background: rgba(6, 182, 212, 0.2); padding: 4px 8px; border-radius: 4px; margin: 0 5px;">⚡ Limitless</span>
              </p>
            </div>
          </div>
        </div>
      `,
      text: content,
    })

    return NextResponse.json({
      success: true,
      messageId: data.id,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
