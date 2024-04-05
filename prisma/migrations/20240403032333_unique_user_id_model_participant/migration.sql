/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,raffleId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Participant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Participant_userId_key";

-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_raffleId_key" ON "Participant"("userId", "raffleId");
