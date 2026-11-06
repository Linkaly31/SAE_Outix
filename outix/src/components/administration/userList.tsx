"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Trash2, UserPen, ChevronLeft, ChevronRight } from "lucide-react"
import { DeleteAccountModal } from "@/components/modals/deleteAccountModal"
import { ModifyAccountModal } from "@/components/modals/modifyAccountModal"

const ACCOUNTS_PER_PAGE = 10

const roleVariants = {
  Admin: "admin",
  Professeur: "teacher",
  Visiteur: "visitor",
} as const

export type Account = {
  name: string
  username: string
  role: keyof typeof roleVariants
}

// Temporary data
const initialAccounts: Account[] = [
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
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(accounts.length / ACCOUNTS_PER_PAGE)
  const start = (page - 1) * ACCOUNTS_PER_PAGE
  const pageAccounts = accounts.slice(start, start + ACCOUNTS_PER_PAGE)

  function handleDelete(account: Account) {
    const updatedAccounts = accounts.filter(
      (item) => item.username !== account.username
    )

    setAccounts(updatedAccounts)
    setSelectedAccount(null)

    const newTotalPages = Math.ceil(updatedAccounts.length / ACCOUNTS_PER_PAGE)

    if (page > newTotalPages && newTotalPages > 0) {
      setPage(newTotalPages)
    }
  }

  function handleUpdate(updatedAccount: Account) {
    setAccounts((prev) =>
      prev.map((account) =>
        account.username === editingAccount?.username
          ? updatedAccount
          : account
      )
    )

    setEditingAccount(null)
  }

  return (
    <>
      <div className="rounded-xl bg-white p-6">
        <Input
          type="search"
          icon={<Search size={20} />}
          placeholder="Rechercher un identifiant ou un nom"
          aria-label="Rechercher"
          className="h-11"
        />

        <div className="mt-6">
          <table className="w-full text-left font-body md:table-fixed">
            <thead className="hidden md:table-header-group">
              <tr>
                <th className="pb-4 font-bold">Utilisateurs</th>
                <th className="w-64 pb-4 text-center font-bold">Rôle</th>
                <th className="w-40 pb-4 text-center font-bold">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Below md, each row is a grid : user on top, role and actions below */}
              {pageAccounts.map((account) => (
                <tr key={account.username} className="grid grid-cols-[1fr_auto] items-center md:table-row">
                  <td className="col-span-2 pb-2 pt-4 md:py-3 md:pr-4">
                    <p>{account.name}</p>
                    <p className="text-sm">{account.username}</p>
                  </td>

                  <td className="pb-3 md:py-3 md:text-center">
                    <Button
                      variant={roleVariants[account.role]}
                      className="w-30"
                    >
                      {account.role}
                    </Button>
                  </td>

                  <td className="pb-3 md:py-3">
                    <div className="flex justify-center gap-4 text-[#2A7A2E] md:gap-8">
                      <button
                        type="button"
                        aria-label={`Modifier ${account.name}`}
                        onClick={() => setEditingAccount(account)}
                      >
                        <UserPen />
                      </button>

                      <button
                        type="button"
                        aria-label={`Supprimer ${account.name}`}
                        onClick={() => setSelectedAccount(account)}
                      >
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
              disabled={page === totalPages || totalPages === 0}
              className="rounded border-3 border-[#2A7A2E] p-2 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        account={selectedAccount}
        onClose={() => setSelectedAccount(null)}
        onConfirm={handleDelete}
      />

      <ModifyAccountModal
        account={editingAccount}
        onClose={() => setEditingAccount(null)}
        onSave={handleUpdate}
      />
    </>
  )
}