import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid place-content-center w-full h-full">
      <h1 className="text-white font-bold text-3xl mb-5 text-center">Iniciar sesión</h1>
      <form action="" className="space-y-4 sm:min-w-[420px]">

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm pl-3 font-semibold">Correo electrónico</label>
          <input type="email" autoComplete="" name="email" id="email" required className="py-2 rounded-lg bg-[var(--color-secondary)] outline-none pl-3" placeholder="email@google.com" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm pl-3 font-semibold">Contraseña</label>
          <input type="password" autoComplete="" name="password" id="password" required className="py-2 rounded-lg bg-[var(--color-secondary)] outline-none pl-3" placeholder="******" />
        </div>

        <button type="submit" className="px-5 py-2 bg-[var(--color-tirthy)] text-[var(--color-primary)] font-bold rounded-md block mx-auto">Iniciar sesión</button>
      </form>

      <div className="flex w-full gap-2 my-5 justify-center items-center">
        <div className="grow border-b border-b-white"></div>
        <p>o</p>
        <div className="grow border-b border-b-white"></div>
      </div>
      <button type="button" className="px-5 py-2 bg-[var(--color-tirthy)] text-[var(--color-primary)] font-bold rounded-md block mx-auto">Discord</button>

      <p className="mt-6 text-center">¿No tienes cuenta? <Link href={'/auth/register'} className="hover:underline">Regístrate</Link></p>

    </div>
  );
}