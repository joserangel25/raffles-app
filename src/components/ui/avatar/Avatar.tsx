'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { PopUp } from '../popup/PopUp'
import { useState } from 'react'

interface Props {
  session: Session | null
}

export const Avatar = ({ session }: Props) => {
  const [openPopUp, setOpenPopUp] = useState(false)

  return (
    <div className='relative'>
      <div className={`w-10 h-10 rounded-full  `}>
        <Image
          src={session?.user?.image ? session.user.image : '/images/icons/user-avatar.png'}
          alt="Imagen"
          width={45}
          height={45}
          className="object-cover rounded-full cursor-pointer"
          onClick={() => setOpenPopUp(prev => !prev)}
        />
      </div>

      {
        openPopUp && (<PopUp isShowPopUp={openPopUp} setShowPopUp={() => setOpenPopUp(prevState => !prevState)} />)
      }
    </div>
  )
}
