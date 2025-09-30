/*
  Warnings:

  - A unique constraint covering the columns `[confirmCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmCode" INTEGER,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "refreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_confirmCode_key" ON "User"("confirmCode");
