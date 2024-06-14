/*
  Warnings:

  - Added the required column `serverDiscordId` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Raffle" ADD COLUMN     "serverDiscordId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ServerDiscord" (
    "id" SERIAL NOT NULL,
    "idServer" TEXT NOT NULL,
    "nameServer" TEXT NOT NULL,
    "urlServer" TEXT NOT NULL,

    CONSTRAINT "ServerDiscord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServerDiscord_id_key" ON "ServerDiscord"("id");

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_serverDiscordId_fkey" FOREIGN KEY ("serverDiscordId") REFERENCES "ServerDiscord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
