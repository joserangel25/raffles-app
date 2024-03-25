'use client'

import { SessionProvider } from "next-auth/react"

interface Props {
  children: React.ReactNode
}
export const Provider = ({ children, ...rest }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
