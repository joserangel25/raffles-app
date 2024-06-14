'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { ServerDiscord } from "@/interfaces/raffle";

type CreateRaffle = {
  title: string;
  description: string;
  maxParticipants: number | null;
  serverDiscord: ServerDiscord | null;
}

export const createNewRaffle = async (data: CreateRaffle) => {
  const session = await getServerSession(authConfig)
  if (!session?.user) {
    throw new Error("No existe sesión de usuario activa. Inicie sesión");
  }
  try {
    const { serverDiscord, ...rest } = data;

    let newServerDiscord;
    if (serverDiscord) {
      newServerDiscord = await prisma.serverDiscord.create({
        data: { ...serverDiscord }
      })
    }
    await prisma.raffle.create({
      data: {
        ...rest,
        authorId: session.user.id,
        serverDiscordId: newServerDiscord?.id
      }
    })

    revalidatePath('/')
    return {
      ok: true
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false
    }
  }
}