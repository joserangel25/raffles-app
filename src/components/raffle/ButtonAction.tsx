'use client'

import { ContentModal, useModalStore } from "@/store"

interface Props {
  className?: string;
  label?: string;
  action: ContentModal;
  icon: React.ReactNode;
  disabled?: boolean;
}

export const ButtonAction = ({ className, action, icon, label, disabled }: Props) => {

  const toggleOpenModal = useModalStore(state => state.onToggleModal)
  return (
    <button
      onClick={() => toggleOpenModal(action)}
      className={`${className} ${disabled ? 'cursor-not-allowed hover:bg-tirthy hover:text-secondary' : ''}`}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  )
}
