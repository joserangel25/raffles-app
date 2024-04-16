'use server'

import prisma from "@/lib/prisma"
import { IRaffle } from "@/interfaces/raffle"

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
        },
        author: {
          select: { name: true }
        }
      }
    })
    return raffle
  } catch (error) {
    console.log(error)
    return null
  }
}