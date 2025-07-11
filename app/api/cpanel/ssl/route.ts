import { NextResponse } from "next/server"

// Mock data for SSL certificates
let mockSslCertificates = [
  {
    id: "ssl_1",
    domain: "limitlessinfotech.com",
    issuer: "Let's Encrypt",
    status: "Active",
    expiryDate: "2024-10-15",
    autoRenew: true,
  },
  {
    id: "ssl_2",
    domain: "clientportal.net",
    issuer: "Comodo",
    status: "Active",
    expiryDate: "2025-03-20",
    autoRenew: false,
  },
  {
    id: "ssl_3",
    domain: "dev.limitlessinfotech.com",
    issuer: "Self-Signed",
    status: "Expired",
    expiryDate: "2024-01-01",
    autoRenew: false,
  },
]

export async function GET() {
  return NextResponse.json({ success: true, certificates: mockSslCertificates })
}

export async function POST(request: Request) {
  const { action, domain, id, autoRenew } = await request.json()

  if (action === "install") {
    if (!domain) {
      return NextResponse.json({ success: false, error: "Domain is required for installation" }, { status: 400 })
    }
    const newCert = {
      id: `ssl_${Date.now()}`,
      domain,
      issuer: "Let's Encrypt", // Mock issuer
      status: "Installing",
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 90 days from now
      autoRenew: true,
    }
    mockSslCertificates.push(newCert)

    // Simulate installation
    setTimeout(() => {
      const installedCert = mockSslCertificates.find((c) => c.id === newCert.id)
      if (installedCert) {
        installedCert.status = "Active"
      }
      console.log(`SSL for ${domain} installed.`)
    }, 3000)

    return NextResponse.json({ success: true, message: "SSL installation initiated.", certificate: newCert })
  } else if (action === "delete") {
    if (!id) {
      return NextResponse.json({ success: false, error: "Certificate ID is required" }, { status: 400 })
    }
    const initialLength = mockSslCertificates.length
    mockSslCertificates = mockSslCertificates.filter((cert) => cert.id !== id)
    if (mockSslCertificates.length < initialLength) {
      return NextResponse.json({ success: true, message: `Certificate ${id} deleted.` })
    } else {
      return NextResponse.json({ success: false, error: "Certificate not found" }, { status: 404 })
    }
  } else if (action === "toggle_auto_renew") {
    if (!id || typeof autoRenew !== "boolean") {
      return NextResponse.json(
        { success: false, error: "Certificate ID and autoRenew status are required" },
        { status: 400 },
      )
    }
    const cert = mockSslCertificates.find((c) => c.id === id)
    if (cert) {
      cert.autoRenew = autoRenew
      return NextResponse.json({ success: true, message: `Auto-renew for ${cert.domain} set to ${autoRenew}.` })
    } else {
      return NextResponse.json({ success: false, error: "Certificate not found" }, { status: 404 })
    }
  } else {
    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  }
}
