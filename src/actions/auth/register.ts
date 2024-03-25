'use server'

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'

interface Props {
  email: string;
  name: string;
  password?: string;
  discordId?: string;
}

export const createNewUser = async ({ email, name, password = '', discordId = '' }: Props) => {
  try {

    const existUser = await prisma.user.findUnique({
      where: { email }, select: {
        id: true,
        name: true,
        email: true,
        discordId: true
      }
    })

    if (existUser) {
      return existUser
    }

    const newUser = await prisma.user.create({
      data: { email, name, password: bcrypt.hashSync(password), discordId },
      select: {
        id: true,
        name: true,
        email: true,
        discordId: true
      }
    })
    return newUser
  } catch (error) {
    console.log(error)
    return null
  }
}
