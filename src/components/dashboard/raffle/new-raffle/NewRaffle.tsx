'use client'

import { useEffect, useState } from "react"
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form"
import { getTimestamps, notify } from "@/utils";
import { createNewRaffle } from "@/actions";
import { TrashIcon, WidgetUploadImages } from "@/components";

type InputsForm = {
  title: string;
  description: string;
  maxParticipants: string;
  endDate: number;
  discordServerId?: string;
}

export const NewRaffleForm = () => {
  const [showLimitNumber, setShowLimitNumber] = useState(false)
  const [showEndDateToInscription, setShowEndDateToInscription] = useState(false)
  const [showServerDiscord, setShowServerDiscord] = useState(false)
  const [urlImage, setUrlImage] = useState<string | null>(null)

  useEffect(() => {
    const url = localStorage.getItem('urlImage')
    setUrlImage(url !== 'null' ? url : null)
  }, [])

  const { handleSubmit, register, formState, setValue } = useForm<InputsForm>()

  useEffect(() => {
    if (!showServerDiscord) {
      setValue('discordServerId', undefined)
    }
  }, [showServerDiscord, setValue])

  const onSubmitFormNewRaffle: SubmitHandler<InputsForm> = async (data) => {
    const raffle = {
      ...data,
      image: urlImage,
      maxParticipants: showLimitNumber ? Number(data.maxParticipants) : null,
      discordServerId: showServerDiscord ? data.discordServerId : null
    }

    if (data.endDate) {
      raffle.endDate = getTimestamps(data.endDate.toString())
    }

    const { ok } = await createNewRaffle(raffle)

    if (!ok) {
      notify({ type: 'error', message: 'Error en la creación' })
      return
    }
    notify({ type: 'success', message: 'Nuevo sorteo creado!' })
    setTimeout(() => {
      setUrlImage('')
      localStorage.setItem('urlImage', JSON.stringify(null))
      window.location.replace('/dashboard/my-raffles')
    }, 1500);
  }

  const deleteImage = () => {
    setUrlImage(null)
    localStorage.setItem('urlImage', JSON.stringify(null))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitFormNewRaffle)}
      className="space-y-3  w-full max-w-[500px] md:mx-auto  text-sm"
    >
      <div className="flex flex-col gap-1 ">
        <label htmlFor="title" className="text-sm pl-3 font-semibold">Título</label>
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
      {
        urlImage ? (
          <figure className="max-h-[200px] overflow-hidden relative">
            <Image
              src={urlImage}
              alt="Imagen de la rifa"
              width={400}
              height={200}
            />

            <button
              type="button"
              className="p-2 bg-red-500 text-white absolute top-0 right-0 rounded-l-md"
              onClick={deleteImage}
            >
              <TrashIcon />
            </button>
          </figure>
        ) : (

          <WidgetUploadImages changeImage={setUrlImage} />
        )
      }

      {/* Limite de participantes */}
      <div className="flex items-center justify-between lg:h-[36px]">
        <span className="">¿Límite de registros?</span>

        <div className="flex items-center gap-2">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="switch"
              type="checkbox"
              className="peer sr-only"
              onChange={e => setShowLimitNumber(e.target.checked)} />
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
      <div className="flex items-center justify-between lg:h-[36px]">
        <span>¿Fecha fin de inscripción?</span>

        <div className="flex items-center gap-2">
          <label className="relative inline-flex cursor-pointer items-center">
            <input id="switch" type="checkbox" className="peer sr-only" onChange={e => setShowEndDateToInscription(e.target.checked)} />
            <label htmlFor="switch" className="hidden"></label>
            <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
          </label>

          {
            showEndDateToInscription && (
              <input
                type="date"
                className="w-30 pr-2 text-white input-base fade-in text-sm"
                {...register('endDate', { required: showEndDateToInscription })}
              />
            )
          }
        </div>
      </div>

      {/* Servidor Propio de Discord */}
      <div className="flex items-center justify-between flex-wrap lg:h-[36px]">
        <span>¿Debe estar en Servidor de Discord?</span>

        <div className={`flex items-center gap-2`}>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="switch"
              type="checkbox"
              className="peer sr-only"
              onChange={e => setShowServerDiscord(e.target.checked)} />
            <label htmlFor="switch" className="hidden"></label>
            <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
          </label>

          {
            showServerDiscord && (
              <input
                type="text"
                className="w-[190px] input-base fade-in"
                placeholder="383499458937584"
                {...register('discordServerId', { required: showServerDiscord })}
              />
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
