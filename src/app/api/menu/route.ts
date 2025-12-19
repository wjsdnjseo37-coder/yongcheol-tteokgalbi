import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 메뉴 목록 조회
export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(menuItems)
  } catch (error) {
    return NextResponse.json({ error: '메뉴를 불러올 수 없습니다' }, { status: 500 })
  }
}

// 메뉴 추가
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const menuItem = await prisma.menuItem.create({
      data: {
        name: body.name,
        category: body.category,
        price: body.price,
        description: body.description,
        available: body.available ?? true
      }
    })
    return NextResponse.json(menuItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '메뉴를 추가할 수 없습니다' }, { status: 500 })
  }
}
