// import NextAuth, { type AuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import prisma from "./lib/prisma";

// export const authConfig: AuthOptions = {
//   pages: {
//     signIn: '/auth/login',
//     newUser: '/auth/register'
//   },
//   providers: [
//     Credentials({
//       name: 'custom login',
//       async authorize(credentials) {
//         // const parsedCredentials = z
//         //   .object({ email: z.string().email(), password: z.string().min(6) })
//         //   .safeParse(credentials);

//         // if (!parsedCredentials.success) return null

//         // const { email, password } = parsedCredentials.data
//         const { password, email } = credentials as { email: string, password: string }
//         if (!password || !email) return null

//         const userDb = await prisma.user.findUnique({ where: { email } })
//         if (!userDb) return null

//         if (password !== userDb.password) return null
//         const { password: passwordUser, ...rest } = userDb

//         return rest
//       },

//     })
//     // Credentials({
//     //   async authorize(credentials) {
//     //     const parsedCredentials = z
//     //       .object({ email: z.string().email(), password: z.string().min(6) })
//     //       .safeParse(credentials);

//     //       return null
//     //   },
//     // }),
//   ]
// }


// // export const { signIn, signOut, auth, handlers } = NextAuth({ ...authConfig })