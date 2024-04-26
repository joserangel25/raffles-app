import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserInRaffle, searchUserByEmail } from "@/actions";
import { useModalStore } from "@/store";
import { notify } from "@/utils";
import { useParamsRaffle } from "@/hooks";
import { SearchIcon } from "../icons";


interface InputForm {
  email: string;
}

interface UserSearch {
  id: string;
  name: string;
}

export const AddModerator = () => {
  const router = useRouter()
  const { raffleId } = useParamsRaffle()
  const { register, handleSubmit } = useForm<InputForm>()
  const [userSearch, setUserSearch] = useState<UserSearch | null>(null)
  const onToggleModal = useModalStore(state => state.onToggleModal)

  const onSubmitForm: SubmitHandler<InputForm> = async ({ email }) => {
    setUserSearch(null)
    const { user } = await searchUserByEmail(email)
    if (user) {
      setUserSearch(user)
      return
    }
    notify({ type: 'error', message: 'No hubo resultados para la búsqueda.' })
  }

  const addModeratorInRaffle = async () => {
    if (!userSearch) return
    const { ok, message } = await createUserInRaffle({
      userId: userSearch.id,
      raffleId: raffleId.toString(),
      role: 'moderator'
    })

    if (!ok) {
      notify({ type: 'error', message })
      return
    }

    notify({ type: 'success', message })
    router.refresh()
    onToggleModal()
  }

  return (
    <div >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex gap-2 text-white"
        autoComplete="off"
      >
        <div className="flex flex-col gap-1 ">
          <label htmlFor="email" className="text-sm text-secondary pl-3 font-semibold">Correo del usuario</label>
          <input
            type="email"
            autoFocus
            id="email"
            required
            className="input-base text-white"
            placeholder="email@google.com"
            {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
          />
        </div>

        <button
          className="btn btn-primary self-end px-1"
          type="submit"
        >
          <SearchIcon />
        </button>
      </form>

      <section className="my-2">
        {
          userSearch && (
            <div className="fade-in">
              <label className="text-sm pl-3 font-semibold">Resultado de la búsqueda:</label>
              <div className="p-2 bg-secondary text-white flex justify-between gap-2 rounded-md">
                <p className="font-bold">{userSearch.name}</p>

                <button
                  onClick={addModeratorInRaffle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              </div>

            </div>
          )
        }
      </section>
    </div>
  )
}
