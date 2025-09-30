-- CreateTable
CREATE TABLE "_RoomToAdmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoomToAdmin_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RoomToAdmin_B_index" ON "_RoomToAdmin"("B");

-- AddForeignKey
ALTER TABLE "_RoomToAdmin" ADD CONSTRAINT "_RoomToAdmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToAdmin" ADD CONSTRAINT "_RoomToAdmin_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
