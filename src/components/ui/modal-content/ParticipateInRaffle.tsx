'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { SendIcon } from "../icons"
import { ButtonDiscord } from "@/components/auth/ButtonDiscord";


interface InputProp {
  discordId: number;
}

export const ParticipateInRaffle = () => {
  const { register, handleSubmit } = useForm<InputProp>()

  const onSubmitParticipate: SubmitHandler<InputProp> = async ({ discordId }) => {
    console.log(discordId)
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitParticipate)}
        className="flex gap-2"
        autoComplete="off"
      >
        <div className="flex flex-col gap-1 ">
          <label htmlFor="discordId" className="text-sm pl-3 font-semibold">Agrega tu usuario de Discord</label>
          <input
            type="number"
            autoFocus
            id="discordId"
            required
            className="input-base text-white"
            placeholder="54875455784"
            {...register('discordId', { required: true })}
          />
        </div>

        <button
          className="btn btn-primary self-end px-1"
          type="submit"
        >
          <SendIcon />
        </button>
      </form>

      <div className="flex w-full gap-2 my-5 justify-center items-center">
        <div className="grow border-b border-b-[var(--color-secondary)]"></div>
        <p>o</p>
        <div className="grow border-b border-b-[var(--color-secondary)]"></div>
      </div>

      <ButtonDiscord />
    </div>
  )
}
