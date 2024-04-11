'use client'

import { useModalStore } from "@/store"
import { AddUserIcon } from "../ui/icons"

export const ButtonAddModerator = () => {
  const toggleOpenModal = useModalStore(state => state.onToggleModal)
  return (
    <button
      onClick={() => toggleOpenModal('add-moderator')}
    >
      <AddUserIcon />
    </button>
  )
}
