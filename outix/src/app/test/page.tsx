"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Header } from "@/components/ui/header"
import { NavInfo } from "@/components/ui/navInfo"

export default function TestPage() {
  const [search, setSearch] = useState("")

  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <Header />

      <div className="bg-[#2a7a2e] min-h-32">
        <NavInfo
          breadcrumbItems={[
            { label: "Connexion", url: "/login" },
            { label: "Test", url: "/test" },
          ]}

          title="Test de la page"
          subtitle="Ici on teste les différents composants pour le site"

          buttons={[
            { label: "Page de connexion", url: "/login" },
            { label: "+ Créer un compte", url: "/register" },
            { label: "Test", url: "/test", variant: "discreet" }
          ]}

          input={{
            icon: <Search />,
            placeholder: "Rechercher un cours, un chapitre, un exercice...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }}
        />
      </div>
    </main>
  )
}