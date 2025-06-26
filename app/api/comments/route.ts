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
    const projectId = searchParams.get("projectId")

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }

    const comments = await DatabaseService.getCommentsByProjectId(projectId)
    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]
    const user = await AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { projectId, content, type, rating } = await request.json()

    if (!projectId || !content || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newComment = await DatabaseService.addComment({
      project_id: projectId,
      author_id: user.sub, // Author is the current authenticated user
      content,
      type,
      rating,
      resolved: false, // New comments are unresolved by default
    })

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error("Error adding comment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
