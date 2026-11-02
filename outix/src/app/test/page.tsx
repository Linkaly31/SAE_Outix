"use client"

import { Header } from "@/components/ui/header"
import { NavInfo } from "@/components/ui/navInfo"

export default function TestPage() {
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
            { label: "Page de connexion", url: "/login" }
          ]}
        />
      </div>
    </main>
  )
}