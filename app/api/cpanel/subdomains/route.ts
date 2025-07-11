import { NextResponse } from "next/server"

// Mock data for subdomains
let mockSubdomains = [
  {
    id: "sub_1",
    name: "blog",
    domain: "limitlessinfotech.com",
    fullDomain: "blog.limitlessinfotech.com",
    documentRoot: "/public_html/blog",
    created: "2023-02-01",
  },
  {
    id: "sub_2",
    name: "dev",
    domain: "limitlessinfotech.com",
    fullDomain: "dev.limitlessinfotech.com",
    documentRoot: "/public_html/dev",
    created: "2023-04-10",
  },
  {
    id: "sub_3",
    name: "app",
    domain: "clientportal.net",
    fullDomain: "app.clientportal.net",
    documentRoot: "/public_html/app",
    created: "2023-07-15",
  },
]

export async function GET() {
  return NextResponse.json({ success: true, subdomains: mockSubdomains })
}

export async function POST(request: Request) {
  const { action, name, domain, documentRoot, id } = await request.json()

  if (action === "create") {
    if (!name || !domain || !documentRoot) {
      return NextResponse.json(
        { success: false, error: "Subdomain name, domain, and document root are required" },
        { status: 400 },
      )
    }
    const newSubdomain = {
      id: `sub_${Date.now()}`,
      name,
      domain,
      fullDomain: `${name}.${domain}`,
      documentRoot,
      created: new Date().toISOString().split("T")[0],
    }
    mockSubdomains.push(newSubdomain)
    return NextResponse.json({ success: true, message: "Subdomain created successfully.", subdomain: newSubdomain })
  } else if (action === "delete") {
    if (!id) {
      return NextResponse.json({ success: false, error: "Subdomain ID is required" }, { status: 400 })
    }
    const initialLength = mockSubdomains.length
    mockSubdomains = mockSubdomains.filter((sub) => sub.id !== id)
    if (mockSubdomains.length < initialLength) {
      return NextResponse.json({ success: true, message: "Subdomain deleted successfully." })
    } else {
      return NextResponse.json({ success: false, error: "Subdomain not found" }, { status: 404 })
    }
  } else {
    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  }
}
