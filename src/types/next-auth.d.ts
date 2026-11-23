import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      storeId: string | null
      storeName?: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    storeId: string | null
    storeName?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    storeId?: string | null
    storeName?: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: string
    storeId?: string | null
    storeName?: string
  }
}
