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

    const users = await DatabaseService.getAllUsers()
    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
