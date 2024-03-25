export interface IRaffle {
  id: string;
  title: string;
  description: string;
  maxParticipants: number | null;
  // endDate: string;
  image: string | null;
  played: boolean
  authorId: string;
}
