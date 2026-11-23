import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  badRequest,
  getSessionUser,
  optionalString,
  resolveStoreId,
  storeFilter,
  toInteger,
  unauthorized,
} from '@/lib/api-auth'

// 주문 목록 조회 (로그인 필요 — 고객 정보 포함)
export async function GET(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const { searchParams } = new URL(request.url)
    const orders = await prisma.order.findMany({
      where: storeFilter(user, searchParams.get('storeId')),
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
    console.error('주문 조회 실패:', error)
    return NextResponse.json({ error: '주문을 불러올 수 없습니다' }, { status: 500 })
  }
}

// 주문 생성 (로그인 필요, 매장 소속 필수 / 금액은 서버에서 계산)
export async function POST(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const body = await request.json()

    const storeId = resolveStoreId(user, optionalString(body.storeId))
    if (!storeId) {
      return badRequest('매장 정보가 없습니다. 관리자에게 매장 배정을 요청하세요')
    }

    const rawItems = Array.isArray(body.items) ? body.items : []
    if (rawItems.length === 0) {
      return badRequest('주문할 메뉴를 한 개 이상 선택해주세요')
    }

    // 같은 메뉴가 여러 줄로 들어올 수 있으므로 menuItemId 기준으로 정리
    const requested = new Map<string, number>()
    for (const rawItem of rawItems) {
      const menuItemId = optionalString(rawItem?.menuItemId)
      const quantity = toInteger(rawItem?.quantity)
      if (!menuItemId || quantity === null || quantity <= 0) {
        return badRequest('주문 항목이 올바르지 않습니다 (메뉴와 수량을 확인해주세요)')
      }
      requested.set(menuItemId, (requested.get(menuItemId) ?? 0) + quantity)
    }

    // 해당 매장의 메뉴만 주문할 수 있고, 가격은 DB 값을 사용한다
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: [...requested.keys()] }, storeId }
    })
    const priceById = new Map(menuItems.map((item) => [item.id, item.price]))

    if (priceById.size !== requested.size) {
      return badRequest('주문할 수 없는 메뉴가 포함되어 있습니다')
    }

    const items = [...requested.entries()].map(([menuItemId, quantity]) => ({
      menuItemId,
      quantity,
      price: priceById.get(menuItemId) as number
    }))

    // totalAmount 누락/조작과 무관하게 서버에서 합계를 계산한다
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const customerId = optionalString(body.customerId)
    if (customerId) {
      const customer = await prisma.customer.findUnique({ where: { id: customerId } })
      if (!customer) {
        return badRequest('등록되지 않은 고객입니다')
      }
    }

    const order = await prisma.order.create({
      data: {
        storeId,
        orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: 'pending',
        totalAmount,
        paymentMethod: optionalString(body.paymentMethod),
        customerId,
        tableNumber: optionalString(body.tableNumber),
        notes: optionalString(body.notes),
        items: {
          create: items
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
    console.error('주문 생성 실패:', error)
    return NextResponse.json({ error: '주문을 생성할 수 없습니다' }, { status: 500 })
  }
}
