'use client'

import { useState } from "react"
import { createNewRaffle } from "@/actions";
import { notify } from "@/utils";
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation";

type InputsForm = {
  title: string;
  description: string;
  maxParticipants: number | null;
}

export const NewRaffleForm = () => {
  const [showLimitNumber, setShowLimitNumber] = useState(false)
  const [showEndDateToInscription, setShowEndDateToInscription] = useState(false)
  const router = useRouter()

  const { handleSubmit, register, formState } = useForm<InputsForm>()

  const onSubmitFormNewRaffle: SubmitHandler<InputsForm> = async (data) => {
    const raffle = { ...data, maxParticipants: showLimitNumber ? Number(data.maxParticipants) : null }
    const { ok } = await createNewRaffle(raffle)

    if (!ok) {
      notify({ type: 'error', message: 'Error en la creación' })
    }
    notify({ type: 'success', message: 'Nuevo sorteo creado!' })
    setTimeout(() => {
      window.location.replace('/dashboard/my-raffles')
    }, 1500);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmitFormNewRaffle)}
      className="space-y-4  w-full md:w-[400px] md:mx-auto  text-sm"
    >
      <div className="flex flex-col gap-1 ">
        <label htmlFor="title" className="text-sm pl-3 font-semibold">Nombre</label>
        <input
          type="text"
          id="title"
          required
          className="input-base"
          placeholder="Gran rifa millonaria"
          {...register('title', { required: true })}
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <label htmlFor="description" className="text-sm pl-3 font-semibold">Descripción</label>
        <textarea
          // type="text"
          id="description"
          required
          className="input-base"
          placeholder="Será una rija maravillosa"
          {...register('description', { required: true })}

        />
      </div>

      {/* Image selector */}
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center ">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>

      {/* Limite de participantes */}
      <div className="flex items-center justify-between">
        <span className="">¿Límite de registros?</span>

        <div className="flex items-center gap-2">
          <label className="relative inline-flex cursor-pointer items-center">
            <input id="switch" type="checkbox" className="peer sr-only" onChange={e => setShowLimitNumber(e.target.checked)} />
            <label htmlFor="switch" className="hidden"></label>
            <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
          </label>

          {
            showLimitNumber && (
              <input
                type="number"
                className="w-20 input-base  fade-in"
                {...register('maxParticipants', { required: showLimitNumber })}
              />
            )
          }
        </div>
      </div>

      {/* Fecha límite de inscripción */}
      <div className="flex items-center justify-between">
        <span>¿Fecha fin de inscripción?</span>

        <div className="flex items-center gap-2">
          <label className="relative inline-flex cursor-pointer items-center">
            <input id="switch" type="checkbox" className="peer sr-only" onChange={e => setShowEndDateToInscription(e.target.checked)} />
            <label htmlFor="switch" className="hidden"></label>
            <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
          </label>

          {
            showEndDateToInscription && (
              <input type="date" onChange={e => console.log(e.target.value)} className="w-30 pr-2 text-white input-base fade-in text-sm" />
            )
          }
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-secondary font-medium mx-auto block"
      >
        Crear
      </button>
    </form>
  )
}
