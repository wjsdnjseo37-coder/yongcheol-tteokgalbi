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

// 재고 목록 조회 (로그인 필요)
export async function GET(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const { searchParams } = new URL(request.url)
    const inventory = await prisma.inventory.findMany({
      where: storeFilter(user, searchParams.get('storeId')),
      orderBy: { itemName: 'asc' }
    })
    return NextResponse.json(inventory)
  } catch (error) {
    console.error('재고 조회 실패:', error)
    return NextResponse.json({ error: '재고를 불러올 수 없습니다' }, { status: 500 })
  }
}

// 재고 추가 (로그인 필요, 매장 소속 필수)
export async function POST(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const body = await request.json()

    const storeId = resolveStoreId(user, optionalString(body.storeId))
    if (!storeId) {
      return badRequest('매장 정보가 없습니다. 관리자에게 매장 배정을 요청하세요')
    }

    const itemName = optionalString(body.itemName)
    const unit = optionalString(body.unit)
    const quantity = toInteger(body.quantity)
    const minQuantity = toInteger(body.minQuantity ?? 0)

    if (!itemName || !unit) {
      return badRequest('품목명과 단위는 필수입니다')
    }
    if (quantity === null || quantity < 0) {
      return badRequest('수량은 0 이상의 정수여야 합니다')
    }
    if (minQuantity === null || minQuantity < 0) {
      return badRequest('최소 수량은 0 이상의 정수여야 합니다')
    }

    const item = await prisma.inventory.create({
      data: {
        storeId,
        itemName,
        quantity,
        unit,
        minQuantity
      }
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('재고 추가 실패:', error)
    return NextResponse.json({ error: '재고를 추가할 수 없습니다' }, { status: 500 })
  }
}
