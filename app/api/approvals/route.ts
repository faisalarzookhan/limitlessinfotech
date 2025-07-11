import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AuthService } from "@/lib/auth"

interface ApprovalRequest {
  id: string
  type: "project" | "expense" | "leave" | "access"
  requester: string
  details: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string | null
  approverId: string | null
}

// Mock data for approvals
const mockApprovals = [
  {
    id: "approval_1",
    projectId: "project_1",
    title: "Homepage Design Review",
    description: "Review and approve the new homepage design mockups",
    type: "design",
    status: "pending",
    priority: "high",
    assignedTo: ["user_1", "user_2"],
    createdBy: "user_3",
    createdAt: "2024-07-10T10:00:00Z",
    dueDate: "2024-07-15T17:00:00Z",
    clientVisible: true,
  },
  {
    id: "approval_2",
    projectId: "project_1",
    title: "API Integration Code Review",
    description: "Code review for the new payment gateway integration",
    type: "code",
    status: "approved",
    priority: "medium",
    assignedTo: ["user_4"],
    createdBy: "user_1",
    createdAt: "2024-07-08T14:30:00Z",
    dueDate: "2024-07-12T17:00:00Z",
    clientVisible: false,
  },
  {
    id: "approval_3",
    projectId: "project_2",
    title: "Content Review for About Page",
    description: "Review and approve the content for the about us page",
    type: "content",
    status: "rejected",
    priority: "low",
    assignedTo: ["user_2"],
    createdBy: "user_3",
    createdAt: "2024-07-05T09:15:00Z",
    dueDate: "2024-07-10T17:00:00Z",
    clientVisible: true,
    rejectionReason: "Content needs to be more engaging and include company values",
  },
]

// Mock data for approval requests
const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: "apr_1",
    type: "project",
    requester: "John Doe",
    details: "New website development for Acme Corp.",
    status: "pending",
    createdAt: "2024-07-01T10:00:00Z",
    updatedAt: null,
    approverId: null,
  },
  {
    id: "apr_2",
    type: "expense",
    requester: "Jane Smith",
    details: "Software license renewal ($500)",
    status: "pending",
    createdAt: "2024-07-02T14:30:00Z",
    updatedAt: null,
    approverId: null,
  },
  {
    id: "apr_3",
    type: "leave",
    requester: "Alex Martinez",
    details: "Vacation leave from 2024-08-01 to 2024-08-10",
    status: "approved",
    createdAt: "2024-06-20T09:00:00Z",
    updatedAt: "2024-06-22T11:00:00Z",
    approverId: "admin_1",
  },
  {
    id: "apr_4",
    type: "access",
    requester: "Emily Davis",
    details: "Access to production database",
    status: "rejected",
    createdAt: "2024-06-25T16:00:00Z",
    updatedAt: "2024-06-26T10:00:00Z",
    approverId: "admin_1",
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = await AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")
    const statusFilter = searchParams.get("status") as ApprovalRequest["status"] | null
    const typeFilter = searchParams.get("type") as ApprovalRequest["type"] | null
    const assignedTo = searchParams.get("assignedTo")

    let filteredApprovals = mockApprovals
    let filteredRequests = mockApprovalRequests

    if (projectId) {
      filteredApprovals = filteredApprovals.filter((approval) => approval.projectId === projectId)
    }

    if (statusFilter) {
      filteredRequests = filteredRequests.filter((req) => req.status === statusFilter)
    }
    if (typeFilter) {
      filteredRequests = filteredRequests.filter((req) => req.type === typeFilter)
    }

    if (assignedTo) {
      filteredApprovals = filteredApprovals.filter((approval) => approval.assignedTo.includes(assignedTo))
    }

    return NextResponse.json({
      success: true,
      approvals: filteredApprovals,
      approvalRequests: filteredRequests,
      totalApprovals: filteredApprovals.length,
      totalApprovalRequests: filteredRequests.length,
    })
  } catch (error) {
    console.error("Get approvals error:", error)
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
    const user = await AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { action, id, status, type, requester, details } = body

    if (!action) {
      return NextResponse.json({ error: "Action is required" }, { status: 400 })
    }

    if (action === "update_status") {
      if (!id || !status) {
        return NextResponse.json({ error: "Request ID and status are required" }, { status: 400 })
      }

      const requestIndex = mockApprovalRequests.findIndex((req) => req.id === id)
      if (requestIndex === -1) {
        return NextResponse.json({ error: "Approval request not found" }, { status: 404 })
      }

      if (!["pending", "approved", "rejected"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 })
      }

      mockApprovalRequests[requestIndex] = {
        ...mockApprovalRequests[requestIndex],
        status,
        updatedAt: new Date().toISOString(),
        approverId: user.id, // Assuming user.id is available from the token
      }

      return NextResponse.json({
        success: true,
        approval: mockApprovalRequests[requestIndex],
        message: `Approval request ${id} ${status} successfully.`,
      })
    }

    if (action === "create") {
      if (!type || !requester || !details) {
        return NextResponse.json({ error: "Type, requester, and details are required" }, { status: 400 })
      }

      const newRequest: ApprovalRequest = {
        id: `apr_${Date.now()}`,
        type,
        requester,
        details,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: null,
        approverId: null,
      }

      mockApprovalRequests.unshift(newRequest) // Add to the beginning

      return NextResponse.json(
        {
          success: true,
          approval: newRequest,
          message: "Approval request created successfully.",
        },
        { status: 201 },
      )
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Approval API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = await AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { id, status, rejectionReason, comments } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing required fields: id, status" }, { status: 400 })
    }

    const approvalIndex = mockApprovals.findIndex((approval) => approval.id === id)

    if (approvalIndex === -1) {
      return NextResponse.json({ success: false, error: "Approval not found" }, { status: 404 })
    }

    const updatedApproval = {
      ...mockApprovals[approvalIndex],
      status,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id, // Assuming user.id is available from the token
    }

    if (status === "rejected" && rejectionReason) {
      updatedApproval.rejectionReason = rejectionReason
    }

    if (comments) {
      updatedApproval.comments = comments
    }

    mockApprovals[approvalIndex] = updatedApproval

    return NextResponse.json({
      success: true,
      approval: updatedApproval,
      message: `Approval ${status} successfully`,
    })
  } catch (error) {
    console.error("Update approval error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = await AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing approval ID" }, { status: 400 })
    }

    const approvalIndex = mockApprovals.findIndex((approval) => approval.id === id)

    if (approvalIndex === -1) {
      return NextResponse.json({ success: false, error: "Approval not found" }, { status: 404 })
    }

    mockApprovals.splice(approvalIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Approval deleted successfully",
    })
  } catch (error) {
    console.error("Delete approval error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
