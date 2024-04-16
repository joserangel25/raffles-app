'use server'

import prisma from "@/lib/prisma"
import type { Player } from "@/interfaces/player";
import type { IWinner } from "@/interfaces/raffle";

interface Response {
  ok: boolean;
  players: Player[];
  titleRaffle: string;
  winner: IWinner | null
}

export const getAllPlayers = async (raffleId: string): Promise<Response> => {
  try {

    const raffle = await prisma.raffle.findFirst({ where: { id: raffleId } })

    if (!raffle) {
      throw new Error("No existe Rifa con ese ID.");
    }

    const players = await prisma.participant.findMany({
      where: { raffleId, role: 'player' },
      include: {
        user: {
          select: { name: true, id: true, email: true }
        }
      }
    })

    let winner: IWinner | null = null;
    if (raffle.winnerId) {
      const user = await prisma.user.findUnique({
        where: { id: raffle.winnerId },
        select: { id: true, name: true, email: true }
      })
      winner = user
    }

    const mappedPlayers = players.map(player => ({
      id: player.id,
      userId: player.userId,
      role: player.role,
      name: player.user.name,
      email: player.user.email
    }))

    return {
      ok: true,
      players: mappedPlayers,
      titleRaffle: raffle.title,
      winner
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      players: [],
      titleRaffle: '',
      winner: null
    }
  }
}