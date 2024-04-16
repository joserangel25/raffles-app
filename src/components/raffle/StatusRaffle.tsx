import { Padlock } from "../ui/icons"
import { LockClosedIcon } from "../ui/icons/LockClosed"

interface Props {
  played: boolean
}

export const StatusRaffle = ({ played }: Props) => {
  return (
    <p className="flex gap-2 font-semibold text-md">
      {
        played ? <LockClosedIcon /> : <Padlock />
      }
      {
        played ? '¡Sorteado!' : '¡Por jugar!'
      }
    </p>
  )
}
