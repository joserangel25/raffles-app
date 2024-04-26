
import { IUser } from "@/interfaces/user"
import { ButtonDeleteUser } from "./ButtonDeleteUser.client"

interface Props {
  idParticipant: string;
  name: string;
  isModerator: boolean
}

export const ModeratorCard = ({ idParticipant, name, isModerator }: Props) => {
  return (
    <li className={`${isModerator ? 'px-4 py-3' : 'px-3 py-1'} flex items-center justify-between gap-2  rounded-md bg-light text-secondary`}>
      <span className="flex gap-3 items-center font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>

        {name}
      </span>
      {
        !isModerator && <ButtonDeleteUser idParticipant={idParticipant} />
      }
    </li>
  )
}
