import { ListUsers } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function DetailRafflePage() {
  return (
    <div>
      <div className="te py-4 rounded-lg w-full flex flex-col lg:flex-row lg:justify-center gap-3 text-secondary">

        <Image
          src={'/images/rifa.png'}
          alt="Rifa"
          width={400}
          height={300}
        />

        <div className="bg-light p-3 rounded-md lg:max-w-64 ">
          <h1 className="text-center text-2xl font-bold">Mazda CX50</h1>
          <p className="leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam maxime nulla illo enim rerum dolore, eum repellat nisi ex quod. Recusandae, laborum ea quod reiciendis quos dolore est numquam atque.</p>
          <p className="text-center font-semibold mt-2 underline">Abierto para participar</p>
        </div>
      </div>

      <div className="pb-0.5 bg-light rounded-lg w-[90%] mx-auto" />

      <div className="my-4">
        <div className="flex justify-between items-center">
          <div>
            <p>Cierra inscripciones el: <span className="font-bold"> 15/04/2025</span></p>
            <p className="inline-block">Total participantes: <span className="font-bold"> 50 </span></p>
            <p className="inline-block pl-2"> de un total de: <span className="font-bold"> 200</span></p>
          </div>

          <Link href={'#'} className="hover:underline">Lista de participantes</Link>
        </div>

        <div>
          <div className="flex items-center justify-between pr-2 gap-3 mt-5">
            <h2 className="font-bold text-xl">Moderadores</h2>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>

          </div>
          <ListUsers />

        </div>
      </div>
    </div>
  );
}