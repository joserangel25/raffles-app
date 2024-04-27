import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="w-full grid place-content-center">
      <h1 className="pt-10 font-bold text-3xl">No existe lo que buscas</h1>

      <figure className="my-3 max-w-[200px] mx-auto">
        <Image
          src={'/images/devi/404.webp'}
          alt="Imagen de sección no encontrada - 404"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </figure>
      <Link
        className="btn btn-primary mt-2 max-w-[250px] mx-auto"
        href={'/dashboard'}
      >Ir al Dashboard Home</Link>
    </div>
  );
}