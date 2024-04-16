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

export default async function MyRafflesPage({ searchParams }: Props) {
  const session = await getServerSession(authConfig)

  const page = Number(searchParams?.page) ?? 1
  const { currentPage, totalPages, raffles } = await getRaffles({
    id: session!.user.id,
    role: 'moderator',
    page: page
  })

  if (!raffles.length) {
    redirect('/dashboard/my-raffles?page=1')
  }

  return (
    <div>
      <div className="w-full flex flex-col gap-3 sm:flex-row justify-between">
        <input
          type="text"
          className="py-2 rounded-lg bg-secondary outline-none pl-3 w-full sm:w-2/3"
          placeholder="Carro 0 kms"
        />

        <Link href={'/dashboard/my-raffles/new'} className="btn btn-secondary ">Nuevo</Link>
      </div>

      <ul className="w-full flex flex-wrap gap-7 sm:gap-2 md:gap-5 my-5">
        {
          raffles?.length ?
            raffles?.map(raffle => (
              <CardRaffle key={raffle.id} raffle={raffle} session={session} />
            )) : (
              <p className="text-xl font-bold text-center ">Actualmente no administras ninguna rifa</p>
            )
        }
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}