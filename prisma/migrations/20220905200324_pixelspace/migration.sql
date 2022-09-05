-- CreateTable
CREATE TABLE "Pixel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "complete" BOOLEAN,
    "color" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "purchaseId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paid" BOOLEAN,
    CONSTRAINT "Payment_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PixelToPurchase" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PixelToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Pixel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PixelToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_hash_key" ON "Payment"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "_PixelToPurchase_AB_unique" ON "_PixelToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_PixelToPurchase_B_index" ON "_PixelToPurchase"("B");
