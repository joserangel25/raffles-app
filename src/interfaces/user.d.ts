import { IRaffle } from "./raffle";

export interface IUser {
  name: string;
  id: string;
  email: string;
  image: string | null;
  password?: string;
  discordId: string;
}


export interface IUserFull extends IUser {
  myRaffles: IRaffle[];
  participateRaffles: IParticipant[]
}



export interface IParticipant {
  userId: string;
  raffleId: string;
}