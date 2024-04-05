/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,raffleId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("raffleId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_raffleId_key" ON "Participant"("userId", "raffleId");
