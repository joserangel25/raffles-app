export const revalidate = 0

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { CardRaffle, Pagination } from "@/components";
import { getRaffles } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams?: { page: string }
}

export default async function ImPlayingRaffles({ searchParams }: Props) {
  const session = await getServerSession(authConfig)
  const page = Number(searchParams?.page) ?? 1
  const { currentPage, totalPages, raffles } = await getRaffles({
    id: session!.user.id,
    role: 'player',
    page: page
  })

  if (page !== 1 && !raffles.length) {
    redirect('/dashboard/im-playing?page=1')
  }


  return (
    <div>
      <div className="w-full flex flex-col gap-3 sm:flex-row ">
        <input
          type="text"
          className="py-2 rounded-lg bg-secondary outline-none pl-3 w-full sm:w-2/3"
          placeholder="Carro 0 kms"
        />
      </div>

      {
        raffles?.length ?
          (<ul className="w-full flex flex-wrap gap-7 sm:gap-2 md:gap-5 my-5">
            {
              raffles?.map(raffle => (
                <CardRaffle
                  key={raffle.id}
                  raffle={raffle}
                  session={session} />)
              )}
          </ul>) : (
            <>
              <h2 className="text-lg font-medium text-center mt-4">Actualmente no participas en ninguna rifa</h2>
              <h1 className="text-center font-bold text-xl">¡Ve al <Link href={'/'} className="text-forthy font-bold hover:underline"> home</Link> para que encuentres fabulosos sorteos y empiezes a particiar!</h1>
            </>
          )
      }

      {
        Boolean(raffles.length) && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )
      }

    </div>
  );
}