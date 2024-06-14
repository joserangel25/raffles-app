import { IUser } from "./user";

export type IRoleParticipant = 'player' | 'moderator'

export interface IRaffle {
  id: string;
  title: string;
  description: string;
  maxParticipants: number | null;
  endDate: bigint | null;
  participants: IParticipant[];
  image: string | null;
  played: boolean
  authorId: string;
  discordServerId: string | null;
  author?: { name: string }
  winnerId: string;
  serverDiscord?: ServerDiscord | null;
  serverDiscordId: number | null;
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

export interface ServerDiscord {
  id?: number;
  idServer: string;
  nameServer: string;
  urlServer: string;
}