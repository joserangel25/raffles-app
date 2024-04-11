'use client'
import { useModalStore } from "@/store";
import { AddModerator } from "./AddModerator";
import { ParticipateInRaffle } from "./ParticipateInRaffle";


export const ContentModal = () => {
  const content = useModalStore(state => state.content)
  switch (content) {
    case 'add-moderator':
      return (
        <AddModerator />
      );
    case 'participate-in-raffle':
      return (
        <ParticipateInRaffle />
      )
    default:
      <></>
  }
}