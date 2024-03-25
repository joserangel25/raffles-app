import { ENV } from "@/env"

export const isRegisterInServerDiscord = async (token: string) => {
  const res = await fetch(`https://discord.com/api/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const serversUser: { id: string, name: string }[] = await res.json()
  return serversUser.some(server => server.id === ENV.DISCORD_ID_SERVER)
}