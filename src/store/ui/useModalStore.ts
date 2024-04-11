import { create } from "zustand";

type ContentModal =
  | ''
  | 'add-moderator'
  | 'participate-in-raffle'

interface State {
  openModal: boolean;
  content?: ContentModal

  //métodos
  onToggleModal: (content?: ContentModal) => void
}

export const useModalStore = create<State>()((set, get) => ({
  openModal: false,
  onToggleModal: (content = '') => {
    const { openModal } = get()
    set({ openModal: !openModal, content })
  }
}))