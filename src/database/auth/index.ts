import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const verifyUserWithEmailAndPassword = async (credentials: { email: string, password: string }) => {
  try {
    const { email, password } = credentials
    const userDb = await checkIsUserRegistered(email, true)

    if (!userDb) return null

    if (!bcrypt.compareSync(password, userDb.password!)) return null
    const { password: passwordUser, ...rest } = userDb

    return rest
  } catch (error) {
    console.log(error)
    return null
  }
}

export const checkIsUserRegistered = async (email: string, withPassword = false) => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      password: withPassword,
      discordId: true,
      // myRaffles: true,
      participateRaffles: true
    }
  })
}