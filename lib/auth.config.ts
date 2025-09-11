import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./database"
import bcrypt from "bcryptjs"
import { User } from "./database"

/**
 * Configuration for NextAuth.
 * @see https://authjs.dev/reference/nextjs
 */
const authConfig: NextAuthConfig = {
  /**
   * An array of authentication providers.
   * Here, we use the "Credentials" provider for email/password login.
   */
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /**
       * The authorize callback is used to verify a user's credentials.
       * @param credentials - The credentials submitted by the user.
       * @returns A user object if authentication is successful, otherwise null.
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await getUserByEmail(credentials.email as string)

        if (!user) {
          return null
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        )

        if (isPasswordCorrect) {
          return { id: user.id, name: user.email, email: user.email, role: user.role }
        }

        return null
      },
    }),
  ],

  /**
   * Defines the session strategy. "jwt" uses JSON Web Tokens.
   */
  session: { strategy: "jwt" },

  /**
   * Specifies custom pages for authentication flows.
   */
  pages: {
    signIn: "/auth/login",
  },

  /**
   * Callbacks for customizing the JWT and session objects.
   */
  callbacks: {
    /**
     * This callback is called whenever a JWT is created or updated.
     * The `user` object is only available on sign-in.
     * @param token - The JWT token.
     * @param user - The user object from the provider.
     * @returns The updated JWT token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.role = (user as any).role
      }
      return token
    },
    /**
     * This callback is called whenever a session is checked.
     * It enriches the session object with data from the JWT.
     * @param session - The session object.
     * @param token - The JWT token.
     * @returns The updated session object.
     */
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as "admin" | "employee" | "client"
      }
      return session
    },
  },
}

export default authConfig
