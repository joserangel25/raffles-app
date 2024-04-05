-- DropIndex
DROP INDEX "Participant_userId_key";

-- AlterTable
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("userId");
