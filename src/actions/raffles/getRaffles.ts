'use server'

import prisma from "@/lib/prisma"

interface Props {
  id: string;
  typeUser: 'administrator' | 'player'
}

export const getRaffles = async ({ id, typeUser }: Props) => {
  try {
    const raffles = await prisma.raffle.findMany({
      // where: { authorId: id },
      include: { participants: true }
    })

    if (typeUser === 'administrator') {
      const myRaffles = raffles.filter(raffle => raffle.authorId === id)
      const ImModerator = raffles.filter(raffle => {
        if (raffle.participants.some(user => user.userId === id && user.role === 'moderator')) {
          return true
        }
        return false
      })
      return [...myRaffles, ...ImModerator]
    }

    if (typeUser === 'player') {
      return raffles.filter(raffle => {
        if (raffle.participants.some(user => user.userId === id && user.role === 'player')) {
          return true
        }
        return false
      })
    }

  } catch (error) {
    console.log(error)
  }
}