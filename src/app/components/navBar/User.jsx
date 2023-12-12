import Link from 'next/link';

export default async function User() {
  return (
    <div className="flex gap-2 justify-center items-center">
      <Link href="/api/auth/signout" className="p-1 text-[#94979b] hover:text-[#4e4f52]">
        <svg className="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
          <path d="M9 12h12l-3 -3" />
          <path d="M18 15l3 -3" />
        </svg>
      </Link>
    </div>
  );
}
