"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Trash2, UserPen, ChevronLeft, ChevronRight } from "lucide-react"

const ACCOUNTS_PER_PAGE = 10

const roleVariants = {
  Admin: "admin",
  Professeur: "teacher",
  Visiteur: "visitor",
} as const

type Account = {
  name: string
  username: string
  role: keyof typeof roleVariants
}

// Temporary data, to replace later
const accounts: Account[] = [
  { name: "Marie Dupont", username: "mdupont", role: "Admin" },
  { name: "Alexandre Dumas", username: "adumas", role: "Professeur" },
  { name: "John Doe", username: "jdoe", role: "Visiteur" },
  { name: "Sophie Martin", username: "smartin", role: "Professeur" },
  { name: "Lucas Bernard", username: "lbernard", role: "Admin" },
  { name: "Emma Petit", username: "epetit", role: "Professeur" },
  { name: "Hugo Robert", username: "hrobert", role: "Admin" },
  { name: "Chloé Richard", username: "crichard", role: "Visiteur" },
  { name: "Louis Durand", username: "ldurand", role: "Professeur" },
  { name: "Léa Moreau", username: "lmoreau", role: "Visiteur" },
  { name: "Nathan Simon", username: "nsimon", role: "Professeur" },
  { name: "Manon Laurent", username: "mlaurent", role: "Visiteur" },
  { name: "Thomas Lefebvre", username: "tlefebvre", role: "Admin" },
  { name: "Camille Michel", username: "cmichel", role: "Visiteur" },
  { name: "Enzo Garcia", username: "egarcia", role: "Professeur" },
  { name: "Inès David", username: "ides", role: "Visiteur" },
  { name: "Jules Bertrand", username: "jbertrand", role: "Professeur" },
  { name: "Sarah Roux", username: "sroux", role: "Visiteur" },
  { name: "Maxime Vincent", username: "mvincent", role: "Admin" },
  { name: "Laura Fournier", username: "lfournier", role: "Professeur" },
  { name: "Paul Morel", username: "pmorel", role: "Visiteur" },
  { name: "Julie Girard", username: "jgirard", role: "Professeur" },
  { name: "Antoine Andre", username: "aandre", role: "Visiteur" },
  { name: "Clara Lefevre", username: "clefevre", role: "Professeur" },
  { name: "Mathis Mercier", username: "mmercier", role: "Visiteur" },
]

export function UserList() {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(accounts.length / ACCOUNTS_PER_PAGE)
  const start = (page - 1) * ACCOUNTS_PER_PAGE
  const pageAccounts = accounts.slice(start, start + ACCOUNTS_PER_PAGE)

  return (
    <div className="rounded-xl bg-white p-6">
      <Input
        type="search"
        icon={<Search size={20} />}
        placeholder="Rechercher un identifiant ou un nom"
        aria-label="Rechercher"
        className="h-11"
      />

      {/* See later for the responsive design */}
      <div className="mt-6">
        <table className="w-full text-left font-body">
          <thead>
            <tr>
              <th className="pb-4 font-bold">Utilisateurs</th>
              <th className="pb-4 text-center font-bold">Rôle</th>
              <th className="pb-4 text-center font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageAccounts.map(({ name, username, role }) => (
              <tr key={username}>
                <td className="py-3">
                  <p>{name}</p>
                  <p className="text-sm">{username}</p>
                </td>
                <td className="py-3 text-center">
                  <Button variant={roleVariants[role]} className="w-30">
                    {role}
                  </Button>
                </td>
                <td className="py-3">
                  <div className="flex justify-center gap-8 text-[#2A7A2E]">
                    <button type="button">
                      <UserPen />
                    </button>
                    <button type="button">
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between font-body">
        <p className="text-sm font-bold">
          Page {page} sur {totalPages}
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Page précédente"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="rounded border-3 border-[#2A7A2E] p-2 disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Page suivante"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="rounded border-3 border-[#2A7A2E] p-2 disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}