
interface SeedUser {
  name: string;
  email: string;
  password: string;
  discordId?: string;
}

interface SeedRaffe {
  title: string;
  description: string;
  maxParticipants?: number;
  endDate: bigint | null;
  authorId?: string;
}

interface SeedData {
  users: SeedUser[],
  raffles: SeedRaffe[]
}



export const initialData: SeedData = {
  users: [
    {
      name: 'Jose Fernando',
      email: 'jose@google.com',
      password: '123456'
    },
    {
      name: 'Pedro Muriel',
      email: 'pedro@google.com',
      password: '123456'
    }
  ],
  raffles: [
    {
      title: "Rifa de locos",
      description: "Es una rifa muy buena",
      authorId: "98ab2589-2b24-40bf-bf4e-dd9f04001878",
      endDate: null
    },
    {
      title: "TV de 100 pulgadas",
      description: "Es una rifa muy buena",
      // endDate: new Date().toISOString(),
      authorId: "f795f93d-d489-4309-9a45-4f954ace07b5",
      endDate: null
    },
    {
      title: "Viaje a Perú",
      description: "Todo pago, al gratín!",
      authorId: "98ab2589-2b24-40bf-bf4e-dd9f04001878",
      endDate: null
    },
  ]
}