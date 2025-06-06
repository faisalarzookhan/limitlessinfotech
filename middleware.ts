import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AuthService } from "./lib/auth"

// Define protected routes
const protectedRoutes = {
  admin: ["/admin"],
  employee: ["/employee"],
  client: ["/demo"],
  cpanel: ["/cpanel"],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value

  // Check if route requires authentication
  const requiresAuth = Object.values(protectedRoutes)
    .flat()
    .some((route) => pathname.startsWith(route))

  if (!requiresAuth) {
    return NextResponse.next()
  }

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify token
  const user = AuthService.verifyToken(token)
  if (!user) {
    const loginUrl = new URL("/", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete("auth-token")
    return response
  }

  // Check role-based access
  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  if (pathname.startsWith("/employee") && user.role !== "employee" && user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  if (pathname.startsWith("/demo") && user.role !== "client" && user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  if (pathname.startsWith("/cpanel") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*", "/demo/:path*", "/cpanel/:path*"],
}
