-- CreateTable
CREATE TABLE "_RoomToOwner" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoomToOwner_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RoomToOwner_B_index" ON "_RoomToOwner"("B");

-- AddForeignKey
ALTER TABLE "_RoomToOwner" ADD CONSTRAINT "_RoomToOwner_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToOwner" ADD CONSTRAINT "_RoomToOwner_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
