'use client'
import { useRouter } from "next/navigation"
import { LeftIcon } from "../icons"

export const ButtonBack = () => {
  const router = useRouter()
  return (
    <button
      title="volver"
      onClick={() => router.back()}
      className="w-10 h-10 rounded-full bg-light text-secondary text-xl font-bold grid place-content-center">
      <LeftIcon />
    </button>
  )
}
