import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 판매 통계 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    const where = startDate && endDate ? {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    } : {}
    
    const sales = await prisma.dailySales.findMany({
      where,
      orderBy: { date: 'desc' }
    })
    
    return NextResponse.json(sales)
  } catch (error) {
    return NextResponse.json({ error: '판매 통계를 불러올 수 없습니다' }, { status: 500 })
  }
}
