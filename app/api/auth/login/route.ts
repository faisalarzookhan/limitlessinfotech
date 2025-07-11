import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
  }

  // In a real application, you would:
  // 1. Query your database to find a user with the given email.
  // 2. Hash the provided password and compare it with the stored hashed password.
  // 3. If credentials are valid, generate a JWT.

  // Mock authentication for demo purposes
  if (email === "test@example.com" && password === "password123") {
    const user = { id: "user_123", email: "test@example.com", role: "user" }
    const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" })

    return NextResponse.json({ success: true, token })
  } else if (email === "admin@example.com" && password === "admin123") {
    const user = { id: "admin_456", email: "admin@example.com", role: "admin" }
    const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" })

    return NextResponse.json({ success: true, token })
  } else {
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  }
}
