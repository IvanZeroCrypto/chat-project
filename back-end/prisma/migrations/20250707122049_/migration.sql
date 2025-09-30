/*
  Warnings:

  - You are about to drop the `_RoomToOwner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RoomToOwner" DROP CONSTRAINT "_RoomToOwner_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToOwner" DROP CONSTRAINT "_RoomToOwner_B_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "ownerId" TEXT;

-- DropTable
DROP TABLE "_RoomToOwner";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
