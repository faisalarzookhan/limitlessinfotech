import { NextResponse } from "next/server"

// Mock data for cPanel users (distinct from application users)
let mockCpanelUsers = [
  { id: "cuser_1", username: "mainuser", email: "main@domain.com", role: "Owner", status: "Active" },
  { id: "cuser_2", username: "devuser", email: "dev@domain.com", role: "Developer", status: "Active" },
  { id: "cuser_3", username: "guestuser", email: "guest@domain.com", role: "Guest", status: "Inactive" },
]

export async function GET() {
  return NextResponse.json({ success: true, users: mockCpanelUsers })
}

export async function POST(request: Request) {
  const { action, username, email, role, password, id } = await request.json()

  if (action === "create") {
    if (!username || !email || !role || !password) {
      return NextResponse.json({ success: false, error: "All fields are required to create a user" }, { status: 400 })
    }
    const newUser = {
      id: `cuser_${Date.now()}`,
      username,
      email,
      role,
      status: "Active",
    }
    mockCpanelUsers.push(newUser)
    return NextResponse.json({ success: true, message: "User created successfully.", user: newUser })
  } else if (action === "delete") {
    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }
    const initialLength = mockCpanelUsers.length
    mockCpanelUsers = mockCpanelUsers.filter((user) => user.id !== id)
    if (mockCpanelUsers.length < initialLength) {
      return NextResponse.json({ success: true, message: "User deleted successfully." })
    } else {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }
  } else if (action === "update_role") {
    if (!id || !role) {
      return NextResponse.json({ success: false, error: "User ID and new role are required" }, { status: 400 })
    }
    const userToUpdate = mockCpanelUsers.find((user) => user.id === id)
    if (userToUpdate) {
      userToUpdate.role = role
      return NextResponse.json({ success: true, message: `User ${userToUpdate.username} role updated to ${role}.` })
    } else {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }
  } else {
    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  }
}
