import { Header } from "@/components/ui/header"
import { NavInfo } from "@/components/ui/navInfo"

export default function TestPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F4]">
      <Header />

      <div className="bg-[#2a7a2e] min-h-32">
        <NavInfo />
      </div>
    </main>
  )
}