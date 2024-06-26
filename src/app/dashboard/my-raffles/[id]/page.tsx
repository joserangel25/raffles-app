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

  const moderators = raffle?.participants.filter(user => user.role === 'moderator')
  const isAuthor = raffle.authorId === session?.user?.id
  const isModerator = moderators.some(participant => participant.userId === session?.user?.id)


  if (!isAuthor && !isModerator) {
    redirect('/dashboard/my-raffles')
  }
  return (
    <DetailRaffleView
      raffle={raffle!}
    />
  );
}