-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_serverDiscordId_fkey";

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "serverDiscordId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_serverDiscordId_fkey" FOREIGN KEY ("serverDiscordId") REFERENCES "ServerDiscord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
