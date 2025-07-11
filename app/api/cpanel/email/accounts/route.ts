import { NextResponse } from "next/server"

// Mock data for email accounts
let mockEmailAccounts = [
  { id: "email_1", address: "info@limitlessinfotech.com", storage: "100 MB / 1 GB", created: "2023-01-01" },
  { id: "email_2", address: "support@limitlessinfotech.com", storage: "50 MB / 500 MB", created: "2023-03-10" },
  { id: "email_3", address: "sales@limitlessinfotech.com", storage: "200 MB / 2 GB", created: "2023-06-05" },
]

export async function GET() {
  return NextResponse.json({ success: true, accounts: mockEmailAccounts })
}

export async function POST(request: Request) {
  const { action, address, password, id } = await request.json()

  if (action === "create") {
    if (!address || !password) {
      return NextResponse.json({ success: false, error: "Email address and password are required" }, { status: 400 })
    }
    const newAccount = {
      id: `email_${Date.now()}`,
      address,
      storage: "0 MB / 1 GB", // Default storage
      created: new Date().toISOString().split("T")[0],
    }
    mockEmailAccounts.push(newAccount)
    return NextResponse.json({ success: true, message: "Email account created successfully.", account: newAccount })
  } else if (action === "delete") {
    if (!id) {
      return NextResponse.json({ success: false, error: "Account ID is required" }, { status: 400 })
    }
    const initialLength = mockEmailAccounts.length
    mockEmailAccounts = mockEmailAccounts.filter((account) => account.id !== id)
    if (mockEmailAccounts.length < initialLength) {
      return NextResponse.json({ success: true, message: "Email account deleted successfully." })
    } else {
      return NextResponse.json({ success: false, error: "Email account not found" }, { status: 404 })
    }
  } else if (action === "change_password") {
    if (!id || !password) {
      return NextResponse.json({ success: false, error: "Account ID and new password are required" }, { status: 400 })
    }
    const account = mockEmailAccounts.find((acc) => acc.id === id)
    if (account) {
      // In a real app, you'd hash and update the password
      return NextResponse.json({ success: true, message: `Password for ${account.address} changed successfully.` })
    } else {
      return NextResponse.json({ success: false, error: "Email account not found" }, { status: 404 })
    }
  } else {
    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  }
}
