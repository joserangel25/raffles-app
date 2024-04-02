'use client'
import { signOut } from 'next-auth/react'
import { Button } from '../button/Button'

export const PopUp = () => {
  return (
    <div
      className="fade-in absolute w-[300px] -right-3 sm:-right-1 bg-stone-200 rounded-xl shadow-xl p-5 text-xs transition-all">
      <div className="mb-5">

        <Button
          text="Sing Out"
          onClick={() => signOut()}
        />
      </div>

    </div>
  )
}
