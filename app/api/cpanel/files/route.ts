import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

const mockFiles = [
  {
    id: "1",
    name: "public_html",
    type: "folder",
    size: null,
    modified: "2024-01-15T10:30:00Z",
    permissions: "755",
    path: "/home/limitless/public_html",
  },
  {
    id: "2",
    name: "index.html",
    type: "file",
    size: 2400,
    modified: "2024-01-15T14:22:00Z",
    permissions: "644",
    path: "/home/limitless/public_html/index.html",
  },
  {
    id: "3",
    name: "style.css",
    type: "file",
    size: 15700,
    modified: "2024-01-15T11:18:00Z",
    permissions: "644",
    path: "/home/limitless/public_html/style.css",
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const path = searchParams.get("path") || "/home/limitless"
    const type = searchParams.get("type") // 'file' or 'folder'

    let files = mockFiles

    if (type) {
      files = files.filter((f) => f.type === type)
    }

    return NextResponse.json({
      success: true,
      data: files,
      path: path,
    })
  } catch (error) {
    console.error("Get files error:", error)
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
    const user = AuthService.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { name, type, path, content } = body

    if (!name || !type || !path) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulate file/folder creation
    const newItem = {
      id: Date.now().toString(),
      name,
      type,
      size: type === "file" ? content?.length || 0 : null,
      modified: new Date().toISOString(),
      permissions: type === "folder" ? "755" : "644",
      path: `${path}/${name}`,
      created_by: user.id,
    }

    return NextResponse.json(
      {
        success: true,
        data: newItem,
        message: `${type === "folder" ? "Folder" : "File"} created successfully`,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create file/folder error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
