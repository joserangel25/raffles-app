'use server'

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'

interface Props {
  email: string;
  name: string;
  image: string;
  password?: string;
  discordId?: string;
}

export const createNewUser = async ({ email, name, image = '', password = '', discordId = '' }: Props) => {
  try {
    const existUser = await prisma.user.findUnique({
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

    if (existUser) {
      return existUser
    }

    const newUser = await prisma.user.create({
      data: { email, name, password: bcrypt.hashSync(password), discordId, image },
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
    return newUser
  } catch (error) {
    console.log(error)
    throw new Error("Error al crear al usuario, valide con soporte.");

  }
}
