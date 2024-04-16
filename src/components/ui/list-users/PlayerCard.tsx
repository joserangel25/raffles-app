import { TrophyIcon } from "../icons";

interface Props {
  className?: string;
  winner: boolean
  name: string;
}

export const PlayerCard = ({ className, winner, name }: Props) => {
  return (
    <li
      className={`${className} w-full flex gap-3 rounded-md p-3 ${winner ? 'bg-forthy text-white' : 'bg-light text-secondary'}`}
    >
      <p className="font-bold">{name}</p>
      {
        winner && <TrophyIcon />
      }
    </li>
  )
}
