import { AdminHeader } from "@/components/ui/adminHeader"
import { NavInfo } from "@/components/ui/navInfo"

export default function AdministrationPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <AdminHeader />
      <NavInfo 
        title="Liste des comptes"
        subtitle="Gérez les comptes utilisateurs d'Outix et leurs rôles"

        buttons={[
          { label: "+ Créer un compte", url: "" },
        ]}
      
      />
    </main>
  )
}