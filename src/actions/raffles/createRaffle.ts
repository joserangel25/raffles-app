'use server'

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";

type CreateRaffle = {
  title: string;
  description: string;
  maxParticipants: number | null;
}

export const createNewRaffle = async (data: CreateRaffle) => {
  const session = await getServerSession(authConfig)
  if (!session?.user) {
    throw new Error("No existe sesión de usuario activa. Inicie sesión");
  }
  try {
    const raffle = await prisma.raffle.create({
      data: { ...data, authorId: session.user.id }
    })

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