import { getRaffleById } from "@/actions";
import { DetailRaffleView } from "@/components";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string }
}

export default async function DetailRafflePage({ params }: Props) {

  const raffle = await getRaffleById(params.id)

  if (!raffle) {
    notFound()
  }
  return (
    <div className="px-4">
      <DetailRaffleView raffle={raffle!} />
    </div>
  );
}

