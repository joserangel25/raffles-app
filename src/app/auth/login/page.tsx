import { ButtonDiscord, LoginForm } from "@/components";
import Link from "next/link";

export default function LoginPage() {

  return (
    <div className="py-3 lg:pt-10 grid place-content-center ">
      <h1 className="text-white font-bold text-3xl mb-5 text-center">Iniciar sesión</h1>
      <LoginForm />

      <div className="flex w-full gap-2 my-5 justify-center items-center">
        <div className="grow border-b border-b-white"></div>
        <p>o</p>
        <div className="grow border-b border-b-white"></div>
      </div>

      <ButtonDiscord />

      <p className="mt-6 text-center">¿No tienes cuenta? <Link href={'/auth/register'} className="hover:underline">Regístrate</Link></p>

    </div>
  );
}