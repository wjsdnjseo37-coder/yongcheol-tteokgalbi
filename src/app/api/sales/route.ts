import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  getSessionUser,
  storeFilter,
  unauthorized,
} from '@/lib/api-auth'

// 판매 통계 조회 (로그인 필요)
export async function GET(request: Request) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Record<string, unknown> = storeFilter(user, searchParams.get('storeId'))

    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return NextResponse.json(
          { error: '날짜 형식이 올바르지 않습니다' },
          { status: 400 }
        )
      }

      where.date = {
        gte: start,
        lte: end
      }
    }

    const sales = await prisma.dailySales.findMany({
      where,
      orderBy: { date: 'desc' }
    })

    return NextResponse.json(sales)
  } catch (error) {
    console.error('판매 통계 조회 실패:', error)
    return NextResponse.json({ error: '판매 통계를 불러올 수 없습니다' }, { status: 500 })
  }
}
