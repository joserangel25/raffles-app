'use server'

import { signIn } from "@/auth.config"

export const loginUser = async (credentials: { email: string, password: string }) => {
  try {
    const user = await signIn('credentials', {
      ...credentials,
      redirect: false
    })
    return { ok: true }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}