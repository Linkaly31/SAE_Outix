import { requireAdmin } from "@/lib/auth/session";

export default async function AdministrationLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}