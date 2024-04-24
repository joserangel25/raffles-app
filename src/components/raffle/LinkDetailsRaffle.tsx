'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  id: string
}

export const LinkDetailsRaffle = ({ id }: Props) => {
  const pathname = usePathname()
  const urlBase = pathname === '/' ? '/raffles' : pathname
  return (
    <Link
      href={`${urlBase}/${id}`}
      className="block btn btn-primary">Detalles</Link>
  )
}
