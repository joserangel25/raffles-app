import Image from "next/image";
import Link from "next/link";
import { getRaffleById } from "@/actions";
import { ButtonAddModerator, UserCard, StatusRaffle } from "@/components";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string }
}

export default async function DetailRafflePage({ params }: Props) {
  const raffle = await getRaffleById(params.id)
  const session = await getServerSession(authConfig)

  if (raffle?.authorId !== session?.user.id) {
    redirect('/dashboard/my-raffles')
  }


  const moderators = raffle?.participants.filter(user => user.role === 'moderator')
  const totalParticipants = raffle?.participants.filter(user => user.role === 'player')
  return (
    <div>
      <div className="te py-4 rounded-lg w-full flex flex-col lg:flex-row lg:justify-center gap-3 text-secondary">

        <Image
          src={'/images/rifa.png'}
          alt="Rifa"
          width={400}
          height={300}
        />

        <div className="bg-light p-3 rounded-md lg:max-w-64 ">
          <h1 className="text-center text-2xl font-bold">{raffle?.title}</h1>
          <p className="leading-tight mb-2">{raffle?.description}</p>
          <StatusRaffle played={!!raffle?.played} />
        </div>
      </div>

      <div className="pb-0.5 bg-light rounded-lg w-[90%] mx-auto" />

      <div className="my-4">
        <div className="flex justify-between items-center">
          <div>
            {/* TODO: agregar endDate al modelo Raffle y poder leerlo */}
            <p>Cierra inscripciones el: <span className="font-bold"> 15/04/2025</span></p>
            {
              totalParticipants ? (
                <p>
                  Total participantes: <span className="font-bold"> {totalParticipants?.length} </span>
                  {
                    Boolean(raffle?.maxParticipants) && (
                      <p className="inline-block">de un total de: <span className="font-bold"> {raffle?.maxParticipants}</span></p>
                    )
                  }
                </p>
              ) : (
                <p>No tiene límite de usuarios</p>
              )
            }
          </div>

          <Link href={'#'} className="hover:underline">Lista de participantes</Link>
        </div>

        <div>
          <div className="flex items-center justify-between pr-2 gap-3 mt-5">
            <h2 className="font-bold text-xl">Moderadores</h2>

            <ButtonAddModerator />

          </div>
          <ul className={`mt-2 flex flex-wrap gap-2`}>
            {
              moderators?.length ?
                moderators?.map(participant => (
                  <UserCard key={participant.id} user={participant.user} />
                )) : (
                  <p>No se han agregado.</p>
                )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}