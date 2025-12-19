import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 고객 목록 조회
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    })
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.json({ error: '고객 정보를 불러올 수 없습니다' }, { status: 500 })
  }
}

// 고객 추가
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        address: body.address
      }
    })
    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '고객을 추가할 수 없습니다' }, { status: 500 })
  }
}
