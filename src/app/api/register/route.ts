import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import {
  badRequest,
  forbidden,
  getSessionUser,
  isUniqueConstraintError,
  optionalString,
} from '@/lib/api-auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const email = optionalString(body.email)
    const password = typeof body.password === 'string' ? body.password : ''
    const name = optionalString(body.name)
    const requestedRole = body.role === 'admin' ? 'admin' : 'store'
    const requestedStoreId = optionalString(body.storeId)

    if (!email || !password || !name) {
      return badRequest('이메일, 비밀번호, 이름은 필수입니다')
    }
    if (password.length < 6) {
      return badRequest('비밀번호는 최소 6자 이상이어야 합니다')
    }

    // 권한 상승 방지: 본사 관리자 계정은 관리자만 만들 수 있다.
    // (사용자가 한 명도 없는 최초 설정 시에만 예외로 허용)
    if (requestedRole === 'admin') {
      const sessionUser = await getSessionUser()
      const userCount = await prisma.user.count()
      const canCreateAdmin = sessionUser?.role === 'admin' || userCount === 0

      if (!canCreateAdmin) {
        return forbidden('본사 관리자 계정은 관리자만 생성할 수 있습니다')
      }
    }

    let storeId: string | null = null
    if (requestedRole === 'store') {
      if (!requestedStoreId) {
        return badRequest('매장을 선택해주세요')
      }
      const store = await prisma.store.findUnique({ where: { id: requestedStoreId } })
      if (!store) {
        return badRequest('선택한 매장을 찾을 수 없습니다')
      }
      storeId = store.id
    }

    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 사용중인 이메일입니다' },
        { status: 400 }
      )
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10)

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: requestedRole,
        storeId
      }
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }, { status: 201 })
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        { error: '이미 사용중인 이메일입니다' },
        { status: 400 }
      )
    }
    console.error('회원가입 실패:', error)
    return NextResponse.json(
      { error: '회원가입에 실패했습니다' },
      { status: 500 }
    )
  }
}
