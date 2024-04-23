'use client'

import { useEffect, useRef, useState } from "react"
import { addWinnerInRaffle, getAllPlayers } from "@/actions"
import type { Player } from "@/interfaces/player"
import { showConfetti } from "@/utils"
import { useParamsRaffle } from "@/hooks"
import { useRouter } from "next/navigation"
import Image from "next/image"

export const PlayRaffle = () => {
  const { raffleId } = useParamsRaffle()
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [count, setCount] = useState(5)
  const [winner, setWinner] = useState<Player | null>(null)
  const players = useRef<Player[]>([])
  const router = useRouter()

  useEffect(() => {
    setLoaded(true)
    const getPlayers = async () => {
      const { players: participants } = await getAllPlayers(raffleId)
      players.current = participants
    }
    getPlayers()
  }, [raffleId])

  useEffect(() => {
    if (count <= 0) {
      setPlaying(false)
      setWinner(players.current[0])
      return
    }
    if (loaded) {
      setTimeout(() => {
        setCount(prevState => prevState - 1)
      }, 1000);
    }
  }, [count, loaded, players])

  useEffect(() => {

    const saveWinner = async () => {
      await addWinnerInRaffle(winner!.userId, raffleId)
    }

    if (winner?.name) {
      saveWinner()
      showConfetti()
      router.refresh()
    }
  }, [winner, raffleId, router])


  return (
    <div className='grid place-content-center'>
      {
        playing ? (
          <div className='w-48 h-48 bg-primary text-white text-7xl font-bold rounded-full grid place-content-center'>{count}</div>
        ) : (
          <div className="text-center">
            <Image
              src={'/images/devi/yay.webp'}
              alt="Icono de devi celebrando"
              height={100}
              width={150}
              className="mx-auto mb-2"
            />
            <p className="font-medium text-lg">El ganador es:</p>
            <p className="font-bold text-2xl uppercase">{winner?.name}</p>
            <p className="font-semibold text-lg">{winner?.email}</p>
          </div>
        )
      }
    </div>
  )
}
