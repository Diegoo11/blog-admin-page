import Image from 'next/image';
import Link from 'next/link';
import { Divider } from '@nextui-org/react';
import SearchBar from './SearchBar';
import User from './User';

export default function NavBar() {
  return (
    <nav className="z-40 w-full flex flex-col justify-center items-center sticky top-0 backdrop-blur-lg bg-[#ffffffd8]">
      <div className="w-full max-w-7xl flex justify-between items-center p-4 gap-4">
        <div className="flex justify-center items-center gap-4">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={48}
            height={48}
          />
          <SearchBar />
        </div>
        <div className="flex gap-4 items-center justify-center ">
          <Link href="/admin" className="text-gray-500 hover:text-gray-900">
            Inicio
          </Link>
          <Link href="/admin/crear" className="text-gray-500 hover:text-gray-900">
            Crear
          </Link>
          <User />
        </div>
      </div>
      <Divider />
    </nav>
  );
}
