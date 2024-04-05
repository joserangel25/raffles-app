
'use client'
import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

interface InputsForm {
  name: string;
  correo: string;
  discordId: string;
}

export const ProfileForm = () => {
  const { data: session } = useSession()
  const user = {
    name: session?.user.name ?? '',
    email: session?.user.email ?? '',
    discordId: session?.user.discordId ?? ''
  }
  const { handleSubmit, register } = useForm({
    defaultValues: user
  })
  return (
    <form
      className="space-y-4 lg:space-y-0 w-full md:w-[400px] lg:w-[620px] lg:grid lg:grid-cols-2 lg:gap-3 text-sm"
    >
      <pre>
        {JSON.stringify(session?.user, null, 2)}
      </pre>
      <div className="flex flex-col gap-1 ">
        <label htmlFor="name" className="text-sm pl-3 font-semibold">Nombre</label>
        <input
          type="text"
          id="name"
          // required
          readOnly
          value={user.name}
          className="input-base"
          placeholder="Jose Rangel Martinez"
          {...register('name',)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm pl-3 font-semibold">Correo</label>
        <input
          type="email"
          id="email"
          // required
          readOnly
          value={user.email}
          className="input-base"
          placeholder="correo@google.com"
          {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="discordId" className="text-sm pl-3 font-semibold">Discord Id</label>
        <input
          type="text"
          id="discordId"
          // required
          readOnly
          value={user.discordId}
          className="input-base"
          placeholder="0"
          {...register('discordId')}
        />
      </div>
    </form>
  )
}
