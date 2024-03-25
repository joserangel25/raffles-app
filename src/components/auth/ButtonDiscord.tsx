'use client'

import { signIn } from "next-auth/react"

export const ButtonDiscord = () => {
  return (
    <button
      onClick={() => signIn('discord')}
      type="button"
      className="px-5 py-2 bg-[var(--color-tirthy)] text-[var(--color-primary)] font-bold rounded-md block mx-auto"
    >
      Discord
    </button>
  )
}
