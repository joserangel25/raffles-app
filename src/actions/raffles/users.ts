'use server'

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import { ENV } from "@/env"
import { isTimeExpired } from "@/utils"

const checkIsSameUser = async (id: string, raffleId: string) => {
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


export const createUserInRaffle = async ({ userId, raffleId, role = 'player' }: PropsToogleUserRaffle) => {

  try {
    await checkIsSameUser(userId, raffleId)

    const raffleDb = await prisma.raffle.findUnique({ where: { id: raffleId } })

    if (!raffleDb) {
      return {
        ok: false,
        message: 'El Sorteo no existe ' + raffleId
      }
    }

    if (raffleDb.played) {
      return {
        ok: false,
        message: 'Ya esta rifa fue sorteada, no te puedes registrar.'
      }
    }

    if (raffleDb.endDate && isTimeExpired(Number(raffleDb.endDate))) {
      return {
        ok: false,
        message: 'No puedes participar en el sorteo. Ya cerró la fecha de inscripción.'
      }
    }

    const isParticipanting = await prisma.participant.findMany({
      where: {
        userId,
        raffleId
      }
    })

    if (isParticipanting.length) {
      return {
        ok: false,
        message: 'Ya estás registrado en este sorteo.'
      }
    }

    await prisma.participant.create({ data: { userId, raffleId, role } })
    return {
      ok: true,
      message: `Registro exitoso. ${role === 'player' ? '¡Ya estás participando!' : '¡Moderador agregado!'}`
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: (error as { message: string }).message
    }
  }

}

export const deleteUserInRaffle = async (idParticipant: string) => {
  await prisma.participant.delete({ where: { id: idParticipant } })
  return {
    ok: true,
    message: 'Usuario eliminado con éxito.'
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