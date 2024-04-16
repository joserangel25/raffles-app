import { getRaffleById } from "@/actions";
import { DetailRaffleView } from "@/components";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: { id: string }
}

export default async function DetailRafflePage({ params }: Props) {
  const session = await getServerSession(authConfig)
  const raffle = await getRaffleById(params.id)

  if (!raffle) {
    notFound()
  }

  const imParticipanting = raffle?.participants.some(user => user.userId === session?.user.id)

  if (!imParticipanting) {
    redirect('/dashboard/im-playing')
  }
  return (
    <DetailRaffleView
      raffle={raffle!}
    />
  );
}