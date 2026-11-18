"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/headers/adminHeader"
import { NavInfo } from "@/components/nav-info/navInfo"
import { StatCard } from "@/components/ui/statCard"
import { StackingContainer } from "@/components/ui/stackingContainer"
import { UserList, type Account } from "@/components/administration/userList"
import { CreateAccountModal } from "@/components/administration/modals/createAccountModal"
import { createAccount, listAccounts } from "@/lib/accounts"
import { UserRoundPlus, Users, IdCard, GraduationCap } from "lucide-react"

export default function AdministrationPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [accounts, setAccounts] = useState<Account[]>([])

  const visitors = accounts.filter((account) => account.role === "Visiteur").length
  const professors = accounts.filter((account) => account.role === "Professeur").length

  async function refreshAccounts() {
    setAccounts(await listAccounts())
  }

  useEffect(() => {
    listAccounts().then(setAccounts)
  }, [])

  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <AdminHeader />
      <NavInfo
        title="Liste des comptes"
        subtitle="Gérez les comptes utilisateurs d'Outix et leurs rôles"

        buttons={[
          { icon: <UserRoundPlus />, label: "Créer un compte", onClick: () => setCreateModalOpen(true) }
        ]}
      />

      <StackingContainer>
        <div className="mx-auto w-full max-w-[1060px] px-4 pb-10">
          <div className="flex flex-wrap justify-center gap-6 lg:grid lg:grid-cols-3">
            <StatCard Icon={Users} color="#1060BC" value={accounts.length} label="Comptes" />
            <StatCard Icon={IdCard} color="#B86A00" value={visitors} label="Visiteurs" />
            <StatCard Icon={GraduationCap} color="#2A7A2E" value={professors} label="Professeurs" />
          </div>

          <div className="mt-10">
            <UserList accounts={accounts} onChanged={refreshAccounts} />
          </div>
        </div>
      </StackingContainer>

      <CreateAccountModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={async (data) => {
          await createAccount(data)
          await refreshAccounts()
        }}
      />
    </main>
  )
}