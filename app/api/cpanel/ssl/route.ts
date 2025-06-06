import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

const mockSSLCertificates = [
  {
    id: "1",
    domain: "limitless.com",
    issuer: "Let's Encrypt",
    expires: "2024-04-15T00:00:00Z",
    status: "valid",
    auto_renew: true,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    domain: "*.limitless.com",
    issuer: "Let's Encrypt",
    expires: "2024-03-20T00:00:00Z",
    status: "expiring",
    auto_renew: true,
    created_at: "2024-01-20T00:00:00Z",
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
    const status = searchParams.get("status")

    let certificates = mockSSLCertificates

    if (domain) {
      certificates = certificates.filter((c) => c.domain === domain || c.domain === `*.${domain}`)
    }

    if (status) {
      certificates = certificates.filter((c) => c.status === status)
    }

    return NextResponse.json({
      success: true,
      data: certificates,
    })
  } catch (error) {
    console.error("Get SSL certificates error:", error)
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
    const { domain, type = "letsencrypt" } = body

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 })
    }

    // Simulate SSL certificate installation
    const newCertificate = {
      id: Date.now().toString(),
      domain,
      issuer: type === "letsencrypt" ? "Let's Encrypt" : "Custom CA",
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
      status: "installing",
      auto_renew: type === "letsencrypt",
      created_at: new Date().toISOString(),
      created_by: user.id,
    }

    return NextResponse.json(
      {
        success: true,
        data: newCertificate,
        message: "SSL certificate installation started",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Install SSL certificate error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
