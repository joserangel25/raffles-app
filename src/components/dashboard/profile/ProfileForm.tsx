

export const ProfileForm = () => {
  return (
    <form
      className="space-y-4 lg:space-y-0 w-full md:w-[400px] lg:w-[620px] lg:grid lg:grid-cols-2 lg:gap-3 text-sm">

      <div className="flex flex-col gap-1 ">
        <label htmlFor="name" className="text-sm pl-3 font-semibold">Nombre</label>
        <input
          type="text"
          id="name"
          // required
          className="input-base"
          placeholder="Jose Rangel Martinez"
        // {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm pl-3 font-semibold">Correo</label>
        <input
          type="email"
          id="email"
          // required
          className="input-base"
          placeholder="correo@google.com"
        // {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="discordId" className="text-sm pl-3 font-semibold">Discord Id</label>
        <input
          type="text"
          id="discordId"
          // required
          className="input-base"
          placeholder="587286786171"
        // {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
        />
      </div>
    </form>
  )
}
