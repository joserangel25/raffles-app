'use client'

import { useRouter } from "next/navigation";
import { deleteUserInRaffle } from "@/actions"
import { TrashIcon } from "../icons";
import { notify } from "@/utils";

interface Props {
  idParticipant: string;
}

export const ButtonDeleteUser = ({ idParticipant }: Props) => {
  const router = useRouter()

  const onDeleteUser = async () => {
    const { ok, message } = await deleteUserInRaffle(idParticipant)
    if (ok) {
      notify({ type: 'success', message })
      router.refresh()
    }
  }
  return (
    <button
      className="btn btn-primary"
      onClick={onDeleteUser}
    >
      <TrashIcon />
    </button>
  )
}
