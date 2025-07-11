import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Check if the email exists in your database
    // 2. Generate a secure reset token
    // 3. Store the token with an expiration time
    // 4. Send the reset email

    // For demo purposes, we'll just simulate sending an email
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`

    try {
      await resend.emails.send({
        from: "Limitless Infotech <noreply@limitless.com>",
        to: [email],
        subject: "Password Reset Request - Limitless Infotech",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #1e40af 100%); color: white; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #3b82f6, #06b6d4); padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">PASSWORD RESET REQUEST</h1>
              <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">LIMITLESS INFOTECH SOLUTIONS</p>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #60a5fa; margin-top: 0;">Reset Your Password</h2>
              <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
                
                <p>To reset your password, click the button below:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" style="background: linear-gradient(90deg, #3b82f6, #06b6d4); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                    Reset Password
                  </a>
                </div>
                
                <p style="font-size: 12px; color: #94a3b8;">If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="font-size: 12px; word-break: break-all; color: #60a5fa;">${resetUrl}</p>
              </div>
              
              <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center; font-size: 12px; opacity: 0.7;">
                <p><strong>Security Notice:</strong></p>
                <p>This link will expire in 1 hour for your security.</p>
                <p>If you didn't request this reset, please contact our support team immediately.</p>
              </div>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      // Don't expose email sending errors to the client for security
    }

    // Always return success to prevent email enumeration attacks
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, we've sent a password reset link.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
