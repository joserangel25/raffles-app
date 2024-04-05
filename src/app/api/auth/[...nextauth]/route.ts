import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import z from "zod"

import { checkIsUserRegistered, verifyUserWithEmailAndPassword } from "@/database";
import { createNewUser } from "@/actions";
import { ENV } from "@/env";
import { IUserFull } from "@/interfaces/user";


const scopes = ["identify", "guilds", "email"].join(" ")

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  // adapter: PrismaAdapter(prisma) as Adapter,
  providers: [

    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Correo Electrónico", type: "email", placeholder: "correo@google.com" },
        password: { label: "Contraseña", type: "password", placeholder: '******' }
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null

        return await verifyUserWithEmailAndPassword(parsedCredentials.data)
      }
    }),
    // GithubProvider({
    //   clientId: ENV.GITHUB_ID ?? '',
    //   clientSecret: ENV.GITHUB_SECRET ?? ''
    // }),
    DiscordProvider({
      name: 'discord',
      clientId: ENV.DISCORD_ID ?? '',
      clientSecret: ENV.DISCORD_SECRET ?? '',
      authorization: {
        params: { scope: scopes },
      },
      // scopes.concat(" guilds.members.read")
      // allowDangerousEmailAccountLinking: true,
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log({ user, account, profile, email, credentials })
    //   let isDevtallesUser
    //   if (account && account.provider === 'discord') {
    //     const res = await fetch(`https://discord.com/api/users/@me/guilds`, {
    //       headers: {
    //         Authorization: `Bearer ${account.access_token}`
    //       }
    //     })
    //     const serversUser: { id: string, name: string }[] = await res.json()
    //     isDevtallesUser = serversUser.some(server => server.id === '1130900724499365958')
    //     user.isDevtallesUser = isDevtallesUser
    //   }

    //   return true
    // },

    //TODO: validar que no se pueda loguear con credenciales si se registró con provider o al revés
    // async signIn({account, user}){
    //   if(account && account.type === 'oauth'){
    //     const isRegisterUser = await checkIsUserRegistered(user.email!)

    //     if(isRegisterUser) return false
    //   }
    //   return true
    // },

    async jwt({ token, user, account }) {
      // console.log({ user, account })
      if (account) {
        token.accessToken = account.access_token!

        switch (account.type) {
          case 'oauth':

            const newUser = await createNewUser({
              name: user.name!,
              email: user.email!,
              discordId: user.id,
              image: user.image!
            })
            // token.isDevtallesUser = await isRegisterInServerDiscord(account.access_token!)
            token.user = newUser
            break;

          case 'credentials':
            token.user = user as IUserFull
            break;
        }
      }
      return token
    },

    async session({ session, user, token }) {

      // if (token) {
      session.accessToken = token.accessToken
      session.user = token.user
      // }
      return session
    }
  }
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST };

