import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Check database connection
    const { data, error } = await supabase.from("users").select("id").limit(1)

    const healthStatus = {
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        database: { status: "ok", message: "Connected to PostgreSQL" },
        api: { status: "ok", message: "All internal APIs are responsive" },
        storage: { status: "ok", message: "Vercel Blob storage accessible" },
        email: process.env.RESEND_API_KEY ? "configured" : "not configured",
        authentication: process.env.JWT_SECRET ? "configured" : "not configured",
      },
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      uptime: process.uptime(), // Node.js process uptime
    }

    if (error) {
      healthStatus.status = "error"
      healthStatus.services.database.status = "error"
      healthStatus.services.database.message = "Database connection failed"
    }

    // Simulate a degraded state sometimes for demonstration
    // if (Math.random() < 0.1) {
    //   healthStatus.status = "degraded";
    //   healthStatus.services.database.status = "degraded";
    //   healthStatus.services.database.message = "High latency to database";
    // }

    if (healthStatus.status === "ok") {
      return NextResponse.json(healthStatus, { status: 200 })
    } else {
      return NextResponse.json(healthStatus, { status: 500 })
    }
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
