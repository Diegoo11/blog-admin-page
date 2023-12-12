import Link from 'next/link';
import Divider from '../utils/Divider';

export default function Options() {
  return (
    <>
      <div className="my-8">
        <Link href="/admin/crear" className="px-2 py-1 bg-gray-200 rounded-full">
          Crear nuevo articulo
        </Link>
      </div>
      <Divider />
    </>
  );
}
