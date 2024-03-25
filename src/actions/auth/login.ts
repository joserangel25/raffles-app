// 'use server'

import prisma from "@/lib/prisma"
import { signIn, SignInAuthorizationParams } from "next-auth/react"
import bcrypt from "bcryptjs"

export const loginUser = async (credentials: { email: string, password: string }) => {
  try {
    const res = await signIn('credentials', {
      ...credentials,
      redirect: false
    })
    return {
      ok: res!.ok
    }

  } catch (error) {
    //Esta parte nunca se ejecuta ya que el signIn no da un error si no una respuesta con un ok en true or false
    console.log(error)
    return { ok: false }
  }
}

