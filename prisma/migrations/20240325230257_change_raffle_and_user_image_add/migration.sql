/*
  Warnings:

  - You are about to drop the column `endDate` on the `Raffle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "endDate",
ALTER COLUMN "maxParticipants" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;
