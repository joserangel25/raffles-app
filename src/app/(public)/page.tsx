import { LastRaffles } from "@/components";
import Image from "next/image";

export default function PageHome() {
  return (
    <section className="p-5 lg:py-10 w-full">
      <div className="bg-forthy p-3 pb-0 sm:p-10 w-full mx-auto rounded-lg  relative text-center md:text-start">
        <h1 className="font-bold text-6xl">Las mejores rifas</h1>
        <h3 className="font-medium text-2xl">Para ganar...</h3>

        <figure className="w-full sm:w-auto sm:absolute bottom-0 right-10 mt-2">
          <Image
            src={'/images/devi/devi_hi.webp'}
            alt="Imagen de Devi Saludando"
            width={150}
            height={100}
            className="mx-auto"
          />
        </figure>
      </div>

      <div className="mt-4 w-full">
        <p className="text-center text-3xl font-bold">Últimos sorteos</p>

        <LastRaffles />
      </div>
    </section>
  );
}
