import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="grid place-content-center w-full h-full">
      <h1 className="text-white font-bold text-3xl mb-5 text-center">Crear cuenta</h1>
      <form action="" className="space-y-4 sm:min-w-[420px]">

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm pl-3 font-semibold">Nombre completo</label>
          <input type="text" autoComplete="" name="name" id="name" required className="py-2 rounded-lg bg-[var(--color-secondary)] outline-none pl-3" placeholder="John Doe" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm pl-3 font-semibold">Correo electrónico</label>
          <input type="email" autoComplete="" name="email" id="email" required className="py-2 rounded-lg bg-[var(--color-secondary)] outline-none pl-3" placeholder="email@google.com" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm pl-3 font-semibold">Contraseña</label>
          <input type="password" autoComplete="" name="password" id="password" required className="py-2 rounded-lg bg-[var(--color-secondary)] outline-none pl-3" placeholder="******" />
        </div>

        <button type="submit" className="px-5 py-2 bg-[var(--color-tirthy)] text-[var(--color-primary)] font-bold rounded-md block mx-auto">Registarse</button>
      </form>

      <p className="mt-6 text-center">¿Estás registrado? <Link href={'/auth/login'} className="hover:underline">Inicia sesión</Link></p>


    </div>
  );
}