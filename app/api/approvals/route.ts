import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")
    const assignedTo = searchParams.get("assignedTo")

    let filteredApprovals = mockApprovals

    if (projectId) {
      filteredApprovals = filteredApprovals.filter((approval) => approval.projectId === projectId)
    }

    if (status) {
      filteredApprovals = filteredApprovals.filter((approval) => approval.status === status)
    }

    if (assignedTo) {
      filteredApprovals = filteredApprovals.filter((approval) => approval.assignedTo.includes(assignedTo))
    }

    return NextResponse.json({
      success: true,
      approvals: filteredApprovals,
      total: filteredApprovals.length,
    })
  } catch (error) {
    console.error("Get approvals error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, title, description, type, priority, assignedTo, dueDate, clientVisible } = body

    if (!projectId || !title || !description || !type || !assignedTo) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: projectId, title, description, type, assignedTo" },
        { status: 400 },
      )
    }

    const newApproval = {
      id: `approval_${Date.now()}`,
      projectId,
      title,
      description,
      type,
      status: "pending",
      priority: priority || "medium",
      assignedTo: Array.isArray(assignedTo) ? assignedTo : [assignedTo],
      createdBy: "current_user", // In real app, get from auth
      createdAt: new Date().toISOString(),
      dueDate: dueDate || null,
      clientVisible: clientVisible || false,
    }

    mockApprovals.push(newApproval)

    return NextResponse.json(
      {
        success: true,
        approval: newApproval,
        message: "Approval request created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create approval error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
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
      updatedBy: "current_user", // In real app, get from auth
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
