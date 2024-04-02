'use client'

import { loginUser } from "@/actions";
import { notify } from "@/utils";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface InputsForms {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<InputsForms>()

  const onSubmitLogin: SubmitHandler<InputsForms> = async (credentials) => {
    const { ok } = await loginUser(credentials)
    if (!ok) {
      notify({ type: 'error', message: 'Las credenciales son incorrectas' })
      return
    }

    window.location.replace('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-4 w-screen px-4 sm:px-0 sm:w-[420px]">
      <div className="flex flex-col gap-1 ">
        <label htmlFor="email" className="text-sm pl-3 font-semibold">Correo electrónico</label>
        <input
          type="email"
          id="email"
          required
          className="input-base"
          placeholder="email@google.com"
          {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm pl-3 font-semibold">Contraseña</label>
        <input
          type="password"
          id="password"
          required
          className="input-base"
          placeholder="******"
          {...register('password', { required: true, minLength: 6 })}
        />
      </div>

      <button type="submit" className="px-5 py-2 bg-[var(--color-tirthy)] text-[var(--color-primary)] font-bold rounded-md block mx-auto">Iniciar sesión</button>
    </form>
  )
}
