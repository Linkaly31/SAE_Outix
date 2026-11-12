"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Header } from "@/components/headers/header"
import { NavInfo } from "@/components/nav-info/navInfo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/tag"
import { QuantitySelector } from "@/components/ui/quantitySelector"

const steps = [
  { label: "Contenu" },
  { label: "Sélection des questions" },
  { label: "Aperçu et export" },
]

export default function TestPage() {
  const [search, setSearch] = useState("")

  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <Header />

      <div className="bg-[#2a7a2e] min-h-32">
        <NavInfo
          breadcrumbItems={[
            { label: "Connexion", url: "/connexion" },
            { label: "Test", url: "/test" },
          ]}

          title="Test de la page"
          subtitle="Ici on teste les différents composants pour le site"

          buttons={[
            { label: "Page de connexion", url: "/login" },
            { label: "+ Créer un compte", url: "/register" },
            { label: "Test", url: "/test", variant: "discreet" },
          ]}

          input={{
            icon: <Search />,
            placeholder: "Rechercher un cours, un chapitre, un exercice...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }}

          stepper={
            {
              currentStep: 3,
              steps
            }
          }
        />
      </div>
      <div className="mx-auto p-10 bg-white">
        <Button variant="discreetDashed">
          Salut
        </Button>

        <Button variant="primary">
          Salut
        </Button>

        <Button variant="default">
          Salut
        </Button>

        <Button variant="outline">
          Salut
        </Button>

        <Button variant="destructive">
          Salut
        </Button>

        <Button variant="secondary">
          Salut
        </Button>

        <Button variant="ghost">
          Salut
        </Button>

        <Button variant="accent">
          Salut
        </Button>

        <Button variant="discreet">
          Salut
        </Button>
          
        <QuantitySelector />
      </div>
    </main>
  )
}