import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AuthService } from "@/lib/auth"
import { authConfig } from "@/lib/auth.config"

// Define public routes that do not require authentication
const publicRoutes = authConfig.publicRoutes
const authRoutes = authConfig.authRoutes
const apiAuthPrefix = authConfig.apiAuthPrefix

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const isAuthenticated = await AuthService.isAuthenticated(request)
  const user = isAuthenticated ? await AuthService.verifyToken(request.cookies.get("auth_token")?.value || "") : null

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Allow API auth routes to proceed without authentication check
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", nextUrl)) // Redirect to admin dashboard
    }
    return NextResponse.next()
  }

  // Protect private routes
  if (!isAuthenticated && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  // Role-based access control (example: protect /admin and /cpanel)
  if (isAuthenticated && user) {
    if (nextUrl.pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", nextUrl))
    }
    if (nextUrl.pathname.startsWith("/cpanel") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", nextUrl))
    }
  }

  return NextResponse.next()
}

// Configuration for the middleware
export const config = {
  // Matcher to run middleware on all paths except static files and _next assets
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
