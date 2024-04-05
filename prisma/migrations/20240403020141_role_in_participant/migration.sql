-- CreateEnum
CREATE TYPE "Role" AS ENUM ('player', 'moderator');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'player';
