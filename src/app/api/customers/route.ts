import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  badRequest,
  getSessionUser,
  isUniqueConstraintError,
  optionalString,
  unauthorized,
} from '@/lib/api-auth'

// 고객 목록 조회 (로그인 필요 — 고객 개인정보)
export async function GET() {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    })
    return NextResponse.json(customers)
  } catch (error) {
    console.error('고객 목록 조회 실패:', error)
    return NextResponse.json({ error: '고객 정보를 불러올 수 없습니다' }, { status: 500 })
  }
}

// 고객 추가 (로그인 필요)
export async function POST(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const body = await request.json()

    const name = optionalString(body.name)
    const phone = optionalString(body.phone)

    if (!name || !phone) {
      return badRequest('고객 이름과 전화번호는 필수입니다')
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        email: optionalString(body.email),
        address: optionalString(body.address)
      }
    })
    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ error: '이미 등록된 전화번호입니다' }, { status: 409 })
    }
    console.error('고객 추가 실패:', error)
    return NextResponse.json({ error: '고객을 추가할 수 없습니다' }, { status: 500 })
  }
}
