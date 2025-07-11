import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AuthService } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const cookieToken = request.cookies.get("auth-token")?.value

    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : cookieToken

    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 })
    }

    const user = await AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 })
    }

    // Return user info without sensitive data
    return NextResponse.json({
      success: true,
      user: {
        id: user.sub,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Get user info error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
