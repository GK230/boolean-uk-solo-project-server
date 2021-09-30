/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - Made the column `image` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar";
