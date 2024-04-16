import { redirect } from "next/navigation";
import { getAllPlayers } from "@/actions";
import { ButtonAction, ButtonBack, PlayerCard, PlayIcon } from "@/components";

interface Props {
  params: { id: string }
}

export default async function ParticipantesRafflePage({ params }: Props) {
  const { ok, players, titleRaffle, winner } = await getAllPlayers(params.id)
  if (!ok) {
    redirect('/dashboard/my-raffles')
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <ButtonBack />
          <h1 className="text-2xl font-bold ">{titleRaffle}</h1>
        </div>

        <p title="Total participantes" className="font-bold text-2xl">{players.length}</p>
      </div>

      <ul className="list-none grid  md:grid-cols-2 gap-3 my-3">
        {
          players.map(player => (
            <PlayerCard
              key={player.id}
              winner={winner?.id === player.userId}
              name={player.name}
            />
          ))
        }
      </ul>

      {!players.length && <p className="font-bold text-xl text-center">No se han registrado participantes aún</p>}

      <div className="flex justify-center gap-3 mt-8">
        <button className="btn btn-primary">Eliminar</button>
        {
          !winner && (
            <ButtonAction
              className="btn btn-secondary flex gap-2"
              label="Sortear"
              action="play-raffle"
              disabled={!players.length}
              icon={<PlayIcon />} />
          )
        }
      </div>
    </>
  );
}