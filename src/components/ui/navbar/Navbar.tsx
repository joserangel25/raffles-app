'use client'

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Avatar } from "../avatar/Avatar"


export const Navbar = () => {
  const { data: session } = useSession()
  return (
    <nav className="py-4 sticky top-0 bg-[var(--color-secondary)] flex px-6 lg:px-10 justify-between items-center z-10">
      <Link href={'/'}>
        <p className="text-4xl text-white font-bold">RifApps</p>
      </Link>
      {
        session?.user ? (
          <Avatar session={session} />
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
