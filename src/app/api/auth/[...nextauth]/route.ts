// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "@/lib/prisma";

// import type { AuthOptions } from "next-auth";
// // import * as bcrypt from "bcrypt";

// import { User } from "@prisma/client";

// export const authOptions: AuthOptions = {
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//       idToken: true,

//       authorization: {
//         params: {
//           scope: "openid profile email",
//         },
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: {
//           label: "User Name",
//           type: "text",
//           placeholder: "Your User Name",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials?.username,
//           },
//         });

//         if (!user) throw new Error("User name or password is not correct");

//         // This is Naive Way of Comparing The Passwords
//         // const isPassowrdCorrect = credentials?.password === user.password;
//         if (!credentials?.password) throw new Error("Please Provide Your Password");
//         const isPassowrdCorrect = await bcrypt.compare(credentials.password, user.password);

//         if (!isPassowrdCorrect) throw new Error("User name or password is not correct");

//         if (!user.emailVerified) throw new Error("Please verify your email first!");

//         const { password, ...userWithoutPass } = user;
//         return userWithoutPass;
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.user = user as User;
//       return token;
//     },

//     async session({ token, session }) {
//       session.user = token.user;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth, { type NextAuthOptions } from "next-auth";
import z from "zod"
import { ENV } from "@/env";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { isRegisterInServerDiscord, verifyUserWithEmailAndPassword } from "@/database";
import { createNewUser } from "@/actions";

const scopes = ["identify", "guilds", "email"].join(" ")


export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/auth/login'
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

    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token!

        switch (account.type) {
          case 'oauth':

            const newUser = await createNewUser({
              name: user.name!,
              email: user.email!,
              discordId: user.id
            })
            token.isDevtallesUser = await isRegisterInServerDiscord(account.access_token!)
            token.user = newUser
            break;

          case 'credentials':
            token.user = user
            break;
        }
      }
      // const dbUser = await prisma.user.findUnique({ where: { email: token.email! } })
      return token
    },

    async session({ session, user, token }) {
      console.log(token)
      return session
    }
  }
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST };

