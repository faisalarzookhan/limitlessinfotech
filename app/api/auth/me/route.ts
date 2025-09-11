import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AuthService } from "@/lib/auth"

/**
 * Handles GET requests to fetch the current user's authentication status and data.
 * It checks for an authentication token in the cookies, verifies it, and returns the user's data.
 * @param request - The incoming NextRequest object.
 * @returns A JSON response with the user data and authentication status, or an error.
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ user: null, isAuthenticated: false }, { status: 200 })
    }

    const user = await AuthService.verifyToken(token)

    if (!user) {
      // If token is invalid or expired, clear the cookie
      const response = NextResponse.json({ user: null, isAuthenticated: false }, { status: 200 })
      response.cookies.set("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      })
      return response
    }

    return NextResponse.json({ user, isAuthenticated: true }, { status: 200 })
  } catch (error) {
    console.error("Auth /me error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
