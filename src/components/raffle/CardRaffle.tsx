import Link from "next/link"
import { IRaffle } from "@/interfaces/raffle"
import { StatusRaffle } from "./StatusRaffle"
import { CalendarIcon, UsersGroup } from "../ui/icons"

interface Props {
  raffle: IRaffle
}

export const CardRaffle = ({ raffle }: Props) => {

  const participants = raffle.participants?.filter(participant => participant.role !== 'moderator')

  return (
    <li className="w-full lg:w-[300px] bg-light p-4 list-none text-primary rounded-lg space-y-3 justify-self-center">
      <p className=" font-bold text-xl underline text-center">{raffle.title}</p>

      <div className="flex gap-3 items-center ">
        <CalendarIcon />
        <div>
          <p className="text-sm font-semibold">Cierre de inscripción</p>
          <p className="text-sm font-bold">14 de enero de 2024</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <UsersGroup />
        {
          raffle.maxParticipants ? (
            <>
              <p className="text-sm font-semibold">Límite de usuarios</p>
              <p className="text-sm font-bold">{raffle.maxParticipants}</p>
            </>
          ) : (
            <p className="text-sm font-semibold">Sin límite de usuarios</p>
          )
        }
      </div>

      <div className="flex gap-3 items-center">
        <UsersGroup />
        {
          participants?.length ? (
            <div>
              <p className="text-sm font-semibold">Usuarios registrados</p>
              <p className="text-sm font-bold">{participants?.length}</p>
            </div>
          ) : (
            <p className="text-sm font-semibold">No hay participantes</p>
          )
        }
      </div>

      <StatusRaffle played={raffle.played} />

      <Link href={`/dashboard/my-raffles/${raffle.id}`} className="block btn btn-primary">Detalles</Link>
    </li>
  )
}
