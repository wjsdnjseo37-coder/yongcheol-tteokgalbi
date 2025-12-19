# 🍖 용철떡갈비 관리 시스템

떡갈비 가게를 위한 통합 관리 시스템입니다. 주문, 메뉴, 재고, 매출, 고객을 한 곳에서 관리할 수 있습니다.

## ✨ 주요 기능

### 📋 주문 관리
- 실시간 주문 접수 및 상태 추적
- 매장/포장/배달 주문 구분
- 주문 상태 관리 (대기중 → 조리중 → 완료 → 수령완료)

### 🍖 메뉴 관리
- 메뉴 등록, 수정, 삭제
- 카테고리별 메뉴 관리
- 품절 처리 기능

### 📦 재고 관리
- 실시간 재고 추적
- 최소 재고량 기반 발주 알림
- 재고 입출고 관리

### 💰 매출 관리
- 일별/주별/월별 매출 통계
- 인기 메뉴 분석
- 평균 주문액 계산

### 👥 고객 관리
- 고객 정보 관리
- 주문 이력 추적
- 고객별 구매 통계

### ⚙️ 설정
- 가게 기본 정보 설정
- 직원 계정 관리
- 영업 시간 설정

## 🚀 시작하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 🛠️ 기술 스택

- **Frontend**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## 📁 프로젝트 구조

```
yongcheol-tteokgalbi/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 메인 대시보드
│   │   ├── orders/           # 주문 관리
│   │   ├── menu/             # 메뉴 관리
│   │   ├── inventory/        # 재고 관리
│   │   ├── sales/            # 매출 관리
│   │   ├── customers/        # 고객 관리
│   │   └── settings/         # 설정
│   └── types/
│       └── index.ts          # 타입 정의
├── public/                   # 정적 파일
└── package.json
```

## 🎯 향후 계획

- [ ] 데이터베이스 연동 (PostgreSQL/SQLite)
- [ ] 사용자 인증 (NextAuth.js)
- [ ] 프린터 연동 (영수증 출력)
- [ ] 모바일 앱 개발
- [ ] 알림 기능 (주문 알림, 재고 알림)
- [ ] 데이터 분석 및 리포트 기능 강화

## 📄 라이선스

MIT License

## 👨‍💻 개발자

GitHub Copilot으로 만들어졌습니다.

