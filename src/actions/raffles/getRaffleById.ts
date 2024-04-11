'use server'

import { IRaffle } from "@/interfaces/raffle"
import prisma from "@/lib/prisma"

export const getRaffleById = async (id: string): Promise<IRaffle | null> => {
  try {
    const raffle = await prisma.raffle.findFirst({
      where: { id },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                discordId: true
              }
            }
          }
        }
      }
    })
    return raffle
  } catch (error) {
    console.log(error)
    return null
  }
}