import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

// NextAuth v5(Auth.js) 설정.
// 라우트 핸들러에서는 `auth()` 로 서버 세션을 읽고,
// /api/auth/[...nextauth] 는 아래 handlers 를 그대로 내보낸다.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email.trim() : ""
        const password = typeof credentials?.password === "string" ? credentials.password : ""

        if (!email || !password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email },
          include: { store: true }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          storeId: user.storeId,
          storeName: user.store?.name
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.storeId = user.storeId
        token.storeName = user.storeName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = (token.role as string | undefined) ?? "store"
        session.user.storeId = (token.storeId as string | null | undefined) ?? null
        session.user.storeName = token.storeName as string | undefined
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
})
