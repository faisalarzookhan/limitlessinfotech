import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

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
    const period = searchParams.get("period") || "7d" // 1d, 7d, 30d, 90d
    const metric = searchParams.get("metric") // cpu, memory, disk, bandwidth

    // Mock analytics data
    const analytics = {
      system: {
        cpu: {
          current: 23,
          average: 18,
          peak: 45,
          history: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
            value: Math.floor(Math.random() * 40) + 10,
          })),
        },
        memory: {
          current: 67,
          average: 62,
          peak: 89,
          history: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
            value: Math.floor(Math.random() * 30) + 50,
          })),
        },
        disk: {
          current: 45,
          average: 43,
          peak: 52,
          total_space: "100 GB",
          used_space: "45 GB",
          free_space: "55 GB",
        },
        bandwidth: {
          current: 78,
          total_used: "2.3 TB",
          total_limit: "10 TB",
          daily_average: "85 GB",
        },
      },
      website: {
        visitors: {
          total: 15420,
          unique: 8930,
          returning: 6490,
          bounce_rate: 32.5,
        },
        traffic: {
          pageviews: 45230,
          sessions: 12340,
          avg_session_duration: "3m 45s",
          pages_per_session: 3.2,
        },
        geography: [
          { country: "United States", visitors: 4521, percentage: 29.3 },
          { country: "India", visitors: 3102, percentage: 20.1 },
          { country: "United Kingdom", visitors: 1876, percentage: 12.2 },
          { country: "Canada", visitors: 1234, percentage: 8.0 },
          { country: "Germany", visitors: 987, percentage: 6.4 },
        ],
      },
      email: {
        sent: 1247,
        received: 892,
        spam_blocked: 23,
        bounce_rate: 2.1,
      },
      api: {
        total_requests: 26511,
        success_rate: 99.2,
        avg_response_time: 145,
        rate_limit_hits: 12,
      },
    }

    if (metric) {
      return NextResponse.json({
        success: true,
        data: analytics.system[metric as keyof typeof analytics.system] || null,
        period,
      })
    }

    return NextResponse.json({
      success: true,
      data: analytics,
      period,
    })
  } catch (error) {
    console.error("Get analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
