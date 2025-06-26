import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]
    const user = await AuthService.verifyToken(token)

    if (!user || (user.role !== "admin" && user.role !== "employee")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let tasks
    if (user.role === "admin") {
      tasks = await DatabaseService.getAllTasks()
    } else {
      // employee
      tasks = await DatabaseService.getTasksByAssignedTo(user.sub)
    }

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]
    const user = await AuthService.verifyToken(token)

    if (!user || (user.role !== "admin" && user.role !== "employee")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, assignedTo, priority, dueDate, tags } = await request.json()

    if (!title || !assignedTo || !priority || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newTask = await DatabaseService.createTask({
      title,
      description,
      assigned_to: assignedTo,
      assigned_by: user.sub, // Assigning user is the current authenticated user
      priority,
      due_date: dueDate,
      created_at: new Date().toISOString(),
      tags,
      attachments: [], // Assuming no attachments for now
    })

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
