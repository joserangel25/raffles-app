// 'use server'

import { signIn } from "next-auth/react"

export const loginUser = async (credentials: { email: string, password: string }) => {
  try {
    const res = await signIn('credentials', {
      ...credentials,
      redirect: false,
      // callbackUrl: '/dashboard'
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

