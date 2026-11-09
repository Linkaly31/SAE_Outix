import { Header } from "@/components/headers/header";
import { NavInfo } from "@/components/nav-info/navInfo";
import { Search, Computer, Rocket, FlaskConical, Sigma, ChevronRight, ArrowRight } from "lucide-react";
import { StackingContainer } from "@/components/ui/stackingContainer";
import Link from "next/link";

const facultes = [
  { icon: Computer, name: "Informatique", description: "Programmation, BDD & réseau", href: "/facultes/informatique" },
  { icon: Rocket, name: "Sciences de l'Ingénieur", description: "Électronique, automatique & mécanique", href: "/facultes/sciences-de-l-ingenieur" },
  { icon: FlaskConical, name: "Chimie", description: "Chimie organique", href: "/facultes/chimie" },
  { icon: Sigma, name: "Mathématiques", description: "Algèbre, probabilités & statistiques", href: "/facultes/mathematiques" },
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
        <div className="mx-auto max-w-[1260px] px-4 pb-10">
          <ul className="grid grid-cols-2 gap-8 px-4">
            {facultes.map(({ icon: Icon, name, description, href }) => (
              <li key={name}>
                <Link href={href} className="flex flex-col gap-4 rounded-xl bg-white p-5">
                  <div className="flex justify-between text-style-green">
                    <Icon className="size-15" />
                    <ChevronRight size={30} />
                  </div>

                  <div>
                    <p className="font-title text-xl font-bold">{name}</p>
                    <p className="font-body">{description}</p>
                  </div>

                  <p className="flex items-center gap-2 font-body text-style-green underline">
                    Ouvrir <ArrowRight className="size-4" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Favorite elements and contributions button to add*/}
          <div>

          </div>
        </div>
      </StackingContainer>
    </main>
  )
}