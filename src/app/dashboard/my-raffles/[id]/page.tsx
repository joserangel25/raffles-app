import { getRaffleById } from "@/actions";
import { DetailRaffleView } from "@/components";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: { id: string }
}

export default async function DetailRafflePage({ params }: Props) {
  const raffle = await getRaffleById(params.id)
  const session = await getServerSession(authConfig)

  if (!raffle) {
    notFound()
  }

  if (raffle?.authorId !== session?.user.id) {
    redirect('/dashboard/my-raffles')
  }
  return (
    <DetailRaffleView raffle={raffle!} />
  );
}