import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 재고 목록 조회
export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      orderBy: { itemName: 'asc' }
    })
    return NextResponse.json(inventory)
  } catch (error) {
    return NextResponse.json({ error: '재고를 불러올 수 없습니다' }, { status: 500 })
  }
}

// 재고 추가
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const item = await prisma.inventory.create({
      data: {
        itemName: body.itemName,
        quantity: body.quantity,
        unit: body.unit,
        minQuantity: body.minQuantity ?? 0
      }
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '재고를 추가할 수 없습니다' }, { status: 500 })
  }
}
