export interface IRaffle {
  id: string;
  title: string;
  description: string;
  maxParticipants: number | null;
  // endDate: string;
  participants?: { userId: string; raffleId: string; }[];
  image: string | null;
  played: boolean
  authorId: string;
}
