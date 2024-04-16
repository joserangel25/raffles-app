'use client'
import { useModalStore } from "@/store";
import { AddModerator } from "./AddModerator";
import { ParticipateInRaffle } from "./ParticipateInRaffle";
import { PlayRaffle } from "./PlayRaffle";


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
      );
    case 'play-raffle':
      return (
        <PlayRaffle />
      )
    default:
      <></>
  }
}