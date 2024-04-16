import Link from "next/link"
import { StatusRaffle } from "./StatusRaffle"
import { CalendarIcon, UserIcon, UsersGroup } from "../ui/icons"

import type { IRaffle } from "@/interfaces/raffle"
import type { Session } from "next-auth"
import { LinkDetailsRaffle } from "./LinkDetailsRaffle"

interface Props {
  raffle: IRaffle
  session?: Session | null
}

export const CardRaffle = ({ raffle, session = null }: Props) => {

  const participants = raffle.participants?.filter(participant => participant.role !== 'moderator')
  const moderators = raffle.participants?.filter(participant => participant.role === 'moderator')
  const isAuthor = raffle.authorId === session?.user?.id
  const isModerator = moderators.some(participant => participant.userId === session?.user?.id)


  return (
    <li className={`w-full lg:w-[300px]  p-4 list-none  rounded-lg space-y-3 justify-self-center text-sm ${raffle.played ? 'bg-secondary text-white' : 'bg-light text-primary'}`}>
      <p className=" font-bold text-xl underline text-center">{raffle.title}</p>

      <div className="flex gap-3 items-center ">
        <CalendarIcon />
        <div>
          <p className=" font-semibold">Cierre de inscripción</p>
          <p className=" font-bold">14 de enero de 2024</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <UsersGroup />
        {
          raffle.maxParticipants ? (
            <>
              <p className=" font-semibold">Límite de usuarios</p>
              <p className=" font-bold">{raffle.maxParticipants}</p>
            </>
          ) : (
            <p className=" font-semibold">Sin límite de usuarios</p>
          )
        }
      </div>

      <div className="flex gap-3 items-center">
        <UsersGroup />
        {
          participants?.length ? (
            <div>
              <p className=" font-semibold">Usuarios participando</p>
              <p className=" font-bold">{participants?.length}</p>
            </div>
          ) : (
            <p className=" font-semibold">No hay participantes</p>
          )
        }
      </div>

      <StatusRaffle played={raffle.played} />

      {
        (isAuthor || isModerator) && (
          <div className="flex gap-3  font-medium items-center">
            <UserIcon />
            {isAuthor && 'Administrador'}
            {isModerator && 'Moderador'}
          </div>
        )
      }

      <LinkDetailsRaffle id={raffle.id} />
    </li>
  )
}
