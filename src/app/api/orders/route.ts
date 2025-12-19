import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 주문 목록 조회
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            menuItem: true
          }
        },
        customer: true
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: '주문을 불러올 수 없습니다' }, { status: 500 })
  }
}

// 주문 생성
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        status: 'pending',
        totalAmount: body.totalAmount,
        paymentMethod: body.paymentMethod,
        tableNumber: body.tableNumber,
        notes: body.notes,
        items: {
          create: body.items.map((item: any) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    })
    
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '주문을 생성할 수 없습니다' }, { status: 500 })
  }
}
