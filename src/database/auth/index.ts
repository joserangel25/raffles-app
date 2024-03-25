import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const verifyUserWithEmailAndPassword = async (credentials: { email: string, password: string }) => {
  try {
    const { email, password } = credentials
    const userDb = await prisma.user.findUnique({ where: { email } })
    if (!userDb) return null

    if (!bcrypt.compareSync(password, userDb.password!)) return null
    const { password: passwordUser, ...rest } = userDb

    return rest
  } catch (error) {
    console.log(error)
    return null
  }
}