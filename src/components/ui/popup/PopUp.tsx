'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Button } from '../button/Button'

interface Props {
  setShowPopUp: () => void
  isShowPopUp: boolean
}

export const PopUp = ({ setShowPopUp, isShowPopUp }: Props) => {

  return (
    <div
      className="fade-in absolute min-w-[200px] -right-3 sm:-right-1 bg-stone-200 rounded-xl shadow-xl p-5 text-xs transition-all">
      <div className="mb-5 flex flex-col gap-y-2">
        <Link
          href={'/dashboard/my-raffles'}
          onClick={() => setShowPopUp()}
          className='btn btn-primary'
        >Dashboard</Link>

        <Button
          text="Sing Out"
          onClick={() => signOut()}
        />
      </div>

    </div>
  )
}
