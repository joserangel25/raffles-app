'use server'

import prisma from "@/lib/prisma"

export const addWinnerInRaffle = async (winnerId: string, raffleId: string) => {
  try {
    await prisma.raffle.update({ where: { id: raffleId }, data: { winnerId, played: true } })
    return {
      ok: true,
      message: 'Ganador grabado con éxito'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo grabar el ganador.'
    }
  }
} 