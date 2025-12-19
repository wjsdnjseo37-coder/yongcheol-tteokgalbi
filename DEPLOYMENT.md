# 용철떡갈비 배포 가이드

## Vercel을 통한 배포

### 1. Vercel 계정 생성 및 설정
1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭

### 2. GitHub 저장소 연결
```bash
# Git 초기화 (아직 안했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub에 저장소 생성 후
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 3. Vercel에서 프로젝트 가져오기
1. Vercel 대시보드에서 "Import Project"
2. GitHub 저장소 선택: `yongcheol-tteokgalbi`
3. 프로젝트 설정 확인 (자동 감지됨)
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 4. 환경 변수 설정
Vercel 프로젝트 설정에서 Environment Variables 추가:

```
DATABASE_URL=<your-production-database-url>
```

### 5. 배포
- "Deploy" 클릭
- 자동으로 빌드 및 배포 진행
- 완료 후 제공되는 URL로 접속 가능
- 도메인: `https://yongcheol-tteokgalbi.vercel.app`

### 6. 자동 배포 설정
- GitHub의 `main` 브랜치에 푸시할 때마다 자동 배포
- PR 생성 시 프리뷰 환경 자동 생성

---

## 데이터베이스 설정 (필요시)

### PostgreSQL 호스팅 옵션
1. **Vercel Postgres** (권장)
   - Vercel 대시보드에서 "Storage" 탭
   - "Create Database" → Postgres 선택
   - 자동으로 환경 변수 설정됨

2. **Supabase** (무료)
   - [Supabase](https://supabase.com) 가입
   - 새 프로젝트 생성
   - Connection String 복사하여 Vercel에 설정

3. **Neon** (무료)
   - [Neon](https://neon.tech) 가입
   - 프로젝트 생성
   - Connection String 복사

4. **Railway** (무료 티어)
   - [Railway](https://railway.app) 가입
   - PostgreSQL 추가

### Prisma 마이그레이션 실행
```bash
# 로컬에서 마이그레이션 생성
npx prisma migrate dev --name init

# Vercel에서 자동 실행되도록 package.json 수정
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

---

## 커스텀 도메인 설정 (선택사항)

1. Vercel 프로젝트 설정 → "Domains"
2. 도메인 입력 (예: `tteokgalbi.com`)
3. DNS 레코드 설정
   - Type: `A` 또는 `CNAME`
   - Value: Vercel 제공 주소

---

## 성능 최적화

### 1. 이미지 최적화
- Next.js의 `<Image>` 컴포넌트 사용
- Vercel이 자동으로 최적화 처리

### 2. 캐싱
- Vercel Edge Network가 자동 처리
- 정적 파일은 CDN을 통해 제공

### 3. 환경별 설정
```bash
# .env.production
DATABASE_URL=<production-db>
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## 모니터링 및 분석

### Vercel Analytics (기본 제공)
- 트래픽 분석
- 성능 모니터링
- Core Web Vitals 추적

### 에러 트래킹 (선택사항)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 배포 확인

✅ 배포 완료 후 확인사항:
- [ ] 웹사이트 접속 가능
- [ ] 모든 페이지 정상 작동
- [ ] 데이터베이스 연결 확인
- [ ] API 엔드포인트 테스트
- [ ] 모바일 반응형 확인
- [ ] HTTPS 적용 확인

---

## 문제 해결

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 로그 확인
# Vercel 대시보드 → Deployments → 실패한 배포 클릭
```

### 환경 변수 오류
- Vercel 설정에서 환경 변수 재확인
- 재배포 필요시: Settings → Redeploy

### 데이터베이스 연결 오류
- DATABASE_URL 형식 확인
- SSL 설정 확인 (`?sslmode=require` 추가)

---

## 비용 안내

### Vercel 무료 티어
- 개인/취미 프로젝트 무료
- 100GB 대역폭/월
- 무제한 배포

### 유료 전환 필요시 ($20/월)
- 상업용 프로젝트
- 더 많은 대역폭 필요
- 팀 협업 기능
