import { Header } from "@/components/headers/header";
import { NavInfo } from "@/components/nav-info/navInfo";
import { StackingContainer } from "@/components/ui/stackingContainer";
import { Button } from "@/components/ui/button";
import { Search, Computer, Rocket, FlaskConical, Sigma, ChevronRight, ArrowRight, Star, X } from "lucide-react";
import Link from "next/link";

// Data to complete or change later
const facultes = [
  { icon: Computer, name: "Informatique", description: "Programmation, BDD & réseau", href: "/facultes/informatique" },
  { icon: Rocket, name: "Sciences de l'Ingénieur", description: "Électronique, automatique & mécanique", href: "/facultes/sciences-de-l-ingenieur" },
  { icon: FlaskConical, name: "Chimie", description: "Chimie organique", href: "/facultes/chimie" },
  { icon: Sigma, name: "Mathématiques", description: "Algèbre, probabilités & statistiques", href: "/facultes/mathematiques" },
];

// Temporary data for favorite sections
const favoriteSections = [
  { hierarchy: "Département", element: "Electronique et automatique" },
  { hierarchy: "Chapitre", element: "Diode de redressement Thyristor" },
];

export default function IWIFacultyPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <Header />
      <NavInfo
        breadcrumbItems={[
          { label: "Accueil", url: "/accueil" },
          { label: "Facultés", url: "/facultes" },
        ]}
        title="Facultés"
        subtitle="Parcourez les matières et accédez aux contenus pédagogiques."

        input={{
          icon: <Search />,
          placeholder: "Rechercher une faculté, un département, un chapitre...",
        }}
      />
      <StackingContainer>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 px-8 pb-10 lg:grid-cols-[2fr_1fr]">
          
          {/* Faculty cards */}
          <ul className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2">
            {facultes.map(({ icon: Icon, name, description, href }) => (
              <li key={name} className="min-w-0">
                <Link href={href} className="flex h-full min-h-[300px] flex-col gap-2 rounded-xl bg-white p-5">
                  <div className="mb-2 flex justify-between text-style-green">
                    <Icon className="size-12 md:size-15" />
                    <ChevronRight size={30} />
                  </div>

                  <div>
                    <p className="mb-4 break-words font-title text-lg font-bold md:text-xl">{name}</p>
                    <p className="break-words font-body text-sm md:text-base">{description}</p>
                  </div>

                  <p className="mt-auto flex items-center gap-2 font-body border-b border-current pb-0.1 w-fit text-style-green">
                    Ouvrir <ArrowRight className="size-4" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Favorite elements + contribution button */}
          <div className="flex min-w-0 flex-col gap-10">
            <div className="rounded-xl bg-white p-5">
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <Star className="size-8 text-yellow-500 md:size-10" />
                <p className="font-title text-xl font-bold md:text-2xl">Vos favoris</p>
              </div>

              <p className="font-body text-sm md:text-base">Retrouvez rapidement vos contenus enregistrés.</p>

              <ul className="mt-4 flex flex-col gap-3">
                {favoriteSections.map((item) => (
                  <li
                    key={item.hierarchy}
                    className="flex flex-col gap-2 rounded-lg bg-[#F9F9F4] p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-title text-lg font-bold md:text-xl">{item.hierarchy}</p>
                      <X className="size-5 shrink-0 text-style-green" />
                    </div>

                    <p className="break-words font-body text-sm md:text-base">{item.element}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="accent" fullWidth>
              Vous souhaitez contribuer ?
            </Button>
          </div>
        </div>
      </StackingContainer>
    </main>
  );
}