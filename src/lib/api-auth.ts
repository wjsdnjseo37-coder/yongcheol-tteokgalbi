import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { auth } from "@/lib/auth"

export type SessionUser = {
  id: string
  name?: string | null
  email?: string | null
  role: string
  storeId: string | null
}

/** 로그인한 사용자 정보. 세션이 없으면 null. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth()
  const user = session?.user

  if (!user?.id) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role ?? "store",
    storeId: user.storeId ?? null,
  }
}

export function unauthorized() {
  return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 })
}

export function forbidden(message = "권한이 없습니다") {
  return NextResponse.json({ error: message }, { status: 403 })
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

/**
 * 요청을 처리할 매장을 결정한다.
 * - 본사 관리자(admin): 요청으로 넘어온 storeId 를 우선 사용하고, 없으면 소속 매장 사용
 * - 매장 사용자(store): 소속 매장으로 고정 (본문의 storeId 는 무시)
 */
export function resolveStoreId(
  user: SessionUser,
  requestedStoreId?: string | null
): string | null {
  if (user.role === "admin") {
    return requestedStoreId || user.storeId || null
  }
  return user.storeId || null
}

/** 목록 조회 시 적용할 매장 필터. 소속 매장이 없으면 어떤 데이터도 반환하지 않는다. */
export function storeFilter(
  user: SessionUser,
  requestedStoreId?: string | null
): { storeId?: string } {
  if (user.role === "admin") {
    return requestedStoreId ? { storeId: requestedStoreId } : {}
  }
  return { storeId: user.storeId ?? "__no_store__" }
}

export function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  )
}

export function isForeignKeyError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    (error.code === "P2003" || error.code === "P2025")
  )
}

/** 문자열 본문 값 정리 (빈 문자열 → null) */
export function optionalString(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

/** 정수 검증 */
export function toInteger(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (Number.isInteger(parsed)) return parsed
  }
  return null
}
