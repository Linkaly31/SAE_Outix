"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/headers/adminHeader"
import { NavInfo } from "@/components/nav-info/navInfo"
import { StatCard } from "@/components/ui/statCard"
import { StackingContainer } from "@/components/ui/stackingContainer"
import { UserList } from "@/components/administration/userList"
import { CreateAccountModal } from "@/components/modals/createAccountModal"
import { UserRoundPlus, Users, IdCard, GraduationCap } from "lucide-react"

export default function AdministrationPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <AdminHeader />
      <NavInfo
        title="Liste des comptes"
        subtitle="Gérez les comptes utilisateurs d'Outix et leurs rôles"
        
        buttons={[
          { icon: <UserRoundPlus />, label: "Créer un compte", onClick: () => setCreateModalOpen(true)}
        ]}
      />

      <StackingContainer>
        <div className="mx-auto w-full max-w-[1060px] px-4 pb-10">
          {/* Update the StatCard components with real data later */}
          <div className="flex flex-wrap items-center justify-center gap-4 xl:justify-between">
            <StatCard Icon={Users} color="#1060BC" value={3} label="Comptes" />
            <StatCard Icon={IdCard} color="#B86A00" value={1} label="Visiteurs" />
            <StatCard Icon={GraduationCap} color="#2A7A2E" value={1} label="Professeurs" />
          </div>

          <div className="mt-10">
            <UserList />
          </div>
        </div>
      </StackingContainer>

      <CreateAccountModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={async (data) => {
          console.log("Compte à créer :", data)
        }}
      />
    </main>
  )
}