import { RegisterForm } from "@/components";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="grid place-content-center w-full h-full">
      <h1 className="text-white font-bold text-3xl mb-5 text-center">Crear cuenta</h1>
      <RegisterForm />

      <p className="mt-6 text-center">¿Estás registrado? <Link href={'/auth/login'} className="hover:underline">Inicia sesión</Link></p>


    </div>
  );
}