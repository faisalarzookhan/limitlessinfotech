import { handlers } from "@/lib/auth"

/**
 * Exposes the NextAuth.js API routes.
 * This includes routes for sign-in, sign-out, session management, etc.
 * The actual logic is handled by the `auth` object in `@/lib/auth`.
 */
export const { GET, POST } = handlers
