import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AuthService } from "@/lib/auth"
import { validateEmail, validatePassword } from "@/lib/validation"

/**
 * Handles POST requests for user login.
 * It takes an email and password, validates them, and returns a user object and a JWT if successful.
 * This is a mock implementation for demonstration purposes.
 * @param request - The incoming NextRequest object.
 * @returns A JSON response with the user data and sets an auth token cookie, or an error.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }
    if (!password || !validatePassword(password)) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    // In a real application:
    // 1. Fetch user from database by email.
    // 2. Compare hashed password.
    // 3. If valid, generate a JWT or session token.

    // Mocking authentication for demonstration purposes:
    if (email === "admin@example.com" && password === "password123") {
      const user = { sub: "user_admin", email: "admin@example.com", role: "admin" }
      const token = await AuthService.sign(user)

      const response = NextResponse.json({ success: true, message: "Login successful", user })
      // Set the token as an HttpOnly cookie for security
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
      return response
    } else if (email === "user@example.com" && password === "password123") {
      const user = { sub: "user_standard", email: "user@example.com", role: "client" }
      const token = await AuthService.sign(user)

      const response = NextResponse.json({ success: true, message: "Login successful", user })
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
      return response
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
