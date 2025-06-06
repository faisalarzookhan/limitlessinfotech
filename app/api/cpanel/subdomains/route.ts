import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"

const createSubdomainSchema = z.object({
  subdomain: z.string().min(1),
  domain: z.string().min(3),
  document_root: z.string(),
  ssl_enabled: z.boolean().default(true),
})

const mockSubdomains = [
  {
    id: "1",
    subdomain: "api",
    domain: "limitless.com",
    full_domain: "api.limitless.com",
    document_root: "/public_html/api",
    ssl_enabled: true,
    status: "active",
    created_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "2",
    subdomain: "blog",
    domain: "limitless.com",
    full_domain: "blog.limitless.com",
    document_root: "/public_html/blog",
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
    const domain = searchParams.get("domain")

    let subdomains = mockSubdomains

    if (domain) {
      subdomains = subdomains.filter((s) => s.domain === domain)
    }

    return NextResponse.json({
      success: true,
      data: subdomains,
    })
  } catch (error) {
    console.error("Get subdomains error:", error)
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
    const validation = validateRequest(createSubdomainSchema, body)

    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    // Simulate subdomain creation
    const newSubdomain = {
      id: Date.now().toString(),
      ...validation.data,
      full_domain: `${validation.data.subdomain}.${validation.data.domain}`,
      status: "pending",
      created_at: new Date().toISOString(),
      created_by: user.id,
    }

    // Simulate DNS record creation
    setTimeout(() => {
      console.log(`DNS records created for ${newSubdomain.full_domain}`)
    }, 1000)

    return NextResponse.json(
      {
        success: true,
        data: newSubdomain,
        message: "Subdomain created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create subdomain error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
