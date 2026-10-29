
"use client"

import { useState } from "react"
import { House, Library, Puzzle, Users, Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"

const navItems = [
  { href: "/", label: "Accueil", Icon: House },
  { href: "/iwi", label: "IWI", Icon: Library },
  { href: "/activites", label: "Activités", Icon: Puzzle },
  { href: "/classes", label: "Mes classes", Icon: Users },
]

const navLinkClass = "flex shrink-0 items-center gap-2 rounded-full px-3 py-2 font-body text-sm text-black transition-colors duration-200 hover:bg-[#2A7A2E]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7A2E] focus-visible:ring-offset-2"

const avatarClass = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2A7A2E]/30 font-body text-lg font-semibold text-[#2A7A2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7A2E] focus-visible:ring-offset-2"

const searchInputClass = "h-11 rounded-xl bg-[#EEEEEE] pl-10 pr-4 text-black"

function ProfileButton() {
  return (
    <button
      type="button"
      aria-label="Profil utilisateur"
      className={avatarClass}
    >
      P
    </button>
  )
}

function SearchBar() {
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
      <Input
        type="search"
        placeholder="Rechercher..."
        aria-label="Rechercher"
        className={searchInputClass}
      />
    </div>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white px-4 py-2">
      {/* Desktop header */}
      <div className="hidden w-full items-center gap-10 lg:flex">
        {/* Add logo later */}
        <span className="mr-8 shrink-0 font-title text-2xl font-bold text-[#2A7A2E]">
          Outix
        </span>

        <nav
          aria-label="Navigation principale"
          className="flex min-w-0 flex-1 items-center justify-start gap-4 xl:gap-10"
        >
          {navItems.map(({ href, label, Icon }) => (
            <a key={href} href={href} className={navLinkClass}>
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </a>
          ))}

          <div className="relative ml-auto min-w-32 max-w-sm flex-1">
            <SearchBar />
          </div>
        </nav>

        <ProfileButton />
      </div>

      {/* Mobile and tablet header */}
      <div className="flex flex-col gap-3 lg:hidden">
        <div className="flex items-center justify-between">
          {/* Add logo later */}
          <span className="font-title text-2xl font-bold text-[#2A7A2E]">
            Outix
          </span>

          <ProfileButton />
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <SearchBar />

          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-black transition-colors duration-200 hover:text-[#2A7A2E] active:text-[#2A7A2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7A2E] focus-visible:ring-offset-2"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Navigation principale"
            className="flex flex-col gap-1 border-t border-gray-200 pt-2"
          >
            {navItems.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 font-body text-sm text-black transition-colors duration-200 hover:bg-[#2A7A2E]/15 active:bg-[#2A7A2E]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2A7A2E]"
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}