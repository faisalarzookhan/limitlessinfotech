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

    let projects
    if (user.role === "client") {
      projects = await DatabaseService.getProjectsByClientId(user.id)
    } else {
      projects = await DatabaseService.getAllProjects()
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Get projects error:", error)
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

    const projectData = await request.json()
    const project = await DatabaseService.createProject({
      ...projectData,
      created_by: user.id,
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
