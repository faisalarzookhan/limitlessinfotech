import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = AuthService.verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const filters: any = {}
    if (status) filters.status = status
    if (user.role !== "admin") filters.assigned_to = user.id

    const approvals = await DatabaseService.getApprovalRequests(filters)

    return NextResponse.json({ approvals })
  } catch (error) {
    console.error("Get approvals error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = AuthService.verifyToken(token)
    if (!user || (user.role !== "admin" && user.role !== "employee")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const approvalData = await request.json()
    const approval = await DatabaseService.createApprovalRequest({
      ...approvalData,
      requested_by: user.id,
    })

    return NextResponse.json({ approval }, { status: 201 })
  } catch (error) {
    console.error("Create approval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
