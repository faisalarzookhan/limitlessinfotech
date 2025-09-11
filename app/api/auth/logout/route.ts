import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Handles POST requests for user logout.
 * It clears the authentication cookie, effectively logging the user out.
 * @param request - The incoming NextRequest object.
 * @returns A JSON response indicating success or failure.
 */
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true, message: "Logout successful" })
    // Clear the HttpOnly cookie
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    })
    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
