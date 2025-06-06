import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"

const createBackupSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["full", "incremental", "database", "files"]),
  description: z.string().optional(),
})

const mockBackups = [
  {
    id: "1",
    name: "Full Site Backup - 2024-01-15",
    type: "full",
    size: "2.3 GB",
    created_at: "2024-01-15T02:00:00Z",
    status: "completed",
    location: "cloud",
    download_url: "/api/cpanel/backups/1/download",
  },
  {
    id: "2",
    name: "Database Backup - 2024-01-15",
    type: "database",
    size: "245 MB",
    created_at: "2024-01-15T01:30:00Z",
    status: "completed",
    location: "local",
    download_url: "/api/cpanel/backups/2/download",
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
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    let backups = mockBackups

    if (type) {
      backups = backups.filter((b) => b.type === type)
    }

    if (status) {
      backups = backups.filter((b) => b.status === status)
    }

    return NextResponse.json({
      success: true,
      data: backups,
    })
  } catch (error) {
    console.error("Get backups error:", error)
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
    const validation = validateRequest(createBackupSchema, body)

    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    // Simulate backup creation
    const newBackup = {
      id: Date.now().toString(),
      ...validation.data,
      size: "0 MB",
      created_at: new Date().toISOString(),
      status: "running",
      location: "cloud",
      created_by: user.id,
    }

    // Simulate backup completion after 5 seconds
    setTimeout(() => {
      console.log(`Backup ${newBackup.id} completed`)
    }, 5000)

    return NextResponse.json(
      {
        success: true,
        data: newBackup,
        message: "Backup started successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create backup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
