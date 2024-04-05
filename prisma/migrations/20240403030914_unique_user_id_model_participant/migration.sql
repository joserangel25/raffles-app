/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Participant_userId_raffleId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_key" ON "Participant"("userId");
