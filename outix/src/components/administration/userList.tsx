"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SearchX, Trash2, UserPen, ChevronLeft, ChevronRight } from "lucide-react"
import { DeleteAccountModal } from "@/components/administration/modals/deleteAccountModal"
import { ModifyAccountModal } from "@/components/administration/modals/modifyAccountModal"
import { deleteAccount, updateAccount } from "@/lib/accounts"
import { matchesSearch } from "@/lib/search";

const ACCOUNTS_PER_PAGE = 10

const roleVariants = {
  Admin: "admin",
  Professeur: "professor",
  Visiteur: "visitor",
} as const

export type Account = {
  id: string
  name: string
  username: string
  role: keyof typeof roleVariants
}

type UserListProps = {
  accounts: Account[]
  onChanged: () => Promise<void>
}

export function UserList({ accounts, onChanged }: UserListProps) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const filteredAccounts = accounts.filter((account) =>
    matchesSearch(search, account.name, account.username, account.role)
  )

  const totalPages = Math.max(
    Math.ceil(filteredAccounts.length / ACCOUNTS_PER_PAGE),
    1
  )

  // Stays valid when the last account of a page is deleted
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * ACCOUNTS_PER_PAGE
  const pageAccounts = filteredAccounts.slice(start, start + ACCOUNTS_PER_PAGE)

  async function handleDelete(account: Account) {
    await deleteAccount(account.id)
    await onChanged()
  }

  async function handleUpdate(updatedAccount: Account) {
    await updateAccount(updatedAccount)
    await onChanged()
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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
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
              {pageAccounts.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-12">
                    <div className="flex items-center justify-center gap-3 text-red-500">
                      <SearchX className="size-7 shrink-0" />

                      <span className="font-body text-base">
                        Aucun utilisateur trouvé
                      </span>
                    </div>
                  </td>
                </tr>
              )}

              {/* Below md, each row is a grid */}
              {pageAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="grid grid-cols-[1fr_auto] items-center md:table-row"
                >
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
                      {/* Modify button */}
                      <button
                        type="button"
                        aria-label={`Modifier ${account.name}`}
                        disabled={account.role === "Admin"}
                        onClick={() => setEditingAccount(account)}
                        className="disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <UserPen />
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        aria-label={`Supprimer ${account.name}`}
                        disabled={account.role === "Admin"}
                        onClick={() => setSelectedAccount(account)}
                        className="disabled:cursor-not-allowed disabled:opacity-30"
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
            Page {currentPage} sur {totalPages}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Page précédente"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded border-3 border-[#2A7A2E] p-2 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>

            <button
              type="button"
              aria-label="Page suivante"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
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