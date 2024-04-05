'use client'

import { SessionProvider } from "next-auth/react"
import { Modal } from "../ui/modal/Modal"

interface Props {
  children: React.ReactNode
}
export const Provider = ({ children, ...rest }: Props) => {
  return (
    <SessionProvider>
      {children}
      <Modal />
    </SessionProvider>
  )
}
