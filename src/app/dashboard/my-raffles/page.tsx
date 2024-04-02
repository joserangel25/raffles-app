import { Button, CardRaffle } from "@/components";
import Link from "next/link";

export default function MyRafflesPage() {
  return (
    <div>
      <div className="w-full flex flex-col gap-3 sm:flex-row justify-between">
        <input
          type="text"
          className="py-2 rounded-lg bg-secondary outline-none pl-3 w-full sm:w-2/3"
          placeholder="Carro 0 kms"
        />

        <Link href={'/dashboard/my-raffles/new'} className="btn btn-secondary ">Nuevo</Link>
      </div>

      <ul className="w-full flex flex-wrap gap-7 sm:gap-2 md:gap-5 my-5">
        {
          Array.from({ length: 2 }, (v, i) => (
            <CardRaffle key={i} />
          ))
        }
      </ul>
    </div>
  );
}