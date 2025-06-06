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
    const projectId = searchParams.get("project_id")

    let tasks
    if (projectId) {
      tasks = await DatabaseService.getTasksByProjectId(projectId)
    } else {
      tasks = await DatabaseService.getAllTasks()
    }

    // Filter tasks based on user role
    if (user.role === "employee") {
      tasks = tasks.filter((task) => task.assigned_to.includes(user.id) || task.created_by === user.id)
    }

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Get tasks error:", error)
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

    const taskData = await request.json()
    const task = await DatabaseService.createTask({
      ...taskData,
      created_by: user.id,
    })

    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    console.error("Create task error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
