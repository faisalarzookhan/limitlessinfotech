import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { SignJWT, jwtVerify } from "jose"
import { nanoid } from "nanoid"
import { z } from "zod"

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

/* ------------------------------------------------------------------ */
/*  JWT-based helper – kept for legacy modules that expect AuthService */
/* ------------------------------------------------------------------ */

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "change-me")

/**
 * Represents the payload of a JSON Web Token (JWT).
 */
export interface JwtPayload {
  /** The subject of the token, typically the user ID. */
  sub: string
  /** The role of the user. */
  role: "admin" | "employee" | "client"
  /** The email address of the user. */
  email: string
}

const payloadSchema: z.ZodSchema<JwtPayload> = z.object({
  sub: z.string(),
  role: z.enum(["admin", "employee", "client"]),
  email: z.string().email(),
})

/**
 * Provides services for handling JWT-based authentication.
 * This class is a legacy helper for modules that expect an AuthService.
 */
export class AuthService {
  /**
   * Signs a payload to create a JWT.
   * The token is valid for a specified duration.
   * @param payload - The payload to sign.
   * @param expiresIn - The token's validity duration in seconds. Defaults to 7 days.
   * @returns A promise that resolves to the signed JWT string.
   */
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

  /**
   * Verifies a JWT and returns its payload if valid.
   * @param token - The JWT string to verify.
   * @returns A promise that resolves to the JWT payload if the token is valid, otherwise null.
   */
  static async verifyToken(token?: string | null): Promise<JwtPayload | null> {
    if (!token) return null
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      return payloadSchema.parse(payload)
    } catch {
      return null
    }
  }

  /**
   * A demonstration login helper.
   * In a real application, this would involve a database lookup.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A promise that resolves to an object containing the user payload and JWT, or null if login fails.
   */
  static async login(email: string, password: string) {
    if (email !== "admin@example.com" || password !== "secret") return null
    const user: JwtPayload = { sub: "1", role: "admin", email }
    const token = await this.sign(user)
    return { user, token }
  }
}
