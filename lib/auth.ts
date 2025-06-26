import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"
import { SignJWT, jwtVerify } from "jose"
import { nanoid } from "nanoid"
import { z } from "zod"

export const { auth } = NextAuth(authConfig)
export const { signIn, signOut } = NextAuth(authConfig)

/* ------------------------------------------------------------------ */
/*  JWT-based helper – kept for legacy modules that expect AuthService */
/* ------------------------------------------------------------------ */

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "change-me")

export interface JwtPayload {
  sub: string // user id
  role: "admin" | "employee" | "client"
  email: string
}

const payloadSchema: z.ZodSchema<JwtPayload> = z.object({
  sub: z.string(),
  role: z.enum(["admin", "employee", "client"]),
  email: z.string().email(),
})

export class AuthService {
  /** Issue a signed JWT valid for `expiresIn` seconds (default 7 days). */
  static async sign(payload: JwtPayload, expiresIn = 60 * 60 * 24 * 7): Promise<string> {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + expiresIn

    return await new SignJWT({ ...payload, iat, exp })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setJti(nanoid())
      .setIssuedAt(iat)
      .setExpirationTime(exp)
      .sign(JWT_SECRET)
  }

  /** Verify token & return payload or `null` if invalid/expired. */
  static async verifyToken(token?: string | null): Promise<JwtPayload | null> {
    if (!token) return null
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      return payloadSchema.parse(payload)
    } catch {
      return null
    }
  }

  /** Demo login helper – replace with real DB lookup. */
  static async login(email: string, password: string) {
    if (email !== "admin@example.com" || password !== "secret") return null
    const user: JwtPayload = { sub: "1", role: "admin", email }
    const token = await this.sign(user)
    return { user, token }
  }
}

export const middleware = async (req: any) => {
  const { nextUrl } = req

  const isLoggedIn = !!(await auth())

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  return null
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
