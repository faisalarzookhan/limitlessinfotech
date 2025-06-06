import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Find user by reset token
    const user = await DatabaseService.getUserByResetToken(token)
    if (!user || !user.reset_expires || new Date() > new Date(user.reset_expires)) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await AuthService.hashPassword(password)

    // Update user password and clear reset token
    await DatabaseService.updateUser(user.id, {
      password_hash: hashedPassword,
      reset_token: null,
      reset_expires: null,
    })

    return NextResponse.json({ message: "Password reset successful" })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
