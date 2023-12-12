import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-8 font-bold">
      <h1 className="text-5xl">
        Bienvenido a la pagina de administrador
      </h1>
      <Link href="/admin" className="text-2xl py-2 px-6 rounded-full border-solid border-2 border-black">
        Administrar
      </Link>
    </div>
  );
}
