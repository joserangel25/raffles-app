import { getLastRafflesPublic } from "@/actions"
import { CardRaffle } from "../raffle/CardRaffle"

export const LastRaffles = async () => {
  const raffles = await getLastRafflesPublic()
  return (
    <>
      {
        raffles.length ? (
          <ul className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 mx-auto">
            {
              raffles.map(raffle => (
                <CardRaffle
                  raffle={raffle}
                  key={raffle.id}
                  className="lg:min-h-[290px]"
                />
              ))
            }
          </ul>
        ) : (
          <p className="font-bold text-xl text-center mt-4">Lo sentimos, aún no hay sorteos disponibles.</p>
        )
      }
    </>
  )
}
