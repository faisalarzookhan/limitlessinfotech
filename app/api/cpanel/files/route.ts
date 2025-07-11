import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

// Mock data for files
let mockFiles = [
  {
    id: "file_1",
    name: "index.html",
    path: "/public_html/index.html",
    size: "10 KB",
    type: "file",
    lastModified: "2024-07-10",
  },
  {
    id: "file_2",
    name: "styles.css",
    path: "/public_html/css/styles.css",
    size: "5 KB",
    type: "file",
    lastModified: "2024-07-09",
  },
  {
    id: "file_3",
    name: "images",
    path: "/public_html/images",
    size: "20 MB",
    type: "directory",
    lastModified: "2024-07-08",
  },
  {
    id: "file_4",
    name: "script.js",
    path: "/public_html/js/script.js",
    size: "8 KB",
    type: "file",
    lastModified: "2024-07-10",
  },
  { id: "file_5", name: "public_html", path: "/", size: "30 MB", type: "directory", lastModified: "2024-07-10" },
  { id: "file_6", name: "css", path: "/public_html", size: "10 KB", type: "directory", lastModified: "2024-07-09" },
  { id: "file_7", name: "js", path: "/public_html", size: "15 KB", type: "directory", lastModified: "2024-07-10" },
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
    const path = searchParams.get("path") || "/"

    const currentDirectoryFiles = mockFiles
      .filter((file) => {
        // For root path, show only top-level items (e.g., public_html)
        if (path === "/") {
          return file.path === "/" || file.path.startsWith(`/${file.name}`)
        }
        // For sub-directories, show items directly within that path
        return (
          file.path === path ||
          (file.path.startsWith(`${path}/`) &&
            file.path.split("/").filter(Boolean).length === path.split("/").filter(Boolean).length + 1)
        )
      })
      .map((file) => {
        // Adjust name for display if it's a direct child of the current path
        if (file.path !== path && file.path.startsWith(path)) {
          const parts = file.path.split("/").filter(Boolean)
          const pathParts = path.split("/").filter(Boolean)
          if (parts.length === pathParts.length + 1) {
            return { ...file, name: parts[parts.length - 1] }
          }
        }
        return file
      })

    // Add a ".." entry for navigating up, if not at root
    if (path !== "/") {
      currentDirectoryFiles.unshift({
        id: "parent",
        name: "..",
        path: path.substring(0, path.lastIndexOf("/")) || "/",
        size: "",
        type: "directory",
        lastModified: "",
      })
    }

    return NextResponse.json({ success: true, files: currentDirectoryFiles, currentPath: path })
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

    const { action, name, path, type, id } = await request.json()

    if (action === "create") {
      if (!name || !path || !type) {
        return NextResponse.json({ success: false, error: "Name, path, and type are required" }, { status: 400 })
      }
      const newFile = {
        id: `file_${Date.now()}`,
        name,
        path: `${path === "/" ? "" : path}/${name}`,
        size: type === "directory" ? "0 KB" : "0 KB",
        type,
        lastModified: new Date().toISOString().split("T")[0],
      }
      mockFiles.push(newFile)
      return NextResponse.json({ success: true, message: `${type} created successfully.`, file: newFile })
    } else if (action === "delete") {
      if (!id) {
        return NextResponse.json({ success: false, error: "File ID is required" }, { status: 400 })
      }
      const initialLength = mockFiles.length
      mockFiles = mockFiles.filter((file) => file.id !== id)
      if (mockFiles.length < initialLength) {
        return NextResponse.json({ success: true, message: "File deleted successfully." })
      } else {
        return NextResponse.json({ success: false, error: "File not found" }, { status: 404 })
      }
    } else if (action === "upload") {
      // This would typically handle FormData, but for mock, we'll just simulate
      if (!name || !path) {
        return NextResponse.json(
          { success: false, error: "File name and path are required for upload" },
          { status: 400 },
        )
      }
      const uploadedFile = {
        id: `file_${Date.now()}`,
        name,
        path: `${path === "/" ? "" : path}/${name}`,
        size: "1.5 MB", // Mock size
        type: "file",
        lastModified: new Date().toISOString().split("T")[0],
      }
      mockFiles.push(uploadedFile)
      return NextResponse.json({ success: true, message: "File uploaded successfully.", file: uploadedFile })
    } else {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Create file/folder error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
