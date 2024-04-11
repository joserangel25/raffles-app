import { Padlock } from "../ui/icons"

interface Props {
  played: boolean
}

export const StatusRaffle = ({ played }: Props) => {
  return (
    <span className="flex gap-2 font-semibold text-md">
      <Padlock />
      {
        played ? '¡Sorteado!' : '¡Por jugar!'
      }
    </span>
  )
}
