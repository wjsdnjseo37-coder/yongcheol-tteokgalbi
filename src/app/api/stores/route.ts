import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 매장 목록 조회
export async function GET() {
  try {
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
    return NextResponse.json({ error: '매장을 불러올 수 없습니다' }, { status: 500 })
  }
}

// 매장 추가
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const store = await prisma.store.create({
      data: {
        name: body.name,
        address: body.address,
        phone: body.phone,
        status: body.status || 'open'
      }
    })
    return NextResponse.json(store, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '매장을 추가할 수 없습니다' }, { status: 500 })
  }
}
