import { useParams } from "next/navigation"


export const useParamsRaffle = () => {
  const params = useParams()
  return {
    raffleId: params.id.toString()
  }
}