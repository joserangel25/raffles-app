'use server'

import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"

const checkIsSameUser = async (id: string) => {
  const session = await getServerSession(authConfig)

  if (!session) {
    throw new Error("Debes iniciar sesión para poder hacer esta solicitud.");
  }
  if (session.user.id === id) {
    throw new Error("No te puedes agregar como moderador a tu propia rifa.");
  }
}

export const searchUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email }, select: { name: true, id: true } })
    return {
      ok: true,
      user
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false
    }
  }
}

interface PropsToogleUserRaffle {
  userId: string;
  raffleId: string;
  role?: 'player' | 'moderator'
}

export const toogleUserInRaffle = async ({ userId, raffleId, role = 'player' }: PropsToogleUserRaffle) => {
  try {

    await checkIsSameUser(userId)

    const userRafflesParticipate = await prisma.participant.findMany({ where: { userId } })
    const [participantExist] = userRafflesParticipate.filter(raffle => raffle.raffleId === raffleId)

    if (participantExist) {
      return await deleteUserInRaffle(participantExist.id)
    } else {
      return await createUserInRaffle({ userId, raffleId, role })
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: (error as { message: string }).message
    }
  }
}

const createUserInRaffle = async ({ userId, raffleId, role }: PropsToogleUserRaffle) => {
  await prisma.participant.create({ data: { userId, raffleId, role } })
  return {
    ok: true,
    message: `${role === 'player' ? 'Jugador' : 'Moderador'} agregado con éxito.`
  }
}

const deleteUserInRaffle = async (id: string) => {
  await prisma.participant.delete({ where: { id } })
  return {
    ok: true,
    message: 'Moderador eliminado con éxito.'
  }
}