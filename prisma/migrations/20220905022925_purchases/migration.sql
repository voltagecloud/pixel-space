-- CreateTable
CREATE TABLE "Purchase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "complete" BOOLEAN,
    "color" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_PixelToPurchase" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PixelToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Pixel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PixelToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PixelToPurchase_AB_unique" ON "_PixelToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_PixelToPurchase_B_index" ON "_PixelToPurchase"("B");
