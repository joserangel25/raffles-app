'use client'
import { useModalStore } from "@/store";
import { AddModerator } from "./AddModerator";


export const ContentModal = () => {
  const content = useModalStore(state => state.content)
  switch (content) {
    case 'add-moderator':
      return (
        <AddModerator />
      )
    default:
      <></>
  }
}