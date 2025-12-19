-- Neon SQL Editor에서 실행할 SQL

-- 1. 기존 데이터 백업 (필요시)
-- SELECT * FROM "MenuItem";
-- SELECT * FROM "Order";

-- 2. 새 테이블 생성
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'store',
    "storeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- 3. 기존 테이블에 storeId 컬럼 추가
ALTER TABLE "MenuItem" ADD COLUMN IF NOT EXISTS "storeId" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "storeId" TEXT;
ALTER TABLE "Inventory" ADD COLUMN IF NOT EXISTS "storeId" TEXT;
ALTER TABLE "DailySales" ADD COLUMN IF NOT EXISTS "storeId" TEXT;

-- 4. 인덱스 생성
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "MenuItem_storeId_idx" ON "MenuItem"("storeId");
CREATE INDEX IF NOT EXISTS "Order_storeId_idx" ON "Order"("storeId");
CREATE INDEX IF NOT EXISTS "Inventory_storeId_idx" ON "Inventory"("storeId");
CREATE INDEX IF NOT EXISTS "DailySales_storeId_idx" ON "DailySales"("storeId");

-- 5. 외래 키 제약조건 추가
ALTER TABLE "User" DROP CONSTRAINT IF EXISTS "User_storeId_fkey";
ALTER TABLE "User" ADD CONSTRAINT "User_storeId_fkey" 
    FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "MenuItem" DROP CONSTRAINT IF EXISTS "MenuItem_storeId_fkey";
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_storeId_fkey" 
    FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Order" DROP CONSTRAINT IF EXISTS "Order_storeId_fkey";
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" 
    FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Inventory" DROP CONSTRAINT IF EXISTS "Inventory_storeId_fkey";
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_storeId_fkey" 
    FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "DailySales" DROP CONSTRAINT IF EXISTS "DailySales_storeId_fkey";
ALTER TABLE "DailySales" ADD CONSTRAINT "DailySales_storeId_fkey" 
    FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 6. 테스트 매장 데이터 삽입
INSERT INTO "Store" ("id", "name", "address", "phone", "status", "createdAt", "updatedAt")
VALUES 
    ('store_gangnam_001', '강남점', '서울시 강남구 테헤란로 123', '02-1234-5678', 'open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('store_hongdae_001', '홍대점', '서울시 마포구 홍대입구 456', '02-2345-6789', 'open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('store_sinchon_001', '신촌점', '서울시 서대문구 신촌동 789', '02-3456-7890', 'open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- 7. 테스트 사용자 데이터 삽입 (비밀번호: password)
INSERT INTO "User" ("id", "email", "password", "name", "role", "storeId", "createdAt", "updatedAt")
VALUES 
    ('user_admin_001', 'admin@test.com', '$2b$10$vQyyGwd.l1gfB8p1i0FEPuL1KOUmZZWU56lzG7w9x0FIjUkqQjLem', '본사 관리자', 'admin', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('user_store1_001', 'store1@test.com', '$2b$10$vQyyGwd.l1gfB8p1i0FEPuL1KOUmZZWU56lzG7w9x0FIjUkqQjLem', '강남점 매니저', 'store', 'store_gangnam_001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('user_store2_001', 'store2@test.com', '$2b$10$vQyyGwd.l1gfB8p1i0FEPuL1KOUmZZWU56lzG7w9x0FIjUkqQjLem', '홍대점 매니저', 'store', 'store_hongdae_001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- 8. 기존 데이터에 storeId 할당 (임시로 첫 번째 매장)
UPDATE "MenuItem" SET "storeId" = 'store_gangnam_001' WHERE "storeId" IS NULL;
UPDATE "Order" SET "storeId" = 'store_gangnam_001' WHERE "storeId" IS NULL;
UPDATE "Inventory" SET "storeId" = 'store_gangnam_001' WHERE "storeId" IS NULL;
UPDATE "DailySales" SET "storeId" = 'store_gangnam_001' WHERE "storeId" IS NULL;

-- 완료!
-- 이제 웹사이트에서 로그인 테스트:
-- admin@test.com / password (본사)
-- store1@test.com / password (강남점)
-- store2@test.com / password (홍대점)
