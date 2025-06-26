"use server"

import { SignJWT, jwtVerify } from "jose"
import { nanoid } from "nanoid"
import { z } from "zod"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "change-me")

/** Payload stored inside every issued token */
export interface JwtPayload {
  sub: string // user id
  role: "admin" | "employee" | "client"
  email: string
}

/** Zod schema – extra safety when verifying */
const payloadSchema: z.ZodSchema<JwtPayload> = z.object({
  sub: z.string(),
  role: z.enum(["admin", "employee", "client"]),
  email: z.string().email(),
})

export class AuthService {
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /** Verify token & return payload or `null` if invalid/expired. */
  static async verifyToken(token?: string | null): Promise<JwtPayload | null> {
    if (!token) return null
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      const data = payloadSchema.parse(payload)
      return data
    } catch {
      return null
    }
  }

  /* ------------------------------------------------------------------ */
  /** Example login helper */
  static async login(email: string, password: string) {
    // … your real auth logic …
    if (email !== "admin@example.com" || password !== "secret") return null
    const user: JwtPayload = { sub: "1", role: "admin", email }
    const token = await this.sign(user)
    return { user, token }
  }
}
