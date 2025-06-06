import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"

const createEmailSchema = z.object({
  username: z.string().min(1),
  domain: z.string().min(3),
  password: z.string().min(8),
  quota: z.number().min(1).max(10000),
})

const mockEmailAccounts = [
  {
    id: "1",
    email: "admin@limitless.com",
    quota: 1000,
    used: 245,
    created_at: "2024-01-10T00:00:00Z",
    last_login: "2024-01-15T14:30:00Z",
    status: "active",
  },
  {
    id: "2",
    email: "support@limitless.com",
    quota: 500,
    used: 89,
    created_at: "2024-01-12T00:00:00Z",
    last_login: "2024-01-15T09:15:00Z",
    status: "active",
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain")

    let accounts = mockEmailAccounts

    if (domain) {
      accounts = accounts.filter((a) => a.email.endsWith(`@${domain}`))
    }

    return NextResponse.json({
      success: true,
      data: accounts,
    })
  } catch (error) {
    console.error("Get email accounts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const validation = validateRequest(createEmailSchema, body)

    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    // Simulate email account creation
    const newAccount = {
      id: Date.now().toString(),
      email: `${validation.data.username}@${validation.data.domain}`,
      quota: validation.data.quota,
      used: 0,
      created_at: new Date().toISOString(),
      last_login: null,
      status: "active",
      created_by: user.id,
    }

    return NextResponse.json(
      {
        success: true,
        data: newAccount,
        message: "Email account created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create email account error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
