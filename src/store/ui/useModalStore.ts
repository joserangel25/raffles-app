import { create } from "zustand";

export type ContentModal =
  | ''
  | 'add-moderator'
  | 'participate-in-raffle'
  | 'play-raffle'

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