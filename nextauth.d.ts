
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { IRaffle } from "@/interfaces/raffle";
import { IUserFull } from "@/interfaces/user";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    user: IUserFull;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    isDevtallesUser?: booelean;
    user: IUserFull
    // & DefaultSession['user']
  }

  interface Jwt {

  }
}


