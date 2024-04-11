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
}

export interface IParticipant {
  id: string;
  userId: string;
  raffleId: string;
  role: IRoleParticipant
  user?: IUser
}