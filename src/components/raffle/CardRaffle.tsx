import Link from "next/link"
import { StatusRaffle } from "./StatusRaffle"
import { CalendarIcon, UserIcon, UsersGroup } from "../ui/icons"

import type { IRaffle } from "@/interfaces/raffle"
import type { Session } from "next-auth"
import { LinkDetailsRaffle } from "./LinkDetailsRaffle"
import { formatDate } from "@/utils"

interface Props {
  raffle: IRaffle
  session?: Session | null
  className?: string;
}

export const CardRaffle = ({ raffle, className, session = null }: Props) => {

  const participants = raffle.participants?.filter(participant => participant.role !== 'moderator')
  const moderators = raffle.participants?.filter(participant => participant.role === 'moderator')
  const isAuthor = raffle.authorId === session?.user?.id
  const isModerator = moderators.some(participant => participant.userId === session?.user?.id)


  return (
    <li className={`w-full lg:w-[300px] lg:min-h-[336px] p-4 list-none rounded-lg space-y-3 flex flex-col justify-self-center text-sm ${className} ${raffle.played ? 'bg-secondary text-white' : 'bg-light text-primary'}`}>
      <p className=" font-bold text-xl underline text-center uppercase">{raffle.title}</p>

      <div className="grow space-y-3">
        <div className="flex gap-3 items-center ">
          <CalendarIcon />
          <div>
            <p className=" font-semibold">¿Fecha máxima de registro?</p>
            <p className=" font-bold">{raffle.endDate ? formatDate(raffle.endDate) : 'No tiene'}</p>
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
      </div>

      <LinkDetailsRaffle id={raffle.id} />
    </li>
  )
}
