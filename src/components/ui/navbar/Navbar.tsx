'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { logOutUser } from "@/actions"
import { Button } from "../button/Button"
import { useRouter } from "next/navigation"
import Image from "next/image"


export const Navbar = () => {
  const { data: session } = useSession()
  const [logOutActioned, setLogOutActioned] = useState(false)

  const router = useRouter()

  console.log({ session })

  // useEffect(() => {
  //   if (logOutActioned) {
  //     window.location.reload()
  //   }
  // }, [logOutActioned, session, router])

  useEffect(() => {

  }, [])



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
                // setLogOutActioned(true)
                signOut()
              }}
            />
            <div className={`w-10 h-10 rounded-full  `}>
              <Link href={'/dashboard'}>
                <Image
                  src={session?.user?.image ? session.user.image : '/images/icons/user-avatar.png'}
                  alt="Imagen"
                  width={45}
                  height={45}
                  className="object-cover rounded-full"
                />
              </Link>
            </div>
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
