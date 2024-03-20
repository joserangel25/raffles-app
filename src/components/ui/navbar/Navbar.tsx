'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { logOutUser } from "@/actions"
import { Button } from "../button/Button"
import { useRouter } from "next/navigation"


export const Navbar = () => {
  const { data: session } = useSession()
  const [logOutActioned, setLogOutActioned] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (logOutActioned) {
      window.location.reload()
    }
  }, [logOutActioned, session, router])


  return (
    <nav className="py-4 sticky top-0 bg-[var(--color-secondary)] flex px-6 lg:px-10 justify-between items-center">
      <Link href={'/'}>
        <p className="text-4xl text-white font-bold">DevTalles</p>
      </Link>
      {
        session?.user ? (
          <div className="flex items-center gap-3">
            <Button
              text="Sing Out"
              onClick={() => {
                setLogOutActioned(true)
                logOutUser()
              }}
            />
            <div className="w-8 h-8 rounded-full bg-[var(--color-tirthy)]" />
          </div>
        ) : (
          <Link
            href={'/auth/login'}
            className="text-white px-4 py-1 border-2 rounded-full border-[var(--color-tirthy)] hover:bg-[var(--color-tirthy)] hover:text-[var(--color-secondary)] transition-all duration-200"
          >Log In</Link>
        )
      }
    </nav>
  )
}
