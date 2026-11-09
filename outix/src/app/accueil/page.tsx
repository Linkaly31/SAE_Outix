import { Header } from "@/components/headers/header";
import { NavInfo } from "@/components/nav-info/navInfo";
import { StackingContainer } from "@/components/ui/stackingContainer";
import { StatCard } from "@/components/ui/statCard";
import { Button } from "@/components/ui/button";
import { Book, Calendar, School, Star, ArrowRight, Library, Puzzle } from "lucide-react";
import Link from "next/link";

// Temporary data
const followedClasses = [
  { name: "Classe de 2nde A", detail: "Loi d'Ohm - 65% d'apprentissage de la spirale" },
  { name: "Classe de 2nde B", detail: "Loi d'Ohm - 87% d'apprentissage de la spirale" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <Header />
      <NavInfo
        title="Bonjour, M. {Nom}"
        subtitle="Voici votre journée et vos classes"

        buttons={[
          { icon: <Book />, label: "Créer un cours"}
        ]}
      />

      <StackingContainer>
        <div className="mx-auto max-w-[1060px] px-4 pb-10">
          {/* Update the StatCard components with real data later */}
          <div className="flex flex-wrap justify-center gap-6 lg:grid lg:grid-cols-3">
            <StatCard Icon={School} color="#2A7A2E" value={2} label="Classes suivies" />
            <StatCard Icon={Calendar} color="#1060BC" value={3} label="Cours aujourd'hui" />
            <StatCard Icon={Star} color="#B86A00" value={2} label="Favoris" />
          </div>

          <div className="mx-auto mt-8 grid w-[95%] grid-cols-1 gap-6 lg:w-full lg:grid-cols-3">
            <div className="flex flex-col gap-10 lg:col-span-2">
              <section className="rounded-xl bg-[#1060BC] p-6 text-white">
                {/* Temporary data */}
                <h2 className="font-title text-2xl font-bold">Diode de redressement - Introduction</h2>
                <p className="mt-4 font-body text-sm">Électronique et automatique - Sciences de l'Ingénieur</p>
                <Button variant="accent" className="mt-4 gap-2">
                  Reprendre le cours
                  <ArrowRight size={20} />
                </Button>
              </section>

              <div className="grid gap-6 sm:grid-cols-2">
                <Link href="/facultes" className="rounded-xl bg-[#2A7A2E]/40 p-6">
                  <Library size={40} />
                  <h2 className="mt-3 font-title text-2xl font-bold">IWI</h2>
                  <p className="mt-2 font-body text-sm">Cours : facultés, départements, chapitres.</p>
                </Link>

                <div className="rounded-xl bg-[#B86A00]/40 p-6">
                  <Puzzle size={40} />
                  <h2 className="mt-3 font-title text-2xl font-bold">Activités</h2>
                  <p className="mt-2 font-body text-sm">Exercices et activités pour vos classes.</p>
                </div>
              </div>

              <section className="rounded-xl bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-title text-2xl font-bold text-[#2A7A2E]">Classes suivies</h2>
                    <p className="mt-2 font-body text-sm">Suivi des spirales d'apprentissage</p>
                  </div>

                  <Button variant="discreet" className="shrink-0">
                    Créer un groupe
                  </Button>
                </div>

                <ul className="mt-4 flex flex-col gap-3">
                  {followedClasses.map((item) => (
                    <li
                      key={item.name}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#F9F9F4] p-4"
                    >
                      <div>
                        <p className="font-title font-bold">{item.name}</p>
                        <p className="font-body text-sm">{item.detail}</p>
                      </div>

                      <Button variant="discreet" size="sm" className="shrink-0">
                        Voir le suivi
                      </Button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="rounded-xl bg-white p-6 lg:self-start">
              <h2 className="text-center font-title text-2xl font-bold text-[#2A7A2E]">Aujourd'hui</h2>
              <p className="mt-2 text-center font-body text-sm">Vendredi 18 Septembre</p>

              <Button variant="link" className="mt-4 w-full font-body text-xs text-[#2A7A2E] underline">
                Consulter l'emploi du temps complet →
              </Button>
            </aside>
          </div>
        </div>
      </StackingContainer>
    </main>
  )
}