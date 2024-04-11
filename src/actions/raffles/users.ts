'use server'

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import { ENV } from "@/env"

const checkIsSameUser = async (id: string, raffleId: string) => {
  const session = await getServerSession(authConfig)

  if (!session) {
    throw new Error("Debes iniciar sesión para poder hacer esta solicitud.");
  }
  if (session.user.id === raffleId) {
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

    await checkIsSameUser(userId, raffleId)

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

// TODO: eliminar funcion toogleUserInRaffle y donde se llama, usar los métodos de crear o eliminar usuarios por separado

const createUserInRaffle = async ({ userId, raffleId, role }: PropsToogleUserRaffle) => {
  await prisma.participant.create({ data: { userId, raffleId, role } })
  return {
    ok: true,
    message: `${role === 'player' ? 'Jugador te has' : 'Moderador se ha'} registrado con éxito.`
  }
}

const deleteUserInRaffle = async (id: string) => {
  await prisma.participant.delete({ where: { id } })
  return {
    ok: true,
    message: 'Moderador eliminado con éxito.'
  }
}

export const findUserRegistered = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      discordId: true,
      myRaffles: {
        include: { participants: true }
      },
      participateRaffles: true
    }
  })
}

export const isRegisterInServerDiscord = async (token: string) => {
  const res = await fetch(`https://discord.com/api/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const serversUser: { id: string, name: string }[] = await res.json()
  return serversUser.some(server => server.id === ENV.DISCORD_ID_SERVER)
}