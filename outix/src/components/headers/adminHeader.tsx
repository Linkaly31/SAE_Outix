import Link from "next/link"

export function AdminHeader() {
  return (
    <header className="w-full bg-white px-4 py-2">
      <div className="flex h-11 items-center justify-between">
        {/* Add logo later */}
        <Link href="/accueil" className="mr-8 shrink-0 font-title text-2xl font-bold text-[#2A7A2E]">
          Outix
        </Link>

        <span className="font-title text-xl font-bold text-[#2A7A2E]">
          Espace Administrateur
        </span>
      </div>
    </header>
  )
}