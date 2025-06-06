import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"

const createDomainSchema = z.object({
  domain: z.string().min(3),
  type: z.enum(["primary", "addon", "subdomain"]),
  document_root: z.string().optional(),
  ssl_enabled: z.boolean().default(false),
})

// Mock domain data - replace with actual database operations
const mockDomains = [
  {
    id: "1",
    domain: "limitless.com",
    type: "primary",
    document_root: "/public_html",
    ssl_enabled: true,
    status: "active",
    created_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "2",
    domain: "limitlessinfotech.com",
    type: "addon",
    document_root: "/public_html/limitlessinfotech",
    ssl_enabled: true,
    status: "active",
    created_at: "2024-01-12T00:00:00Z",
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
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    let domains = mockDomains

    if (type) {
      domains = domains.filter((d) => d.type === type)
    }

    if (status) {
      domains = domains.filter((d) => d.status === status)
    }

    return NextResponse.json({
      success: true,
      data: domains,
    })
  } catch (error) {
    console.error("Get domains error:", error)
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

    if (!user || (user.role !== "admin" && user.role !== "employee")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const validation = validateRequest(createDomainSchema, body)

    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    // Simulate domain creation
    const newDomain = {
      id: Date.now().toString(),
      ...validation.data,
      status: "pending",
      created_at: new Date().toISOString(),
      created_by: user.id,
    }

    return NextResponse.json(
      {
        success: true,
        data: newDomain,
        message: "Domain created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create domain error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
