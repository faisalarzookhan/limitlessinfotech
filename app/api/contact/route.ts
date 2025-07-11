import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json()

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Send email to Limitless Infotech
    const adminEmail = await resend.emails.send({
      from: "Contact Form <noreply@limitless.com>",
      to: ["info@limitless.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #1e40af 100%); color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #3b82f6, #06b6d4); padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">NEW CONTACT FORM SUBMISSION</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">LIMITLESS INFOTECH SOLUTIONS</p>
          </div>
          <div style="padding: 30px;">
            <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #60a5fa;">Contact Details:</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              
              <h3 style="color: #60a5fa; margin-top: 20px;">Message:</h3>
              <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center; font-size: 12px; opacity: 0.7;">
              <p>Submitted on: ${new Date().toLocaleString()}</p>
              <p>Please respond within 24 hours for optimal client experience.</p>
            </div>
          </div>
        </div>
      `,
    })

    // Send confirmation email to client
    const clientEmail = await resend.emails.send({
      from: "Limitless Infotech <noreply@limitless.com>",
      to: [email],
      subject: "Thank you for contacting Limitless Infotech Solutions",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #1e40af 100%); color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #3b82f6, #06b6d4); padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">LIMITLESS INFOTECH</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">SOLUTION'S PVT LTD</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #60a5fa; margin-top: 0;">Thank You, ${firstName} ${lastName}!</h2>
            <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
              
              <h3 style="color: #fbbf24; margin-top: 20px;">🚀 What's Next?</h3>
              <ul style="padding-left: 20px;">
                <li>Our experts will review your requirements</li>
                <li>We'll prepare a customized solution proposal</li>
                <li>Schedule a consultation call to discuss your project</li>
                <li>Provide you with a detailed timeline and quote</li>
              </ul>

              <div style="background: rgba(59, 130, 246, 0.1); border-radius: 6px; padding: 15px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <h4 style="margin-top: 0; color: #60a5fa;">Your Inquiry Summary:</h4>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? "..." : ""}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <h3 style="color: #fbbf24;">🏗️ Our Core Services</h3>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 20px 0;">
                <div style="background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 6px; text-align: center;">
                  <div style="font-size: 20px;">💻</div>
                  <div style="font-size: 12px;">Web Development</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 6px; text-align: center;">
                  <div style="font-size: 20px;">📱</div>
                  <div style="font-size: 12px;">Mobile Apps</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 6px; text-align: center;">
                  <div style="font-size: 20px;">⚙️</div>
                  <div style="font-size: 12px;">Custom Software</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 6px; text-align: center;">
                  <div style="font-size: 20px;">📊</div>
                  <div style="font-size: 12px;">CRM Solutions</div>
                </div>
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center; font-size: 12px; opacity: 0.7;">
              <p><strong>"Where Innovation Meets Execution"</strong></p>
              <p>Empowering Businesses with Technology that is Secure, Unique, and Limitless</p>
              <p style="margin-top: 15px;">
                <span style="background: rgba(59, 130, 246, 0.2); padding: 4px 8px; border-radius: 4px; margin: 0 5px;">🔐 Secure</span>
                <span style="background: rgba(251, 146, 60, 0.2); padding: 4px 8px; border-radius: 4px; margin: 0 5px;">🧬 Unique</span>
                <span style="background: rgba(6, 182, 212, 0.2); padding: 4px 8px; border-radius: 4px; margin: 0 5px;">⚡ Limitless</span>
              </p>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      adminEmailId: adminEmail.id,
      clientEmailId: clientEmail.id,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send contact form",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
