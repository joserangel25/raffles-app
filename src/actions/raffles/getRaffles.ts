'use server'

import prisma from "@/lib/prisma"

export const getRaffles = async (id: string) => {
  try {
    const raffles = await prisma.raffle.findMany({
      where: { authorId: id },
      include: { participants: true }
    })
    return raffles
  } catch (error) {
    console.log(error)
  }
}