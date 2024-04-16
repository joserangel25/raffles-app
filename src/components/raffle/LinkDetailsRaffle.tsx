'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  id: string
}

export const LinkDetailsRaffle = ({ id }: Props) => {
  const pathname = usePathname()

  return (
    <Link
      href={`${pathname}/${id}`}
      className="block btn btn-primary">Detalles</Link>
  )
}
