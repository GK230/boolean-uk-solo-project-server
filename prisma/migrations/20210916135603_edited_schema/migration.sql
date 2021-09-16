/*
  Warnings:

  - You are about to drop the column `itemId` on the `Brand` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_itemId_fkey";

-- DropIndex
DROP INDEX "Brand_itemId_unique";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "itemId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "brandId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
