-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'store',
    "storeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- Add storeId to existing tables
ALTER TABLE "MenuItem" ADD COLUMN "storeId" TEXT;
ALTER TABLE "Order" ADD COLUMN "storeId" TEXT;
ALTER TABLE "Inventory" ADD COLUMN "storeId" TEXT;
ALTER TABLE "DailySales" ADD COLUMN "storeId" TEXT;

-- Drop old unique constraint on DailySales.date
ALTER TABLE "DailySales" DROP CONSTRAINT IF EXISTS "DailySales_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "MenuItem_storeId_idx" ON "MenuItem"("storeId");
CREATE INDEX "Order_storeId_idx" ON "Order"("storeId");
CREATE INDEX "Inventory_storeId_idx" ON "Inventory"("storeId");
CREATE INDEX "DailySales_storeId_idx" ON "DailySales"("storeId");
CREATE INDEX "DailySales_date_idx" ON "DailySales"("date");
CREATE UNIQUE INDEX "DailySales_storeId_date_key" ON "DailySales"("storeId", "date");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DailySales" ADD CONSTRAINT "DailySales_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
