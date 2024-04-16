'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { PlusIcon, SubtracIcon } from "../icons"
import { generatePaginationArrayNumbers } from "@/utils"

interface Props {
  totalPages: number
  currentPage: number
}

export const Pagination = ({ totalPages, currentPage }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()


  const createPageUrl = (numberPage: string | number) => {
    const params = new URLSearchParams(searchParams)
    if (numberPage === '...' || +numberPage > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    if (+numberPage === 0) {
      return `${pathname}?page=1`
    }
    params.set('page', numberPage.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <nav className="flex justify-center mt-10" >
      <ul className="flex items-center gap-2 list-style-none">
        <li>
          <Link
            className={`relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded  bg-white
            ${currentPage === 1 ? 'pointer-events-none hover:bg-transparent text-gray-400' : 'text-gray-800'}
            `}
            href={createPageUrl(currentPage - 1)}
          >
            <SubtracIcon />
          </Link>
        </li>
        {
          generatePaginationArrayNumbers({ currentPage, totalPages }).map((page, idx) => (
            <li key={`${page}-${idx}`}>
              <Link
                className={`relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded  font-semibold
                  ${currentPage === page ? 'text-white bg-forthy' : 'text-gray-700 hover:text-gray-800 hover:bg-gray-200 bg-white'}`}
                href={createPageUrl(idx + 1)}
              >{page}</Link>
            </li>
          ))
        }
        <li>
          <Link
            className={`relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded  bg-white ${currentPage === totalPages ? 'pointer-events-none  text-gray-400' : 'text-gray-800'}`}
            href={createPageUrl(currentPage + 1)}
          >
            <PlusIcon />
          </Link>
        </li>
      </ul>
    </nav>

  )
}
