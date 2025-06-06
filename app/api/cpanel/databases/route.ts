import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"

const createDatabaseSchema = z.object({
  name: z.string().min(1),
  collation: z.string().default("utf8mb4_unicode_ci"),
})

const mockDatabases = [
  {
    id: "1",
    name: "limitless_main",
    size: "45.2 MB",
    tables: 12,
    collation: "utf8mb4_unicode_ci",
    created_at: "2024-01-10T00:00:00Z",
    last_backup: "2024-01-15T02:00:00Z",
  },
  {
    id: "2",
    name: "limitless_blog",
    size: "23.8 MB",
    tables: 8,
    collation: "utf8mb4_unicode_ci",
    created_at: "2024-01-12T00:00:00Z",
    last_backup: "2024-01-15T02:00:00Z",
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

    return NextResponse.json({
      success: true,
      data: mockDatabases,
    })
  } catch (error) {
    console.error("Get databases error:", error)
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
    const validation = validateRequest(createDatabaseSchema, body)

    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    // Simulate database creation
    const newDatabase = {
      id: Date.now().toString(),
      name: `limitless_${validation.data.name}`,
      size: "0 MB",
      tables: 0,
      collation: validation.data.collation,
      created_at: new Date().toISOString(),
      last_backup: null,
      created_by: user.id,
    }

    return NextResponse.json(
      {
        success: true,
        data: newDatabase,
        message: "Database created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create database error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
