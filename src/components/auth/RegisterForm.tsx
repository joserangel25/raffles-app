'use client'

import { createNewUser, loginUser } from "@/actions";
import { notify } from "@/utils";
import { SubmitHandler, useForm } from "react-hook-form";

interface InputsRegister {
  name: string;
  password: string;
  email: string;
}

export const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<InputsRegister>()

  const onSubmitRegisterUser: SubmitHandler<InputsRegister> = async (data) => {
    try {
      await createNewUser(data)
      await loginUser({ email: data.email, password: data.password })
      window.location.replace('/dashboard/my-raffles')
    } catch (error) {
      console.log(error)
      notify({ type: 'error', message: 'No se puedo registrar el usuario.' })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitRegisterUser)} className="space-y-4 sm:min-w-[420px]">

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm pl-3 font-semibold">Nombre completo</label>
        <input
          type="text"
          autoComplete=""
          id="name"
          required
          className="py-2 rounded-lg bg-[var(--color-secondary)] outline-none pl-3"
          placeholder="John Doe"
          {...register('name', { required: true })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm pl-3 font-semibold">Correo electrónico</label>
        <input
          type="email"
          id="email"
          required
          className="py-2 rounded-lg bg-[var(--color-secondary)] outline-none pl-3"
          placeholder="email@google.com"
          {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm pl-3 font-semibold">Contraseña</label>
        <input
          type="password"
          autoComplete=""
          id="password"
          required
          className="py-2 rounded-lg bg-[var(--color-secondary)] outline-none pl-3"
          placeholder="******"
          {...register('password', { required: true, minLength: 6 })}

        />
      </div>

      <button
        type="submit"
        className="px-5 py-2 bg-[var(--color-tirthy)] text-[var(--color-primary)] font-bold rounded-md block mx-auto"
      >Registarse</button>
    </form>
  )
}
