import prisma from "../lib/prisma"
import bcrypt from "bcryptjs"
import { initialData } from "./data-seed";

async function main() {
  if (process.env.NODE_ENV === 'production') return;

  await prisma.raffle.deleteMany()
  await prisma.user.deleteMany()

  const { users, raffles } = initialData

  await prisma.user.createMany({
    data: users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password)
    }))
  })
  const usersDb = await prisma.user.findMany()
  await prisma.raffle.createMany({
    data: raffles.map((raffle, ind) => ({
      ...raffle,
      authorId: ind !== 1 ? usersDb[0].id : usersDb[1].id
    }))
  })
  // console.log(initialData.users)
  console.log('seed ejecutado con éxito')
}

(() => {
  main()
})()