import { Header } from "@/components/headers/header";
import { NavInfo } from "@/components/nav-info/navInfo";
import { Search } from "lucide-react";

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
    </main>
  )
}