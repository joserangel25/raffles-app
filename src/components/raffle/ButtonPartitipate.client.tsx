'use client'

import { isRegisterInServerDiscord, toogleUserInRaffle } from "@/actions"
import { useParamsRaffle } from "@/hooks"
import { useModalStore } from "@/store"
import { notify } from "@/utils"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

interface Props {
  session: Session | null,
}

export const ButtonPartitipate = ({ session }: Props) => {
  // const onToogleOpenModal = useModalStore(state => state.onToggleModal)

  const router = useRouter()
  const { raffleId } = useParamsRaffle()

  const [onLoadedPage, setOnLoadedPage] = useState(false)

  const changeParticipatedLS = (value: boolean) => {
    localStorage.setItem('participated', JSON.stringify(value))
  }

  const onParticipateInRaffle = async () => {
    changeParticipatedLS(true)
    if (session?.accessToken) {
      const discordGuildOk = await isRegisterInServerDiscord(session!.accessToken)
      if (discordGuildOk) {
        const { ok, message } = await toogleUserInRaffle({
          userId: session!.user.id,
          raffleId
        })
        if (ok) {
          notify({ type: 'success', message })
          router.refresh()
        } else {
          notify({
            type: 'error',
            message
          })
        }
      }
      changeParticipatedLS(false)

    } else {
      await signIn('discord')
    }
  }

  useEffect(() => {
    setOnLoadedPage(true)
  }, [])


  useEffect(() => {
    const participated = JSON.parse(localStorage.getItem('participated') ?? '0')
    const onEffectRegisterPlayerinRaffle = async () => {
      if (participated && session?.accessToken) {
        const discordGuildOk = await isRegisterInServerDiscord(session!.accessToken)
        if (discordGuildOk) {
          const { ok, message } = await toogleUserInRaffle({
            userId: session!.user.id,
            raffleId
          })

          if (ok) {
            notify({ type: 'success', message })
            router.refresh()
          } else {
            notify({
              type: 'error',
              message
            })
          }
          changeParticipatedLS(false)
        }
      }
    }
    if (onLoadedPage) {
      onEffectRegisterPlayerinRaffle()
    }
  }, [session, onLoadedPage, raffleId])


  return (
    <button
      className="btn btn-secondary mx-auto block mt-5"
      onClick={() => onParticipateInRaffle()}
    >¡Participar con Discord!</button>
  )
}
