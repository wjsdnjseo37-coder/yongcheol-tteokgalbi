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

// 메뉴 목록 조회 (로그인 필요)
export async function GET(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const { searchParams } = new URL(request.url)
    const menuItems = await prisma.menuItem.findMany({
      where: storeFilter(user, searchParams.get('storeId')),
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('메뉴 조회 실패:', error)
    return NextResponse.json({ error: '메뉴를 불러올 수 없습니다' }, { status: 500 })
  }
}

// 메뉴 추가 (로그인 필요, 매장 소속 필수)
export async function POST(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const body = await request.json()

    const storeId = resolveStoreId(user, optionalString(body.storeId))
    if (!storeId) {
      return badRequest('매장 정보가 없습니다. 관리자에게 매장 배정을 요청하세요')
    }

    const name = optionalString(body.name)
    const category = optionalString(body.category)
    const price = toInteger(body.price)

    if (!name || !category) {
      return badRequest('메뉴 이름과 카테고리는 필수입니다')
    }
    if (price === null || price < 0) {
      return badRequest('가격은 0 이상의 정수여야 합니다')
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        storeId,
        name,
        category,
        price,
        description: optionalString(body.description),
        available: typeof body.available === 'boolean' ? body.available : true
      }
    })
    return NextResponse.json(menuItem, { status: 201 })
  } catch (error) {
    console.error('메뉴 추가 실패:', error)
    return NextResponse.json({ error: '메뉴를 추가할 수 없습니다' }, { status: 500 })
  }
}
