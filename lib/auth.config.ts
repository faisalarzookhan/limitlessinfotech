import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

/**
 * Central NextAuth configuration.
 * Replace the demo logic in `authorize` with a real user lookup.
 */
const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const { email, password } = credentials

        /* ------------------------------------------------------------------
           TODO: replace with real authentication (DB lookup, bcrypt, etc.)
        ------------------------------------------------------------------ */
        if (email === "admin@example.com" && password === "secret") {
          return { id: "1", name: "Admin", email }
        }

        return null
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.userId = (user as any).id
      return token
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        ;(session.user as any).id = token.userId
      }
      return session
    },
  },
}

export default authConfig
