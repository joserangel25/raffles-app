'use server'

import prisma from "@/lib/prisma"
import type { IRaffle } from "@/interfaces/raffle";

type Role = 'moderator' | 'player'

interface Props {
  id: string;
  role: Role;
  page?: number;
  take?: number;
}

interface Response {
  raffles: IRaffle[];
  totalPages: number;
  currentPage: number;
}

export const getRaffles = async ({ id, role, page = 1, take = 2 }: Props): Promise<Response> => {

  if (isNaN(page) || page < 1) page = 1

  try {
    const raffles = role === 'moderator'
      ? await getRafflesAdmin(id, take, page)
      : await getRafflesParticipate(id, take, page)

    const totalRafflesDb = await prisma.raffle.findMany({
      include: { participants: true },
      where: {
        OR: [
          {
            authorId: role === 'moderator' ? id : ''
          },
          {
            participants: {
              some: {
                userId: id,
                role
              }
            }
          }
        ]
      }
    })

    const totalPages = Math.ceil(totalRafflesDb.length / take)

    return {
      raffles,
      totalPages,
      currentPage: page
    }

  } catch (error) {
    console.log(error)
    return {
      raffles: [],
      totalPages: 0,
      currentPage: 0
    }
  }
}

const getRafflesAdmin = async (id: string, take: number, page: number) => {
  return await prisma.raffle.findMany({
    take,
    skip: (page - 1) * take,
    include: { participants: true, _count: true },
    where: {
      OR: [
        {
          authorId: id
        },
        {
          participants: {
            some: {
              userId: id,
              role: 'moderator'
            }
          }
        }
      ]
    },
  })
}

const getRafflesParticipate = async (id: string, take: number, page: number) => {
  return await prisma.raffle.findMany({
    take,
    skip: (page - 1) * take,
    include: { participants: true },
    where: {
      participants: {
        some: {
          userId: id,
          role: 'player'
        }
      }
    },
  })
}

export const getLastRafflesPublic = async (): Promise<IRaffle[]> => {
  return await prisma.raffle.findMany({
    where: {
      played: false
    },
    include: {
      participants: true
    },
    take: 6
  })
}