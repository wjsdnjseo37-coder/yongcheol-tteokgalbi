import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  badRequest,
  forbidden,
  getSessionUser,
  optionalString,
  unauthorized,
} from '@/lib/api-auth'

// 매장 목록 조회
// - 로그인 사용자: 매장 전체 정보
// - 비로그인: 회원가입 화면에서 매장을 고를 수 있도록 id/name 만 공개
export async function GET() {
  try {
    const user = await getSessionUser()

    if (!user) {
      const stores = await prisma.store.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' }
      })
      return NextResponse.json(stores)
    }

    const stores = await prisma.store.findMany({
      include: {
        _count: {
          select: {
            orders: true,
            users: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(stores)
  } catch (error) {
    console.error('매장 조회 실패:', error)
    return NextResponse.json({ error: '매장을 불러올 수 없습니다' }, { status: 500 })
  }
}

// 매장 추가 (본사 관리자만)
export async function POST(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (user.role !== 'admin') return forbidden('본사 관리자만 매장을 추가할 수 있습니다')

  try {
    const body = await request.json()

    const name = optionalString(body.name)
    if (!name) {
      return badRequest('매장 이름은 필수입니다')
    }

    const store = await prisma.store.create({
      data: {
        name,
        address: optionalString(body.address),
        phone: optionalString(body.phone),
        status: optionalString(body.status) || 'open'
      }
    })
    return NextResponse.json(store, { status: 201 })
  } catch (error) {
    console.error('매장 추가 실패:', error)
    return NextResponse.json({ error: '매장을 추가할 수 없습니다' }, { status: 500 })
  }
}
