import { IUser } from "./user";

export type IRoleParticipant = 'player' | 'moderator'

export interface IRaffle {
  id: string;
  title: string;
  description: string;
  maxParticipants: number | null;
  // endDate: string;
  participants: IParticipant[];
  image: string | null;
  played: boolean
  authorId: string;
  author?: { name: string }
  winnerId: string;
}

export interface IParticipant {
  id: string;
  userId: string;
  raffleId: string;
  role: IRoleParticipant
  user?: IUser
}

export interface IWinner {
  id: string;
  name: string;
  email: string;
}