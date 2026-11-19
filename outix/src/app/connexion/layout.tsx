import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  // Real session check : an expired cookie no longer causes a redirect loop
  if (await getSession()) redirect("/accueil");
  return children;
}