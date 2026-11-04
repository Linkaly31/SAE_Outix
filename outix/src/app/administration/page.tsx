import { AdminHeader } from "@/components/ui/adminHeader"
import { NavInfo } from "@/components/ui/navInfo"
import { StatCard } from "@/components/ui/statCard"
import { UserRoundPlus, Users, IdCard, GraduationCap } from "lucide-react"

export default function AdministrationPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <AdminHeader />
      <NavInfo
        title="Liste des comptes"
        subtitle="Gérez les comptes utilisateurs d'Outix et leurs rôles"

        buttons={[
          { icon: <UserRoundPlus />, label: "Créer un compte", url: "" }
        ]}
      />

      {/* Update the StatCard components with real data later */}
      <div className="flex flex-wrap items-center justify-center gap-30">
        <StatCard Icon={Users} color="#1060BC" value={3} label="Comptes" />
        <StatCard Icon={IdCard} color="#B86A00" value={1} label="Visiteurs" />
        <StatCard Icon={GraduationCap} color="#2A7A2E" value={1} label="Professeurs" />
      </div>
    </main>
  )
}