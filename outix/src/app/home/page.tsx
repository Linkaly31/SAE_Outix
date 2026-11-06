import { Header } from "@/components/headers/header";
import { NavInfo } from "@/components/nav-info/navInfo";
import { StackingContainer } from "@/components/ui/stackingContainer";
import { StatCard } from "@/components/ui/statCard";
import { Book, Calendar, School, Star, UserRound } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <Header />
      <NavInfo
        title="Bonjour, M {Nom}"
        subtitle="Voici votre journée et vos classes"
        
        buttons={[
          { icon: <Book />, label: "Créer un cours"}
        ]}
      />

      <StackingContainer>
        <div className="mx-auto w-full max-w-[1060px] px-4 pb-10">
          {/* Update the StatCard components with real data later */}
          <div className="flex flex-wrap items-center justify-center gap-4 xl:justify-between">
            <StatCard Icon={School} color="#1060BC" value={2} label="Classes suivies" />
            <StatCard Icon={Calendar} color="#B86A00" value={3} label="Cours aujourd'hui" />
            <StatCard Icon={Star} color="#2A7A2E" value={2} label="Favoris" />
          </div>
        </div>
      </StackingContainer>
    </main>
  )
}