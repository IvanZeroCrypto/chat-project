/*
  Warnings:

  - You are about to drop the column `confirmCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `userName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_confirmCode_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmCode",
DROP COLUMN "expiresAt",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "userName" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
