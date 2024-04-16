import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authConfig } from "@/app/api/auth/[...nextauth]/route"

import { StatusRaffle } from "../StatusRaffle"
import { ButtonAction } from "../ButtonAction"
import { ModeratorCart } from "@/components/ui/list-users/ModeratorCard"
import { ButtonPartitipate } from "../ButtonPartitipate.client"

import type { IRaffle } from "@/interfaces/raffle"
import { AddUserIcon } from "@/components/ui/icons"

interface Props {
  raffle: IRaffle;
}

export const DetailRaffleView = async ({ raffle }: Props) => {
  const session = await getServerSession(authConfig);

  const moderators = raffle?.participants.filter(user => user.role === 'moderator')
  const participants = raffle?.participants.filter(user => user.role === 'player')

  const isAuthor = raffle.authorId === session?.user?.id
  const isModerator = moderators.some(participant => participant.userId === session?.user?.id)
  const isPlayer = participants.some(participant => participant.userId === session?.user.id)

  return (
    <>
      <div className="te py-4 rounded-lg w-full flex flex-col lg:flex-row lg:justify-center gap-3 text-secondary">
        <Image
          src={'/images/rifa.png'}
          alt="Rifa"
          width={400}
          height={300}
        />

        <div className="bg-light p-3 rounded-md lg:max-w-64 grid place-content-center text-center">
          <h1 className=" text-2xl font-bold underline uppercase mb-2 hover:text-forthy transition-all">{raffle.title}</h1>
          <p className="leading-tight mb-2">{raffle.description}</p>
          <div className="mx-auto">

            <StatusRaffle played={raffle.played} />
          </div>
        </div>
      </div>

      <div className="pb-0.5 bg-light rounded-lg w-[90%] mx-auto" />

      {
        isModerator && (
          <p className="bg-light py-2 rounded-md mt-4 pl-3 text-secondary font-medium"> Esta rifa fue creada por: {raffle?.author?.name} </p>
        )
      }

      <div className="my-4">
        <div className="flex justify-between items-center">
          <div>
            {/* TODO: agregar endDate al modelo Raffle y poder leerlo */}
            <p>Cierra inscripciones el: <span className="font-bold"> 15/04/2025</span></p>
            {
              Boolean(participants?.length) ? (
                <p>
                  Total participantes: <span className="font-bold"> {participants?.length} </span>
                  {
                    Boolean(raffle?.maxParticipants) && (
                      <span className="inline-block">de un total de: <span className="font-bold"> {raffle?.maxParticipants}</span></span>
                    )
                  }
                </p>
              ) : (
                <p>No tiene límite de usuarios</p>
              )
            }
          </div>

          {
            (isAuthor || isModerator) &&
            (<Link
              href={{
                pathname: `/dashboard/my-raffles/${raffle.id}/participants`,
              }}
              className="hover:underline">{raffle.winnerId ? 'Ver ganador' : 'Ver participantes'}</Link>)
          }
        </div>



        {
          (isAuthor || isModerator) && (
            <div>
              <div className="flex items-center justify-between pr-2 gap-3 mt-5">
                <h2 className="font-bold text-xl">Moderadores</h2>

                {
                  (isAuthor && !raffle.played) && <ButtonAction action="add-moderator" icon={<AddUserIcon />} />
                }

              </div>
              <ul className={`mt-2 flex flex-wrap gap-2`}>
                {
                  moderators?.length ?
                    moderators?.map(participant => (
                      <ModeratorCart key={participant.id} user={participant.user!} isModerator={isModerator} />
                    )) : (
                      <p className="text-sm">No se han agregado.</p>
                    )
                }
              </ul>
            </div>
          )
        }

        {
          (!isAuthor && !isModerator && !isPlayer && !raffle.played) && (
            <ButtonPartitipate session={session} />
          )
        }

        {
          (isPlayer) && (
            <p
              className={`${raffle.played ? 'bg-light' : 'bg-green-200'} rounded-md px-3 py-2 text-secondary mt-2 font-bold text-center`}
            >
              {
                !raffle.played ? '¡¡Ya estás participando!!' : 'Lo sentimos, no fuiste el ganador.'
              }
            </p>
          )
        }
      </div>
    </>
  )
}