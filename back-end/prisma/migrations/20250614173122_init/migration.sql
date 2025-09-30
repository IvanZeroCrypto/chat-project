/*
  Warnings:

  - A unique constraint covering the columns `[identificationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "identificationId" INTEGER NOT NULL DEFAULT 712993774;

-- CreateIndex
CREATE UNIQUE INDEX "User_identificationId_key" ON "User"("identificationId");
