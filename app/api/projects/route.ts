import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]
    const user = await AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    let projects
    if (user.role === "admin") {
      projects = await DatabaseService.getAllProjects()
    } else if (user.role === "client" && clientId === user.client_id) {
      // Filter projects by client_id for client users
      const allProjects = await DatabaseService.getAllProjects()
      projects = allProjects.filter((p) => p.client_id === user.client_id)
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
